import { useGetCoursesQuery } from '../../redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'

const CoursesContainer = () => {
    const {data, isLoading, refetch} = useGetCoursesQuery(undefined, {refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true})
    const [courses, setCourses] = useState([])

    useEffect(() => {
        refetch()
    }, [])
    
    console.log(data?.courses)
    
    
    
    return (
        <div className='py-16'>
            <div className='mx-auto max-w-7xl flex flex-col gap-6'>
                <h3 className='text-center text-3xl font-[800] py-4'>Start Your <span className='text-dark-grass-green'>Elevation</span> Journey</h3>
                <div className=' flex-1 grid grid-cols-4 gap-y-8'>
                    {
                        data?.courses && data?.courses?.map((course) => (
                            <CourseCard key={course._id} course={course}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CoursesContainer