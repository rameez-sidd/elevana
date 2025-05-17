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
        <div className='py-18'>
            <div className='flex gap-12 mx-auto max-w-7xl '>
                <div className=''>
                    <div className='flex flex-col gap-7'>
                        <h1 className='text-[5.5em]/23'>Elevate Your Mind, Discover Your <span className='text-grass-green'>Nirvana</span>.</h1>
                        <p className='text-md font-light text-gray-800'>Embark on a journey of self-improvement with Elevana, where learning and growth <br />come together to help you reach new heights.</p>
                        <form className='flex border-2 border-dark-orange w-[70%] rounded-4xl overflow-hidden mt-2' onSubmit={handleSearch}>

                            <input className=' w-full p-3.5 py-2.5 outline-none border-none text-dark-orange font-[500] placeholder:text-dark-orange placeholder:font-[300]' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Courses...' type="search" name="searchCourses" id="" />
                            <button type='submit' className='cursor-pointer bg-dark-orange flex-1  px-4 text-white '><RiSearchLine size={23} /></button>
                        </form>
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