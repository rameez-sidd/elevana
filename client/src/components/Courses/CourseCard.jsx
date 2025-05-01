import { Rating } from '@mui/material'
import React from 'react'
import { RiStackLine } from 'react-icons/ri'

const CourseCard = ({course}) => {
  return (
    <div className='bg-white rounded-md min-w-[290px] w-fit shadow-sm hover:shadow-xl cursor-pointer'>
        <div className='p-2.5 pb-0 flex items-center justify-center'>
            <div className='w-[270px] h-[150px] flex items-center justify-center bg-black rounded-sm overflow-hidden'>
                <img src={course?.thumbnail?.url} alt="course-thumbnail" className='object-contain w-full h-full object-center'/>

            </div>
            
        </div>

        <div className='p-3 flex flex-col min-h-[110px] w-[290px]'>
                <div className='text-lg font-[600] line-clamp-1 text-ellipsis'>
                    {course?.name}
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <Rating value={course?.ratings} size='small' readOnly/>
                    <p className='text-sm font-[600]'>{course?.purchased} {course?.purchased === 1 ? "Student" : "Students"}</p>
                </div>
                <div className='flex items-center justify-between mt-2'>
                    <div className='flex items-center gap-2'>
                        <p className='text-2xl font-[550] text-dark-green'>${course?.price}</p>
                        <p className='text-gray-500 text-sm font-[300] line-through'>${course?.estimatedPrice}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <RiStackLine/>
                        <p className='text-sm font-[600]'>{course?.courseData?.length} {course?.courseData?.length === 1 ? "Lecture" : "Lectures"}</p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CourseCard