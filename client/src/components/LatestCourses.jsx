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
    <div className='bg-light-green flex items-center py-12 pb-6 sm:py-18 sm:pb-13 md:py-23 md:pb-18'>
      <div className='mx-auto max-w-7xl w-7xl flex flex-col gap-0 md:gap-2 lg:gap-4 overflow-hidden'>
        <div className='flex flex-col gap-0 sm:gap-1.5 md:gap-2 px-2 md:px-0'>
          <h3 className='text-center text-[23px] sm:text-2xl md:text-3xl lg:text-4xl font-[700]'>Level Up with <span className='text-grass-green'>New Courses</span></h3>
          <p className='text-center text-[13px] sm:text-[15px] md:text-[17px] lg:text-lg text-gray-600'>Fresh content crafted to elevate your skills</p>
        </div>
        <div className=''>
          <Carousel className='w-full'>
            <CarouselContent className='-ml-1'>
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
            <CarouselPrevious className='cursor-pointer left-1.5 xs:left-6 sm:left-20 md:left-3 lg:left-1 xl:left-0'/>
            <CarouselNext className='cursor-pointer right-1.5 xs:right-6 sm:right-20 md:right-3 lg:right-1 xl:right-0'/>
          </Carousel>
        </div>

        
      </div>
    </div>
  )
}

export default LatestCourses