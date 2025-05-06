import Header from '../components/shared/Header'
import CourseContent from '../components/Courses/CourseContent'
import Loading from '../components/Loading'
import { useLoadUserQuery } from '../redux/api/apiSlice'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCourseDetailsQuery } from '../redux/features/courses/coursesApi'

const CourseAccessPage = () => {
  const {id} = useParams()
  
  const navigate = useNavigate()

  const {isLoading, error, data} = useLoadUserQuery(undefined, {})
  const { data:courseData, isLoading: isGettingCourse, refetch } = useGetCourseDetailsQuery(id, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true })

  useEffect(() => {
    if(data){
      const isPurchased = data?.user?.courses.find((item) => item._id === id)
      if(!isPurchased){
        navigate('/')
      } 
      if(error){
        navigate('/')

      }
    }
  }, [data, error])

  return (
    <div className='bg-background-green'>
      <Header />
            {
                isLoading ? (
                    <Loading size='screen' />
                ) : (
                      <CourseContent id={id} user={data?.user} courseData={courseData} courseRefetch={refetch}/>
                )
            }
    </div>
  )
}

export default CourseAccessPage