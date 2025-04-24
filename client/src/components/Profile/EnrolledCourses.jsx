
import React from 'react'
import { useSelector } from 'react-redux'

const EnrolledCourses = () => {
  const {user} = useSelector((state) => state.auth)
  return (
    <div className=' flex-1  flex items-center justify-center'>
      {
        user?.courses?.length > 0 ? (
          <div className=''>
            Your Courses
          </div>
        ) : (
          <h2 className=''>No Enrolled Courses</h2>
        )
      }
    </div>
  )
}

export default EnrolledCourses