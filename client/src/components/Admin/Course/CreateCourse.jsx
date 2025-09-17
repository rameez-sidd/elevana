import React from 'react'
import DashboardHeader from '../DashboardHeader'
import CourseSteps from './CourseSteps'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CreateCourse = () => {
  const isEditing = useSelector((state) => state.courseCreation.isEditing)
  

  return (
    <div className='flex flex-col h-screen'>
      <DashboardHeader title={isEditing ? "Edit Course" : "Create Course"} />
      <div className='flex-1 flex '>
        <div className='flex-1'>
          <Outlet/>
        </div>
        <div className='pl-0 b2xl:pl-6 px-6 py-12'>
          <CourseSteps/>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse