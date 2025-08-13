import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import botIcon from '../../assets/images/robot.png'

const ChatBot = () => {
  return (
    <Tooltip>

      <TooltipTrigger className='bg-grass-green p-2 shadow-xl cursor-pointer rounded-full w-11 h-11 lg:h-16 lg:w-16 fixed lg:right-10 lg:bottom-10 lg:left-auto flex flex-col items-center justify-center '>
        <img src={botIcon} alt="" className='invert' width={40}/>
      </TooltipTrigger>
      <TooltipContent>
        <p>Chat with Elva :)</p>
      </TooltipContent>
    </Tooltip>

  )
}

export default ChatBot