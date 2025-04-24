import React from 'react'
import heroImg from '../assets/images/hero-img.png'
import { RiSearchLine } from "react-icons/ri";


const Hero = () => {
    return (
        <div className='py-18'>
            <div className='flex gap-12 mx-auto max-w-7xl '>
                <div className=''>
                    <div className='flex flex-col gap-7'>
                        <h1 className='text-[5.5em]/23'>Elevate Your Mind, Discover Your <span className='text-grass-green'>Nirvana</span>.</h1>
                        <p className='text-md font-light text-gray-800'>Embark on a journey of self-improvement with Elevana, where learning and growth <br />come together to help you reach new heights.</p>
                        <div className='flex  border-2 border-dark-orange w-[70%] rounded-4xl overflow-hidden mt-2'>
                            <input className='font-light w-full p-3.5 py-2.5 outline-none border-none placeholder-dark-orange' placeholder='Search Courses...' type="search" name="searchCourses" id="" />
                            <button className='cursor-pointer bg-dark-orange flex-1  px-4 text-white '><RiSearchLine size={23}/></button>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <img src={heroImg} alt="Hero Image" width={1300} />
                </div>
            </div>

        </div>
    )
}

export default Hero