import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    return (
        <div className='bg-black text-white py-12 '>
            <div className='mx-auto max-w-7xl'>
                <div className='grid grid-cols-4'>
                    <div className='col-span-2'>
                        <h2 className='font-plaster text-4xl'>Elevana</h2>
                        <h5 className='mt-6'>Contact Us:</h5>
                        <div className='mt-3 font-[300] text-sm'>
                            <p>Address:  Greenfield Lane, Noida, UP - 201310</p>
                            <p>Email:  <a href='#' className='hover:underline'>hello@elevana.com</a></p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h5>Quick Links</h5>
                        <div className='font-[300] text-sm flex flex-col gap-2'>
                            {
                                user?.role !== 'admin' && 
                                <p className='cursor-pointer hover:underline w-fit' onClick={() => navigate('/courses')}>Courses</p>
                            }
                            <p className='cursor-pointer hover:underline w-fit' onClick={() => (user?.role === 'admin' ? navigate('/admin/admin-dashboard/profile') : navigate('/profile') )}>My Account</p>
                            {
                                user?.role === 'admin' && 
                                <p className='cursor-pointer hover:underline w-fit' onClick={() => navigate('/admin/admin-dashboard/all-courses')}>Course Dashboard</p>
                            }
                        </div>
                    </div>
                    <div className='flex justify-center '>
                        <div className='flex flex-col gap-4 '>

                        <h5 className='px-2'>Social Links</h5>
                        <div className='font-[300] text-sm flex flex-col gap-2'>
                            <p className='w-24 px-2 rounded-2xl hover:bg-[#FF0033] transition-all duration-300 cursor-pointer'>Youtube</p>
                            <p className='w-24 px-2 rounded-2xl hover:bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] transition-all duration-300 cursor-pointer'>Instagram</p>
                            <p className='w-24 px-2 rounded-2xl hover:bg-[#3EBA54] transition-all duration-300 cursor-pointer'>GitHub</p>
                        </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Footer