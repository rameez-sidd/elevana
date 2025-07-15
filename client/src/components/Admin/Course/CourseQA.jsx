import React, { useEffect } from 'react'
import DashboardHeader from '../DashboardHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useLoadUserQuery } from '../../../redux/api/apiSlice'
import { useGetCourseDetailsQuery } from '../../../redux/features/courses/coursesApi'
import Loading from '../../../components/Loading'
import CourseContent from '../../../components/Courses/CourseContent'
import { setActiveVideo } from '../../../redux/features/courses/courseContentSlice'

const CourseQA = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, error, data } = useLoadUserQuery(undefined, {})
    const { user } = useSelector((state) => state.auth)
    const { data: courseData, isLoading: isGettingCourse, refetch } = useGetCourseDetailsQuery(id, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true })

    

   

    return (
        <div className='flex flex-col h-screen'>
            <DashboardHeader title='Q & A' />
            <div className='flex-1'>
                {
                    isLoading ? (
                        <Loading size='screen' />
                    ) : (
                        <CourseContent id={id} user={user} courseData={courseData} courseRefetch={refetch} />
                    )
                }
            </div>
        </div>
    )
}

export default CourseQA