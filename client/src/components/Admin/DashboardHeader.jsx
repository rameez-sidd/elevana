import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useEffect, useState } from 'react'
import { IoNotifications, IoCheckmarkDoneSharp } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import socketIO from 'socket.io-client'
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '../../redux/features/notifications/notificationsApi';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';

const ENDPOINT = import.meta.env.VITE_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

const DashboardHeader = ({ title }) => {
    const { user } = useSelector((state) => state.auth);
    const { data, refetch } = useGetAllNotificationsQuery(undefined, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true })

    const [updateNotificationStatus, { isLoading, isSuccess }] = useUpdateNotificationStatusMutation()
    const [notifications, setNotifications] = useState([])
    const [audio] = useState(new Audio("https://res.cloudinary.com/dpiwq6bjh/video/upload/v1746719562/wxw36yjqnaquh256fgpq.mp3"))

    const playerNotificationSound = async () => {
        try {
            await audio.play();
        } catch (error) {
            console.error("Error playing notification sound:", error);
        }
    };

    useEffect(() => {
        // Connect to socket with admin ID when component mounts
        if (user?._id) {
            socketId.emit("adminConnect", user._id);
        }

        // Preload the audio
        audio.preload = "auto";
        audio.load();

        if (data) {
            setNotifications(data?.notifications?.filter((item) => item?.status === "unread"));
        }
        if (isSuccess) {
            refetch();
        }
    }, [data, isSuccess, user]);

    useEffect(() => {
        socketId.on("newNotification", (data) => {
            refetch();
            playerNotificationSound();
        });

        return () => {
            socketId.off("newNotification");
        };
    }, []);

    const handleNotificationStatusChange = async (id) => {
        await updateNotificationStatus(id).unwrap()
    }

    return (
        <div className='px-6 min-h-[45px] flex items-center justify-between bg-white border-b-1 border-gray-300'>
            <div className='text-lg font-[500]'>{title}</div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className='p-1 rounded-full relative cursor-pointer hover:bg-gray-200'>
                        <GoBell size={20} />
                        {
                            notifications && notifications.length > 0 && (
                                <div className='absolute top-[-4px] right-0 bg-red-500 outline-3 outline-white text-white w-4.5 h-4.5 flex justify-center items-center text-[10px] font-light rounded-full'>{notifications && notifications.length}</div>
                            )
                        }

                    </div>
                </PopoverTrigger>
                <PopoverContent className='p-0 rounded-xl border-none min-w-[370px] '>
                    <div className='flex flex-col rounded-xl overflow-hidden shadow-lg'>
                        <div className='bg-green text-center text-white py-1'>Notifications</div>
                        <div className='flex flex-col  px-1 max-h-[60vh] overflow-y-scroll custom-scrollbar'>
                            {
                                notifications && notifications.map((item, index) => (
                                    <div className='p-2 flex flex-col gap-0 border-b border-t border-gray-200' key={index}>
                                        <div className='flex items-center gap-12 justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <h4 className='text-xs font-[500]'>{item?.title}</h4>
                                                <div className='text-[10px] text-gray-400'>{format(item?.createdAt)}</div>

                                            </div>
                                            <IoCheckmarkDoneSharp title='Mark as read' size={20} className='bg-white rounded-full p-0.5 cursor-pointer hover:bg-gray-200' onClick={() => handleNotificationStatusChange(item?._id)} />
                                        </div>
                                        <div className='text-[11px] font-light w-[80%]'>{item?.message}</div>
                                    </div>
                                ))
                            }
                            {
                                notifications && notifications.length === 0 && (
                                    <div className='text-xs p-5 text-gray-600 flex items-center justify-center border-b border-t border-gray-200'>
                                        No new notifications
                                    </div>
                                )
                            }


                        </div>
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default DashboardHeader