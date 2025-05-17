
import { useGetEnrolledCoursesQuery } from '@/redux/features/courses/coursesApi'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CourseCard from '../Courses/CourseCard'
import Loading from '../Loading'

const EnrolledCourses = () => {
  const { user } = useSelector((state) => state.auth)

  const { data, isLoading, refetch } = useGetEnrolledCoursesQuery(undefined, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })

  useEffect(() => {
    refetch()
  }, [])


  return (
    <div className='w-full h-full px-26 py-12 flex justify-center overflow-y-hidden '>
      {
        isLoading ? (
          <Loading size='screen' />
        ) : (
          
            user?.courses?.length > 0 ? (
            <div className='grid grid-cols-4 gap-x-14 gap-y-6 place-content-start overflow-y-scroll max-h-[75vh] custom-scrollbar '>
              {
                data?.courses && data?.courses?.map((course, index) => (
                  <>
                    <CourseCard key={index} course={course} isEnrolled={true} />
                  </>
                ))
              }
            </div>
          ) : (
            <h2 className='flex items-center justify-center text-gray-600 text-sm'>You’re not enrolled in any course yet!</h2>
          )
      
      )
      }

    </div>
  )
}

export default EnrolledCourses