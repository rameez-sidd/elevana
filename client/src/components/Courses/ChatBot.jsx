import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import botIcon from '../../assets/images/robot.png'
import { RiRobot3Fill } from 'react-icons/ri'

const ChatBot = () => {
  return (
    <Tooltip>


      <TooltipTrigger className='p-1 shadow-md cursor-pointer w-11 h-11 lg:h-12 lg:w-12 fixed bottom-2 right-1.5 lg:right-5 lg:bottom-5 xl:right-8 xl:bottom-7 flex items-center justify-center bg-[linear-gradient(163deg,_rgba(12,_242,_201,_1)_0%,_rgba(41,_122,_217,_1)_50%,_rgba(170,_58,_177,_1)_100%)] rounded-full transition-all duration-400 hover:shadow-[0_2px_6px_0_#0039ffa6]'>
        <div className='bg-white rounded-full h-full w-full flex items-center hover:bg-[#4040405c] hover:text-white transition-transform duration-400 justify-center shadow-[inset_0px_0px_5px_0px_#0c23e9]'>
          {/* <img src={botIcon} alt=""  width={40} /> */}
          <span className='text-[22px]'><RiRobot3Fill/></span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Chat with Elva :)</p>
      </TooltipContent>
    </Tooltip>

  )
}

export default ChatBot