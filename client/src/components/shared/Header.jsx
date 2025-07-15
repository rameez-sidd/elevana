import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import SignUp from '../Auth/SignUp'
import Login from '../Auth/Login'
import Verification from '../Auth/Verification'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import profilePic from '../../assets/images/avatar.jpg'
import { setModalOpen } from '../../redux/features/auth/authSlice'

const Header = ({isProfileOpen, setIsProfileOpen}) => {
    const {user, modalOpen} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleSetModal = (modal) => {
        dispatch(setModalOpen(modal))
    }

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if(element){
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className='grid grid-cols-3 items-center mx-auto max-w-7xl p-3 py-5 w-full'>
            <h1 className='justify-self-start font-plaster text-3xl text-dark-green'>Elevana</h1>
            <div className='justify-self-center flex items-center gap-8 font-light '>
                <NavLink className={({isActive}) => `text-sm  p-1 border-b-2 border-transparent hover:text-dark-green hover:border-dark-green transition-all duration-300 ${isActive ? 'text-dark-green font-[600] px-0.5' : ' text-gray-600 px-1'} `} to={'/'}>Home</NavLink>
                <Link className={`text-sm p-1 border-b-2 border-transparent hover:text-dark-green hover:border-dark-green transition-all duration-300 text-gray-600 px-1`} onClick={() => scrollToSection('about')}>About</Link>
                <Link className={`text-sm p-1 border-b-2 border-transparent hover:text-dark-green hover:border-dark-green transition-all duration-300 text-gray-600 px-1`} onClick={() => scrollToSection('faq')}>FAQ</Link>
                {
                    user && user?.role === 'admin' ? (<></>) : (

                        <NavLink className={({isActive}) => `text-sm p-1 border-b-2 border-transparent hover:text-dark-green hover:border-dark-green transition-all duration-300 ${isActive ? 'text-dark-green font-[600] px-0.5' : ' text-gray-600 px-1'} `} to={'/courses'}>Courses</NavLink>
                    )
                }
            </div>
            <div className='justify-self-end flex items-center justify-center'>
                {
                    user ? (
                        <img src={user.avatar ? user.avatar.url : profilePic} alt="avatar" className={`w-7 h-7 rounded-full object-cover cursor-pointer hover:outline-3 ${isProfileOpen ? 'outline-3 outline-dark-green hover:dark-green' : "hover:outline-grass-green"}`} onClick={() => (user?.role === 'admin' ? navigate('/admin/admin-dashboard') : navigate('/profile'))}/>
                    ): (
                        <button className='bg-dark-green text-sm text-white py-2.5 px-7 font-[300] cursor-pointer hover:bg-dark-grass-green rounded-4xl' onClick={() => handleSetModal("signup")}>Get Started</button>
                    )
                }
            </div>

            {
                modalOpen === 'signup' && (
                    <SignUp setActiveModal={handleSetModal}/>
                )
            }
            {
                modalOpen === 'login' && (
                    <Login setActiveModal={handleSetModal}/>
                )
            }
            {
                modalOpen === 'verification' && (
                    <Verification setActiveModal={handleSetModal}/>
                )
            }
        </div>
    )
}

export default Header