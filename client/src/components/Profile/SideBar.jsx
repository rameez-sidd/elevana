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
import { HiUser } from 'react-icons/hi2';

const SideBar = () => {
    const [openLogout, setOpenLogout] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()



    return (
        <div className='col-span-3 lg:col-span-2 bxl:col-span-4! bxl2:col-span-2! xl:col-span-1! blg:flex items-center justify-end hidden'>
            <div className='bg-white min-h-[250px] rounded-xl flex flex-col overflow-hidden relative shadow-lg py-3 border border-gray-300 min-w-[230px]'>
                {/* <div className='bg-dark-green px-2 py-1'>
                    <div className='flex items-center'>
                        <GoDotFill className='text-grass-green mx-[-2px]' />
                        <GoDotFill className='text-dark-orange mx-[-2px]' />
                        <GoDotFill className='text-light-orange mx-[-2px]' />
                    </div>
                </div> */}

                {/* <NavLink to='/profile'>
                    <div className='flex items-center gap-2.5 cursor-pointer px-3 py-3.5'>
                        <div className='w-11 h-11 rounded-full relative flex items-center justify-center'>
                            <img src={user?.avatar?.url || profilePic} alt="avatar" className='w-11 h-11 object-cover object-center rounded-full border border-gray-300' />
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-lg text-dark-green  font-[800] whitespace-nowrap text-ellipsis overflow-hidden max-w-[320px]'>{formatName(user?.name)}</h3>
                            <p className='text-xs  text-gray-500'>{user?.role && user?.role === 'admin' ? "Educator" : "Student"}</p>
                        </div>
                    </div>
                </NavLink> */}

                <div className='flex flex-col gap-2.5 px-3'>

                    <NavLink to='/profile' end className={({ isActive }) =>
                        `${isActive ? "bg-dark-green text-white hover:bg-dark-green" : "hover:bg-light-green"} px-3 flex items-center gap-2.5 rounded-4xl  py-2 cursor-pointer transition-all duration-300`
                    }>
                        <HiUser />
                        <p className='font-[300] text-sm'>My Profile</p>

                    </NavLink>

                    <NavLink to="/profile/enrolled-courses" className={({ isActive }) =>
                        `${isActive ? "bg-dark-green text-white hover:bg-dark-green" : "hover:bg-light-green"} px-3 flex items-center gap-2.5 rounded-4xl py-2 cursor-pointer transition-all duration-300`} >
                        <RiVideoOnAiFill />
                        <p className='font-[300] text-sm'>My Courses</p>

                    </NavLink>

                    <NavLink to='/profile/change-password' className={({ isActive }) =>
                        `${isActive ? "bg-dark-green text-white hover:bg-dark-green" : "hover:bg-light-green"} px-3 flex items-center gap-2.5 rounded-4xl  py-2 cursor-pointer transition-all duration-300`
                    }>
                        <RiLockPasswordFill />
                        <p className='font-[300] text-sm'>Change Password</p>

                    </NavLink>
                    


                </div>

                <div className='flex text-red-700 items-center gap-2.5 rounded-4xl py-2 cursor-pointer transition-all px-3 mx-3 mb-3 duration-300 absolute bottom-0 left-0 right-0 hover:bg-red-100' onClick={() => setOpenLogout(true)}>
                    <IoLogOut />
                    <p className='font-[300] text-sm'>Log Out</p>

                </div>

            </div>

            <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
        </div>
    )
}

export default SideBar