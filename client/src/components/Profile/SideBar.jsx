import React, { useState } from 'react'
import { GoDotFill } from "react-icons/go";
import profilePic from '../../assets/images/avatar.jpg'
import { RiLockPasswordFill } from "react-icons/ri";
import { RiVideoOnAiFill } from "react-icons/ri";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import Logout from '../Auth/Logout';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { formatName } from '../../utils/formatName';
import { IoLogOut } from 'react-icons/io5';

const SideBar = () => {
    const [openLogout, setOpenLogout] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()



    return (
        <div className=' min-w-[320px] flex items-center justify-end  p-6 pr-0 '>
            <div className='bg-white min-h-[400px] rounded-xl flex flex-col overflow-hidden relative shadow-lg border border-gray-300 '>
                <div className='bg-dark-green px-2 py-1'>
                    <div className='flex items-center'>
                        <GoDotFill className='text-grass-green mx-[-2px]' />
                        <GoDotFill className='text-dark-orange mx-[-2px]' />
                        <GoDotFill className='text-light-orange mx-[-2px]' />
                    </div>
                </div>

                <NavLink to='/profile'>
                    <div className='flex items-center gap-4 py-6 px-5 cursor-pointer'>
                        <div className='w-16 h-16 rounded-full relative flex items-center justify-center'>
                            <img src={user?.avatar?.url || profilePic} alt="avatar" className='w-16 h-16 object-cover object-center rounded-full border border-gray-300' />
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-xl text-dark-green  font-[800] line-clamp-1 text-ellipsis overflow-hidden max-w-[320px]'>{formatName(user?.name)}</h3>
                            <p className='text-xs  text-gray-500'>{user?.role && user?.role === 'admin' ? "Educator" : "Student"}</p>
                        </div>
                    </div>
                </NavLink>

                <div className='flex flex-col gap-3 mt-3'>


                    <NavLink to='/profile/change-password' className={({ isActive }) =>
                        `${isActive ? "bg-dark-green text-white hover:bg-dark-green" : "hover:bg-light-green"} flex items-center gap-4 rounded-4xl mx-6 py-2 px-6 cursor-pointer transition-all duration-300`
                    }>
                        <RiLockPasswordFill />
                        <p className='font-[300] text-sm'>Change Password</p>

                    </NavLink>
                    




                    <NavLink to="/profile/enrolled-courses" className={({ isActive }) =>
                        `${isActive ? "bg-dark-green text-white hover:bg-dark-green" : "hover:bg-light-green"} flex items-center gap-4 rounded-4xl mx-6 py-2 px-6 cursor-pointer transition-all duration-300`} >
                        <RiVideoOnAiFill />
                        <p className='font-[300] text-sm'>Enrolled Courses</p>

                    </NavLink>


                </div>

                <div className='flex items-center gap-4 rounded-4xl mx-6 py-2 px-6 cursor-pointer transition-all absolute bottom-4 right-0 left-0  duration-300 hover:bg-light-green' onClick={() => setOpenLogout(true)}>
                    <IoLogOut />
                    <p className='font-[300] text-sm'>Log Out</p>

                </div>

            </div>

            <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
        </div>
    )
}

export default SideBar