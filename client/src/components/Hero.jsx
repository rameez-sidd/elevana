import React, { useState } from 'react'
import heroImg from '../assets/images/hero-img.png'
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const Hero = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (search === '') {
            return
        }
        navigate(`/courses?title=${search}`)



    }

    return (
        <div className='pb-18 pt-12 md:py-18'>
            <div className='flex flex-col-reverse md:flex-row md:gap-0 lg:gap-12 mx-auto max-w-7xl '>
                <div className='px-3 xs:px-4 xl:px-4 b2xl:px-0! flex items-center xl:items-start '>
                    <div className='flex flex-col gap-5 xs:gap-6 md:gap-4 lg:gap-5 xl:gap-7'>
                        <h1 className='text-[2.9rem]/12 xs:text-[3.2rem] bmd:text-[3.5rem] md:text-[2.8rem]/11 blg:text-[3.2rem]/13! lg:text-[3.7rem]/14 bxl:text-[3.9rem]/15! xl:text-[5.5em]/23! md:text-left text-center'>Elevate Your Mind, Discover Your <span className='text-grass-green'>Nirvana</span>.</h1>
                        <p className='text-center md:text-left text-sm sm:text-base md:text-sm blg:text-[16px]! font-light w-[97%] xl:w-[92%] self-center md:self-start text-gray-800'>Embark on a journey of self-improvement with Elevana, where learning and growth come together to help you reach new heights.</p>
                        <form className='flex self-center md:self-start border-2 border-dark-orange w-[95%] xl:w-[70%]! rounded-4xl overflow-hidden mt-2 bg-dark-orange' onSubmit={handleSearch}>

                            <input className=' w-full p-3.5 py-2.5 outline-none border-none text-dark-orange font-[500] placeholder:text-dark-orange placeholder:font-[300] bg-background-green' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Courses...' type="search" name="searchCourses" id="" />
                            <button type='submit' className='cursor-pointer bg-dark-orange flex-1  px-4 text-white '><RiSearchLine size={23} /></button>
                        </form>
                    </div>
                </div>
                <div className='px-3 bsm:px-5 bsm2:px-6 sm:px-8 bmd:px-20 md:px-2 xl:px-0'>
                    <img src={heroImg} alt="Hero Image" className='w-[1300px] md:w-[850px] bxl:w-[900px]! xl:w-[1300px]!' />
                </div>
            </div>

        </div>
    )
}

export default Hero