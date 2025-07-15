import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useGetCoursesQuery } from '../redux/features/courses/coursesApi'
import CourseCard from './Courses/CourseCard'

const LatestCourses = () => {

  const { data, isLoading, refetch } = useGetCoursesQuery(undefined, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })
  const [courses, setCourses] = useState([])

  useEffect(() => {
    refetch()
  }, [])





  return (
    <div className='bg-light-green min-h-screen flex items-center'>
      <div className='mx-auto max-w-7xl w-7xl flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-center text-4xl font-[700]'>Level Up with <span className='text-grass-green'>New Courses</span></h3>
          <p className='text-center text-lg text-gray-600'>Fresh content designed to push your potential further</p>
        </div>
        <div className=''>
          <Carousel className='w-full'>
            <CarouselContent className='-ml-1 '>
              {
                data?.courses && data?.courses.slice(0, 6)?.map((course) => (
                  <CarouselItem key={course._id} className="pl-1 py-10 md:basis-1/2 lg:basis-1/3 flex items-center justify-center">
                    <div className='p-1'>
                    <CourseCard course={course} />

                    </div>
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious className='cursor-pointer'/>
            <CarouselNext className='cursor-pointer'/>
          </Carousel>
        </div>

        
      </div>
    </div>
  )
}

export default LatestCourses