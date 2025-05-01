import React from 'react'
import { Rating } from '@mui/material';
import { RiCheckDoubleFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateCourseMutation, useEditCourseMutation, useGetCourseForEditQuery } from '../../../redux/features/courses/coursesApi';
import { toast } from 'react-toastify';
import { resetCourseCreation } from '../../../redux/features/courses/courseCreationSlice';

const CoursePreview = () => {
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.courseCreation.courseData);
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const [editCourse, { isLoading: isUpdating }] = useEditCourseMutation()
  const {isEditing, editingCourseId} = useSelector((state) => state.courseCreation)
  const navigate = useNavigate();

  const discountPercentage = (((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100).toFixed(0)

  const handlePrev = () => {
    navigate('/admin/admin-dashboard/create-course/course-content')
  }

  

  const handleCreate = async () => {
    try {
      const res = await createCourse(courseData).unwrap();
      toast.success("Course created successfully!");
      dispatch(resetCourseCreation())
      navigate('/admin/admin-dashboard/all-courses');
    } catch (error) {
      const message = error?.data?.message || error?.message || "Something went wrong.";
      toast.error(message);
    }
  }
  const handleUpdate = async () => {
    try {
      
      const res = await editCourse({id:editingCourseId, data:courseData}).unwrap();
      toast.success("Course updated successfully!");
      dispatch(resetCourseCreation())
      navigate('/admin/admin-dashboard/all-courses');
    } catch (error) {
      const message = error?.data?.message || error?.message || "Something went wrong.";
      toast.error(message);
    }
  }

  return (
    <div className='px-12 py-12'>
      <div className='flex flex-col gap-12'>
        <div className=' flex flex-col gap-3'>
          <div className='bg-black  h-[500px] '>
            {
              courseData?.demoUrl ? (
                <video src={courseData?.demoUrl} controls poster={courseData?.thumbnail?.url || courseData?.thumbnail} className='w-full h-full object-contain'></video>
              ) : (
                <div className='bg-gray-300 h-[500px] flex items-center justify-center'>No Demo Video</div>
              )
            }
          </div>

          <div className='flex items-center gap-2'>
            <p className='font-[600] text-4xl'>{courseData?.price === "0" ? "Free" : `$${courseData?.price}`}</p>
            <p className='self-start line-through text-gray-800 font-[300] text-sm'>${courseData?.estimatedPrice}</p>
            <p className='ml-3 bg-gray-300 rounded-full px-2 py-1'>{discountPercentage}% off</p>
          </div>

          <div>
            <button className='bg-dark-grass-green text-white p-2 px-8 mt-1 rounded-4xl cursor-pointer hover:bg-grass-green'>Buy Now</button>
          </div>

          <div className='mt-4'>
            <ul className='list-disc list-inside text-sm flex flex-col gap-1.5'>
              <li>Source Code Included</li>
              <li>Full Lifetime Access</li>
              <li>Certificate of Completion</li>
              <li>Expert Support</li>
            </ul>
          </div>

          <div className='flex flex-col gap-3 mt-5'>
            <h2 className='text-3xl font-[700]'>{courseData.name}</h2>
            <div className='flex items-center gap-4'>
              <Rating value={0} readOnly />
              <p className='text-sm text-gray-600'>(0 reviews)</p>
              <p className='text-sm text-gray-600'>|</p>
              <p className='text-sm text-gray-600'>0 Students Enrolled</p>
            </div>
          </div>





          <div className='flex flex-col gap-2 mt-6'>
            <h2 className='text-2xl font-[600]'>Why should you join us?</h2>
            <div className='flex flex-col gap-2'>
              {courseData?.benefits?.map((benefit, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <RiCheckDoubleFill size={20} />
                  <p className='text-sm'>{benefit.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-6'>
            <h2 className='text-2xl font-[600]'>What do you need before starting?</h2>
            <div className='flex flex-col gap-2'>
              {courseData?.prerequisites?.map((prerequisite, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <RiCheckDoubleFill size={20} />
                  <p className='text-sm'>{prerequisite.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-6'>
            <h2 className='text-2xl font-[600]'>What's this course all about?</h2>
            <div>
              {courseData?.description}
            </div>
          </div>


        </div>

        <div className='flex items-center justify-between mt-3'>
          <button disabled={isLoading || isUpdating} className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' onClick={handlePrev}>Previous</button>
          {
            isEditing ? (
              <button disabled={isUpdating} className={`bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm ${isUpdating ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : "cursor-pointer hover:bg-dark-grass-green"}`} onClick={handleUpdate}>{isUpdating ? "Updating..." : "Update"}</button>
            ) : (
              <button disabled={isLoading} className={`bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm ${isLoading ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : "cursor-pointer hover:bg-dark-grass-green"}`} onClick={handleCreate}>{isLoading ? "Creating..." : "Create"}</button>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default CoursePreview