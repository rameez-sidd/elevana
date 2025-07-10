import React, { useEffect, useRef, useState } from 'react'
import botIcon from '../../assets/images/robot.png'
import { CgClose } from 'react-icons/cg'
import { IoSend } from "react-icons/io5";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import latexToText from '@/utils/LatexFormatter';
import { useChatMutation } from '@/redux/features/chatbot/chatbotApi';
import { toast } from 'react-toastify';

const Typing = () => {
    return (
        <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </div>

    )
}

const ChatUI = ({ setShowChatBot, user }) => {
    const [chat, { isLoading: isSending }] = useChatMutation()
    const chatContainerRef = useRef(null)
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState(user?.chatHistory || []);

    useEffect(() => {
        if (user?.chatHistory) {
            setChatHistory(user.chatHistory);
        }
    }, [user]);



    useEffect(() => {
        // Scroll to bottom when chat history updates
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [user?.chatHistory, chatHistory]); // run whenever chat updates

    const sendMessage = async () => {
        if (message.trim() == 0) {
            return
        }

        const userMessage = { doubt: message, reply: null };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage('');


        try {
            const { reply } = await chat(message).unwrap();

            setChatHistory(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = { ...last, reply };
                return updated;
            });
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong.";
            toast.error(message);
            setChatHistory((prev) => prev.slice(0, -1))
        }
    }

    return (
        <div className='bg-white fixed bottom-10 right-10 border border-gray-300 shadow-lg rounded-md w-[380px] overflow-hidden'>
            <div className='bg-gray-100 flex items-center p-2'>
                <div className='flex items-center gap-3 flex-1'>
                    <div><img src={botIcon} alt="" width={35} /></div>
                    <div className='flex flex-col gap-0'>
                        <h4 className='font-bold text-lg'>Elva</h4>
                        <p className='text-[10px] mt-[-4px] text-gray-600'>{isSending ? 'typing...' : 'online'}</p>
                    </div>
                </div>
                <div className='hover:bg-gray-200 cursor-pointer h-full rounded-full p-1' onClick={() => setShowChatBot(false)}>
                    <CgClose size={25} />
                </div>

            </div>

            <div className='h-[400px] flex flex-col justify-end '>
                <div ref={chatContainerRef} className='flex flex-col gap-2 py-2 overflow-y-scroll custom-scrollbar'>
                    <div className='flex justify-start px-1'>
                        <div className='text-xs bg-gray-200 w-fit max-w-[80%] p-2 rounded-md text-black font-[300]'>Hey, How can I help you?</div>
                    </div>
                    {
                        chatHistory.map((chat, index) => (
                            <React.Fragment key={index}>
                                <div className='flex justify-end px-1'>
                                    <div className='text-xs bg-grass-green text-white w-fit max-w-[80%] p-2 rounded-md font-[300]'>{chat?.doubt}</div>
                                </div>
                                <div className='flex justify-start px-1'>
                                    <div className='text-xs bg-gray-200 w-fit max-w-[80%] p-2 rounded-md text-black font-[300]'>
                                        {chat?.reply ? (
                                            <ReactMarkdown
                                                children={latexToText(chat?.reply)}
                                                remarkPlugins={[remarkMath]}
                                                rehypePlugins={[rehypeKatex]}
                                            />
                                        ) : (
                                            <Typing />
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                    }


                </div>
            </div>

            <div className='bg-gray-100 border-t border-gray-300 flex'>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isSending) {
                            sendMessage();
                        }
                    }}
                    placeholder='Need help?'
                    className='text-sm flex-1 border-none outline-none focus:outline-none focus-within:outline-none px-3'
                />
                <div className='p-2.5'>
                    <button disabled={isSending} onClick={sendMessage}>
                        <IoSend size={28} className={` ${isSending ? 'text-gray-300 hover:none cursor-not-allowed' : 'cursor-pointer hover:text-dark-grass-green'}`} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatUI