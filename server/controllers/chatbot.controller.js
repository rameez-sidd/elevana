import OpenAI from 'openai';
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { userModel } from "../models/user.model.js";
import { redis } from '../utils/redis.js';
import { GoogleGenAI } from "@google/genai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.DEEP_SEEK_API_KEY,
})

// gemini API
const ai = new GoogleGenAI({});


export const chat = CatchAsyncError(async (req, res) => {
    const { message } = req.body;

    let reply = "Something went wrong."; // default fallback reply

    try {
        // const response = await openai.chat.completions.create({
        //     model: "deepseek/deepseek-chat-v3-0324:free",
        //     messages: [
        //         {
        //             role: "user",
        //             content: message,
        //         }
        //     ],
        // });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: "You are a chatbot. Your name is Elva. You are here to help the learners with their doubts.",
            },
        })

        // if (response && response.choices?.[0]?.message?.content) {
        //     reply = response.choices[0].message.content;
        // }

        if(response && response?.text){
            reply = response.text;
        }

    } catch (error) {
        console.error("Chatbot error:", error.message);
    }

    try {
        const user = await userModel.findById(req.user._id);

        user.chatHistory.push({
            doubt: message,
            reply,
        });

        await user.save();
        await redis.set(user._id.toString(), JSON.stringify(user));

        res.status(200).json({
            success: true,
            reply,
            user,
        });

    } catch (dbError) {
        console.error("User save/cache error:", dbError.message);
        res.status(200).json({
            success: false,
            reply: "Something went wrong while saving your chat.",
        });
    }
});

