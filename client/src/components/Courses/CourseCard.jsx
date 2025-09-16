import { Rating } from '@mui/material'
import React from 'react'
import { RiStackLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'

const CourseCard = ({ course, isEnrolled }) => {
    const navigate = useNavigate()
    return (
            <div className={`bg-white rounded-md ${isEnrolled ? 'min-w-[150px]' : 'min-w-[250px]'} w-fit xs:w-full bsm:w-fit! shadow-lg hover:shadow-sm cursor-pointer  border border-gray-300`} onClick={() => {
                if(!isEnrolled) {
                    navigate(`/course/${course._id}`)
                }
            }}>
                <div className='p-2.5 pb-0 flex items-center justify-center'>
                    <div className={`${isEnrolled ? "w-[200px] sm:w-[170px] xs:w-[190px] md:w-[150px] h-[100px] md:h-[80px]" : "w-[250px] h-[150px]"}  flex items-center justify-center bg-black rounded-sm overflow-hidden`}>
                        <img src={course?.thumbnail?.url} alt="course-thumbnail" className='object-contain w-full h-full object-center' />

                    </div>

                </div>

                <div className={`mx-auto p-2 px-0 pt-1.5 flex flex-col   ${isEnrolled ? 'w-[200px] xs:w-[190px] sm:w-[170px] md:w-[150px]' : 'w-[250px] min-h-[110px]'}`}>
                    <div className={`${isEnrolled ? 'text-[15px] sm:text-sm' : 'text-lg'} font-[600] line-clamp-1 text-ellipsis`}>
                        {course?.name}
                    </div>
                    {
                        !isEnrolled && (
                            <>
                                <div className='flex items-center justify-between mt-6'>
                                    <Rating value={course?.ratings} size='small' precision={0.5} readOnly />
                                    <p className='text-sm font-[600]'>{course?.purchased} {course?.purchased === 1 ? "Student" : "Students"}</p>
                                </div>
                                <div className='flex items-center justify-between mt-2'>
                                    {
                                        isEnrolled ? (
                                            <div></div>
                                        ) : (
                                            <div className='flex items-center gap-2'>
                                                <p className='text-2xl font-[550] text-dark-green'>{course?.price === 0 ? "Free" : `₹${course?.price}`}</p>
                                                <p className='text-gray-500 text-sm font-[300] line-through'>₹{course?.estimatedPrice}</p>
                                            </div>
                                        )
                                    }

                                    <div className='flex items-center gap-2'>
                                        <RiStackLine />
                                        <p className='text-sm font-[600]'>{course?.courseData?.length} {course?.courseData?.length === 1 ? "Lecture" : "Lectures"}</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        isEnrolled && (
                            <div>
                                <button className='mt-3 w-full bg-red-700 text-white px-5 py-2 sm:py-1.5 rounded-md text-[13px] cursor-pointer hover:bg-red-500' onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/course-access/${course._id}`)
                                    }}>Continue</button>
                            </div>
                        )
                    }


                </div>
            </div>
    )
}

export default CourseCard