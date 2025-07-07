import axios from "axios";
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";


export const chat = CatchAsyncError(async (req, res, next) => {
    try {
        const {message} = req.body;

        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
            {
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: [
                    {
                        role: 'user',
                        content: message,
                    }
                ],
                
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DEEP_SEEK_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        
        )

        if (!response) {
            return next(new ErrorHandler(400, "Something went wrong."))
        }

        const reply = response.data.choices[0].message.content;

        res.status(200).json({
            success: true,
            reply: reply

        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})