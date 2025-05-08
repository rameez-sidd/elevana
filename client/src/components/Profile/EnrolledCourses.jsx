
import { useGetEnrolledCoursesQuery } from '@/redux/features/courses/coursesApi'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CourseCard from '../Courses/CourseCard'

const EnrolledCourses = () => {
  const { user } = useSelector((state) => state.auth)

  const { data, isLoading, refetch } = useGetEnrolledCoursesQuery(undefined, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })

  useEffect(() => {
    refetch()
  }, [])


  return (
    <div className='w-full h-full px-26 py-12 flex justify-center overflow-y-hidden'>
      {
        user?.courses?.length > 0 ? (
          <div className='grid grid-cols-4 gap-6 overflow-y-scroll max-h-[80vh] custom-scrollbar'>
            {
              data?.courses && data?.courses?.map((course) => (
                <>
                <CourseCard key={course._id} course={course} isEnrolled={true} />
                {/* <CourseCard key={course._id} course={course} isEnrolled={true} /> */}
                {/* <CourseCard key={course._id} course={course} /> */}
                </>
              ))
            }
          </div>
        ) : (
          <h2 className=''>No Enrolled Courses</h2>
        )
      }
    </div>
  )
}

export default EnrolledCourses