import React from 'react'
import chatbotIcon from '../../assets/images/chatbot-icon.png'

const ChatBot = () => {
  return (
    <div className='bg-grass-green p-2 shadow-xl cursor-pointer rounded-full h-16 w-16 fixed bottom-10 right-10 flex flex-col items-center justify-center gap-1 '>
        <img src={chatbotIcon} alt=""  width={40} />
    </div>
  )
}

export default ChatBot