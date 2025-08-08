import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import SignUp from '../Auth/SignUp'
import Login from '../Auth/Login'
import Verification from '../Auth/Verification'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import profilePic from '../../assets/images/avatar.jpg'
import { setModalOpen } from '../../redux/features/auth/authSlice'

const Header = ({ isProfileOpen, setIsProfileOpen }) => {
    const { user, modalOpen } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false);

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
        <div className='flex justify-between md:grid md:grid-cols-3 items-center mx-auto max-w-7xl py-0.5 pr-1 sm:p-1.5 md:p-2 lg:p-3 lg:py-5 w-full '>
            <h1 className='hidden md:inline justify-self-start font-plaster text-2xl lg:text-3xl text-dark-green'>Elevana</h1>
            <h1 className='md:hidden flex items-center justify-center font-plaster text-4xl text-dark-green h-10 w-10 text-center align-middle rounded-full hover:bg-zinc-200' onClick={() => setOpenMenu(true)}>v</h1>
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
                        <img src={user.avatar ? user.avatar.url : profilePic} alt="avatar" className={`w-7 h-7 rounded-full object-cover cursor-pointer hover:outline-3 ${isProfileOpen ? 'outline-3 outline-dark-green hover:dark-green' : "hover:outline-grass-green"}`} onClick={() => (user?.role === 'admin' ? navigate('/admin/admin-dashboard') : navigate('/profile'))} />
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
        </div>
    )
}

export default Header