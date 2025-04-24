import React, { useState } from 'react'
import { GoDotFill } from "react-icons/go";
import profilePic from '../../assets/images/avatar.jpg'
import { RiLockPasswordFill } from "react-icons/ri";
import { RiVideoOnAiFill } from "react-icons/ri";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import Logout from '../Auth/Logout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatName } from '../../utils/formatName';

const SideBar = ({ activePage, setActivePage }) => {
    const [openLogout, setOpenLogout] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()



    return (
        <div className=' min-w-[320px]  p-6'>
            <div className='bg-light-green h-full rounded-xl flex flex-col overflow-hidden relative' style={{ boxShadow: '0 4px 6px -1px #0000004f' }}>
                <div className='bg-dark-green px-2 py-1'>
                    <div className='flex items-center'>
                        <GoDotFill className='text-grass-green mx-[-2px]' />
                        <GoDotFill className='text-dark-orange mx-[-2px]' />
                        <GoDotFill className='text-light-orange mx-[-2px]' />
                    </div>
                </div>

                <div className='flex items-center gap-4 py-6 px-5 cursor-pointer' onClick={() => setActivePage("myAccount")}>
                    <div className='w-16 h-16 rounded-full relative flex items-center justify-center'>
                        <img src={user?.avatar?.url || profilePic} alt="avatar" className='w-16 h-16 object-cover object-center rounded-full' />
                        <GoDotFill size={20} className='text-green-500 absolute top-0 right-0 z-[9999]' />
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-xl text-dark-green  font-[800] line-clamp-1 text-ellipsis overflow-hidden max-w-[320px]'>{formatName(user?.name)}</h3>
                        <p className='text-xs  text-gray-500'>{user?.role && user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}</p>
                    </div>
                </div>

                <div className='flex flex-col gap-3 mt-3'>
                    <div className={`${activePage === "changePassword" ? "bg-dark-green text-white hover:bg-dark-green" : "hover:bg-green"} flex items-center gap-4 rounded-4xl mx-6 py-2.5 px-6 cursor-pointer transition-all duration-300 `} onClick={() => setActivePage("changePassword")}>
                        <RiLockPasswordFill />
                        <p className='font-[300] text-sm'>Change Password</p>

                    </div>

                    <div className={`${activePage === "enrolledCourses" ? "bg-dark-green text-white hover:bg-dark-green" : "hover:bg-green"} flex items-center gap-4 rounded-4xl mx-6 py-2.5 px-6 cursor-pointer transition-all duration-300 `} onClick={() => setActivePage("enrolledCourses")}>
                        <RiVideoOnAiFill />
                        <p className='font-[300] text-sm'>Enrolled Courses</p>

                    </div>
                    {
                        user?.role === "admin" && (
                            <div className={`${activePage === "adminDashboard" ? "bg-dark-green text-white hover:bg-dark-green" : "hover:bg-green"} flex items-center gap-4 rounded-4xl mx-6 py-2.5 px-6 cursor-pointer transition-all duration-300 `} onClick={() => navigate("/admin/admin-dashboard")}>
                                <RiAdminFill />
                                <p className='font-[300] text-sm'>Admin Dashboard</p>

                            </div>
                        )
                    }
                </div>

                <div className='flex items-center gap-4 rounded-4xl mx-6 py-2.5 px-6 cursor-pointer transition-all absolute bottom-4 right-0 left-0  duration-300 hover:bg-green' onClick={() => setOpenLogout(true)}>
                    <RiLogoutCircleRFill />
                    <p className='font-[300] text-sm'>Log Out</p>

                </div>

            </div>

            <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
        </div>
    )
}

export default SideBar