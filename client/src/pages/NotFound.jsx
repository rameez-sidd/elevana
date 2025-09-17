import React from 'react'
import NotFoundImg from '../assets/images/not-found.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-screen bg-background-green flex items-center justify-center'>
        <div className='flex flex-col items-center max-w-[80vw] bsm2:max-w-[440px]'>
            <img src={NotFoundImg} className='w-[220px] sm:w-[255px] md:w-[290px]'/>
            <p className='text-lg font-bold mt-4'>OOPS! PAGE NOT FOUND</p>
            <p className='text-center mt-3 text-sm sm:text-[15px] md:text-base'>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <Link to='/' className='mt-5 bg-black text-xs md:text-[13px] lg:text-sm text-white py-2 px-4 sm:py-2.5 sm:px-5 md:px-6  lg:px-7 font-[300] cursor-pointer hover:bg-zinc-700 shadow-sm rounded-4xl'>GO TO HOMEPAGE</Link>
        </div>
    </div>
  )
}

export default NotFound