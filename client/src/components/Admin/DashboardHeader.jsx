import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React from 'react'
import { IoNotifications, IoCheckmarkDoneSharp } from "react-icons/io5";
import { GoBell } from "react-icons/go";

const DashboardHeader = ({title}) => {
    return (
        <div className='px-6 min-h-[45px] flex items-center justify-between bg-white border-b-1 border-gray-300'>
            <div className='text-lg font-[500]'>{title}</div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className='p-1 rounded-full relative cursor-pointer hover:bg-gray-200'>
                        <GoBell size={23} />
                        <div className='absolute top-[-4px] right-0 bg-red-500 outline-3 outline-white text-white w-4.5 h-4.5 flex justify-center items-center text-[10px] font-light rounded-full'>54</div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='p-0 rounded-xl border-none max-h-[60vh] overflow-y-scroll custom-scrollbar'>
                    <div className='flex flex-col rounded-xl overflow-hidden'>
                        <div className='bg-green text-center text-white py-1'>Notifications</div>
                        <div className='flex flex-col'>
                            <div className='p-2 flex flex-col gap-1 border-b border-t border-gray-200'>
                                <div className='flex items-center justify-between'>
                                    <h4 className='text-sm font-[600]'>New Question</h4>
                                    <IoCheckmarkDoneSharp title='Mark as read' size={20} className='bg-white rounded-full p-0.5 cursor-pointer hover:bg-gray-200'/>
                                </div>
                                <div className='text-xs font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates explicabo enim architecto earum! Dignissimos ea odio fugiat quibusdam in totam.</div>
                                <div className='text-[10px] font-[600]'>5 days ago</div>
                            </div>
                            
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default DashboardHeader