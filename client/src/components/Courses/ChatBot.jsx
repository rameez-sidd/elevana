import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import botIcon from '../../assets/images/robot.png'

const ChatBot = () => {
  return (
    <Tooltip>

      <TooltipTrigger className='bg-grass-green p-2 shadow-xl cursor-pointer rounded-full h-16 w-16 fixed bottom-10 right-10 flex flex-col items-center justify-center '>
        <img src={botIcon} alt="" className='invert' width={40}/>
      </TooltipTrigger>
      <TooltipContent>
        <p>Chat with Elva :)</p>
      </TooltipContent>
    </Tooltip>

  )
}

export default ChatBot