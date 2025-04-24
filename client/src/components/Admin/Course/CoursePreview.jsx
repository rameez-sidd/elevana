import React from 'react'
import { Rating } from '@mui/material';
import { RiCheckDoubleFill } from "react-icons/ri";


const CoursePreview = ({ activeStep, setActiveStep, courseData, handleCourseCreate, isLoading }) => {

  const discountPercentage = (((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100).toFixed(0)

  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }
  const handleCreate = () => {
    handleCourseCreate()
  }

  return (
    <div className='px-12 py-12'>
      <div className='flex flex-col gap-12'>
        <div className=' flex flex-col gap-3'>
          <div className='bg-black  h-[500px] '>
            <video src={courseData?.demoUrl} controls poster={courseData?.thumbnail}  className='w-full h-full object-contain'></video>
          </div>

          <div className='flex items-center gap-2'>
            <p className='font-[600] text-4xl'>{courseData?.price === "0" ? "Free" : `$${courseData?.price}`}</p>
            <p className='self-start line-through text-gray-800 font-[300] text-sm'>${courseData?.estimatedPrice}</p>
            <p className='ml-3  text-sm bg-green-700 text-white rounded-full px-2 py-1'>{discountPercentage}% off</p>
          </div>

          <div>
            <button className='bg-dark-orange text-white p-2 px-8 mt-1 rounded-4xl cursor-pointer hover:bg-mid-orange'>Buy Now</button>
          </div>

          <div className='mt-3'>
            <ul className='list-disc list-inside text-sm'>
              <li>Source Code Included</li>
              <li>Full Lifetime Access</li>
              <li>Certificate of Completion</li>
              <li>Expert Support</li>
            </ul>
          </div>

          <div className='mt-3 flex flex-col gap-3'>
            <h2 className='text-3xl font-[600]'>{courseData?.name}</h2>

            <div className='flex items-center  gap-5 '>
              <div>
                <Rating defaultValue={0} precision={0.5} readOnly />
              </div>
              <p className='text-sm'>(0 Reviews)</p>
              <p className='text-sm'>|</p>
              <p className='text-sm'>0 Students Enrolled</p>
            </div>
          </div>

          <div className='flex flex-col gap-3 mt-6'>
            <h3 className='text-2xl font-[600]'>Why This Course Matters?</h3>
            <div className='flex flex-col gap-1'>
              {
                courseData?.benefits?.map((benefit, index) => (
                  <div key={index} className='flex items-center gap-3'><RiCheckDoubleFill /><p>{benefit.title}</p></div>
                ))
              }
            </div>
          </div>

          <div className='flex flex-col gap-3 mt-6'>
            <h3 className='text-2xl font-[600]'>What's Expected from You?</h3>
            <div className='flex flex-col gap-1'>
              {
                courseData?.prerequisites?.map((prerequisite, index) => (
                  <div key={index} className='flex items-center gap-3'><RiCheckDoubleFill /><p>{prerequisite.title}</p></div>
                ))
              }
            </div>
          </div>

          <div className='flex flex-col gap-3 mt-7'>
            <h3 className='text-2xl font-[600]'>What This Course Is About?</h3>
            <div>
              {courseData.description}
            </div>
          </div>


        </div>

        <div className='flex items-center justify-between'>
          <button className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' onClick={handlePrev}> Previous</button>
          <button disabled={isLoading} className={`bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => handleCreate()}>{isLoading ? "Creating..." : "Create"}</button>
        </div>
      </div>
    </div>
  )
}

export default CoursePreview