import Header from '../components/shared/Header'
import CourseContent from '../components/Courses/CourseContent'
import Loading from '../components/Loading'
import { useLoadUserQuery } from '../redux/api/apiSlice'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCourseDetailsQuery } from '../redux/features/courses/coursesApi'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveVideo } from '../redux/features/courses/courseContentSlice'

const CourseAccessPage = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isLoading, error, data} = useLoadUserQuery(undefined, {})
  const {user} = useSelector((state) => state.auth)
  const { data:courseData, isLoading: isGettingCourse, refetch } = useGetCourseDetailsQuery(id, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true })

  useEffect(() => {
    if(user){
      const isPurchased = user?.courses.find((item) => item._id === id)
      if(!isPurchased){
        navigate('/')
      } 
      
    }
  }, [])

  // Reset activeVideo when course ID changes
  useEffect(() => {
    dispatch(setActiveVideo(0))
  }, [id, dispatch])

  return (
    <div className='bg-background-green'>
      <Header />
            {
                isLoading ? (
                    <Loading size='screen' />
                ) : (
                      <CourseContent id={id} user={user} courseData={courseData} courseRefetch={refetch}/>
                )
            }
    </div>
  )
}

export default CourseAccessPage