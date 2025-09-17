import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import SignUp from '../Auth/SignUp'
import Login from '../Auth/Login'
import Verification from '../Auth/Verification'
import { useSelector, useDispatch } from 'react-redux'
import profilePic from '../../assets/images/avatar.jpg'
import { setModalOpen } from '../../redux/features/auth/authSlice'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import SideBar from '../Profile/SideBar'
import { HiUser } from 'react-icons/hi2'
import { RiLockPasswordFill, RiVideoOnAiFill } from 'react-icons/ri'
import { IoLogOut } from 'react-icons/io5'
import Logout from '../Auth/Logout'
import { TbLayoutDashboardFilled } from 'react-icons/tb'

const Header = ({ isProfileOpen }) => {
    const { user, modalOpen } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);


    useEffect(() => {
        if (openMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup: Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openMenu]);

    const handleAvatarClick = () => {
        if (window.innerWidth < 900) {
            // Show popover on small screens
            setShowPopover(!showPopover)
        } else {
            // Redirect on bigger screens
            if (user?.role === 'admin') {
                navigate('/admin/admin-dashboard')
            } else {
                navigate('/profile')
            }
        }
    }

    const handleSetModal = (modal) => {
        dispatch(setModalOpen(modal))
    }

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const closeMenu = (e) => {
        if (!e.target.classList.contains("visible-part")) {
            setOpenMenu(false);
        }

    }

    return (
        <div className=' flex justify-between md:grid md:grid-cols-3 items-center mx-auto max-w-7xl py-0.5 pr-1 sm:p-1.5 md:p-2 lg:p-3 lg:py-5 w-full '>
            <h1 className='hidden md:inline justify-self-start font-plaster text-2xl lg:text-3xl text-dark-green'>Elevana</h1>
            <h1 className='md:hidden flex items-center justify-center font-plaster text-4xl text-dark-green h-10 w-10 text-center  align-middle rounded-full hover:bg-zinc-200' onClick={() => setOpenMenu(true)}>v</h1>
            <div className='justify-self-center md:flex items-center gap-7 lg:gap-8 font-light hidden'>
                <NavLink className={({ isActive }) => `text-[13px] lg:text-sm  p-1 border-b-2 border-transparent hover:text-dark-green hover:border-dark-green transition-all duration-300 ${isActive ? 'text-dark-green font-[600] px-0.5' : ' text-gray-600 px-1'} `} to={'/'}>Home</NavLink>
                <Link className={`text-[13px] lg:text-sm p-1 border-b-2 border-transparent hover:text-dark-green hover:border-dark-green transition-all duration-300 text-gray-600 px-1`} onClick={() => scrollToSection('about')}>About</Link>
                <Link className={`text-[13px] lg:text-sm p-1 border-b-2 border-transparent hover:text-dark-green hover:border-dark-green transition-all duration-300 text-gray-600 px-1`} onClick={() => scrollToSection('faq')}>FAQ</Link>
                {
                    user && user?.role === 'admin' ? (<></>) : (

                        <NavLink className={({ isActive }) => `text-[13px] lg:text-sm p-1 border-b-2 border-transparent hover:text-dark-green hover:border-dark-green transition-all duration-300 ${isActive ? 'text-dark-green font-[600] px-0.5' : ' text-gray-600 px-1'} `} to={'/courses'}>Courses</NavLink>
                    )
                }
            </div>
            <div className='justify-self-end flex items-center justify-center '>
                {
                    user ? (
                        <Popover className="blg:hidden">
                            <PopoverTrigger asChild>

                                <img src={user.avatar ? user.avatar.url : profilePic} alt="avatar" className={`w-7 h-7 rounded-full object-cover cursor-pointer border border-gray-200 hover:outline-3 ${isProfileOpen ? 'outline-3 outline-dark-green hover:dark-green border-none' : "hover:outline-grass-green"}`} onClick={handleAvatarClick} />
                            </PopoverTrigger>
                            <PopoverContent className="blg:hidden p-0 overflow-hidden w-fit mr-2">
                                <div className='flex flex-col'>
                                    <Link to='/profile' className='flex items-center gap-2 px-3 pr-6 py-2.5 border-b hover:bg-gray-100 cursor-pointer'>
                                        <span><HiUser /></span>
                                        <p className='text-sm'>My Profile</p>
                                    </Link>
                                    <Link to={user?.role === 'admin' ? '/admin/admin-dashboard' : '/profile/enrolled-courses'} className='flex items-center gap-2 px-3 pr-6 py-2.5 border-b hover:bg-gray-100 cursor-pointer'>
                                        <span>
                                            {
                                                user?.role === 'admin' ? <TbLayoutDashboardFilled/> : <RiVideoOnAiFill />
                                            }
                                            
                                        </span>
                                        <p className='text-sm'>My {user?.role === 'admin' ? "Dashboard" : "Courses"}</p>
                                    </Link>
                                    <Link to='/profile/change-password' className='flex items-center gap-2 px-3 pr-6 py-2.5 border-b hover:bg-gray-100 cursor-pointer'>
                                        <span><RiLockPasswordFill /></span>
                                        <p className='text-sm'>Change Password</p>
                                    </Link>
                                    <div className='flex items-center gap-2 px-3 pr-6 py-2.5 text-red-700 hover:bg-red-50 cursor-pointer' onClick={() => setOpenLogout(true)}>
                                        <span><IoLogOut /></span>
                                        <p className='text-sm'>Logout</p>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <button className='bg-dark-green text-xs md:text-[13px] lg:text-sm text-white py-2 px-4 sm:py-2.5 sm:px-5 md:px-6  lg:px-7 font-[300] cursor-pointer hover:bg-dark-grass-green rounded-4xl' onClick={() => handleSetModal("signup")}>Get Started</button>
                    )
                }
            </div>

            {
                openMenu && (
                    <div className='z-[999] fixed top-0 left-0 h-screen w-screen bg-[#00000061]' onClick={closeMenu}>
                        <div className='visible-part bg-white w-[60%] h-full shadow-lg flex flex-col gap-3 py-3 px-2'>
                            <NavLink className={() => `text-sm p-2 rounded-sm hover:bg-background-green`} to={'/'}>Home</NavLink>
                            <Link className={`text-sm p-2 rounded-sm hover:bg-background-green`} onClick={() => scrollToSection('about')}>About</Link>
                            <Link className={`text-sm p-2 rounded-sm hover:bg-background-green`} onClick={() => scrollToSection('faq')}>FAQ</Link>
                            {
                                user && user?.role === 'admin' ? (<></>) : (

                                    <NavLink className={() => `text-sm p-2 rounded-sm hover:bg-background-green `} to={'/courses'}>Courses</NavLink>
                                )
                            }
                        </div>
                    </div>
                )
            }


            {
                modalOpen === 'signup' && (
                    <SignUp setActiveModal={handleSetModal} />
                )
            }
            {
                modalOpen === 'login' && (
                    <Login setActiveModal={handleSetModal} />
                )
            }
            {
                modalOpen === 'verification' && (
                    <Verification setActiveModal={handleSetModal} />
                )
            }

            <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
        </div>
    )
}

export default Header