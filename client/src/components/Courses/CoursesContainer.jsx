import { useGetCoursesQuery } from '../../redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import Loading from '../Loading'
import { useGetLayoutDataQuery } from '../../redux/features/layout/layoutApi'
import { useLocation } from 'react-router-dom'
import Fuse from 'fuse.js'
import { IoChevronDown } from 'react-icons/io5'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const CoursesContainer = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('title');

    const [search, setSearch] = useState(searchQuery)


    const { data: categoriesData, isLoading: isGettingCategories, refetch: refetchCategories } = useGetLayoutDataQuery("Categories", { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })
    const { data, isLoading, refetch } = useGetCoursesQuery(undefined, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })
    const [courses, setCourses] = useState([])
    const [category, setCategory] = useState('All')

    console.log(search);
    console.log(data?.courses);



    useEffect(() => {
        refetch()
        refetchCategories()
    }, [])

    const fuseOptions = {
        keys: ["name", "description"], // Fields to search
        threshold: 0.4, // Adjust based on matching flexibility
    };

    useEffect(() => {
        if (!data?.courses) {
            return
        }
        if (category === 'All') {
            setCourses(data?.courses)
        }
        if (category !== 'All') {
            setCourses(data?.courses.filter((item) => item.categories === category))
        }
        if (search) {
            const fuse = new Fuse(data?.courses, fuseOptions)
            const results = fuse?.search(search)
            setCourses(results.map((result) => result.item))
            // setCourses(data?.courses.filter((item) => item?.name.toLowerCase().includes(search.toLowerCase())))
        }

    }, [data, category, search])



    const categories = categoriesData?.layout?.categories

    const handleReset = () => {
        setSearch('');
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('title');
        window.history.replaceState(null, '', newUrl.toString());
        setCategory('All');
    };


    return (
        <div className='py-12 pb-16 sm:pb-20 md:py-14 md:pb-24 blg:py-18! blg:pb-28! lg:pt-16! lg:pb-32'>
            {
                isLoading ? (
                    <Loading size="screen" />
                ) : (
                    <div className='mx-auto max-w-7xl flex flex-col gap-3 md:gap-4.5 lg:gap-6'>
                        {/* <h3 className='text-center text-3xl font-[800] py-4'>Start Your <span className='text-dark-grass-green'>Elevation</span> Journey</h3> */}
                        <div className='blg:flex items-center justify-between px-6 lg:px-10 bxl:px-18! b2xl:px-0! gap-12 hidden'>

                            <div className='flex items-center gap-4 xl:gap-8  overflow-x-scroll custom-scrollbar'>
                                <p className={`${category === 'All' ? 'bg-grass-green text-white' : 'bg-white'} px-3.5 py-0.5 pb-1  rounded-full text-sm text-center border border-gray-200 cursor-pointer`} onClick={() => {
                                    handleReset()
                                    setCategory('All')
                                }}>All</p>
                                {
                                    categories && categories.map((item, index) => (
                                        <p key={index} className={`${item.title === category ? 'bg-grass-green text-white' : 'bg-white'} px-3.5 py-0.5 pb-1 border border-gray-200 rounded-full text-sm text-center cursor-pointer whitespace-nowrap`} onClick={() => {
                                            handleReset()
                                            setCategory(item.title)
                                        }}>{item?.title}</p>
                                    ))
                                }
                            </div>
                            <button className='text-xs text-blue-600 hover:underline cursor-pointer' onClick={handleReset}>Reset</button>
                        </div>

                        <div className='flex items-center justify-between px-4 pl-3 sm:px-9 sm:pl-9 md:px-18 md:pl-17 blg2:px-24! blg2:pl-23! blg:hidden'>
                            <Popover>

                                <PopoverTrigger className='bg-white px-2.5 py-0.5 rounded-full text-[12px] text-center border border-gray-200 cursor-pointer flex items-center gap-1.5'>
                                    <p>{category}</p>
                                    <IoChevronDown size={12} />
                                </PopoverTrigger>
                                <PopoverContent className='flex p-2 py-3 flex-wrap gap-1 gap-y-1.5'>
                                    {
                                    categories && categories.map((item, index) => (
                                        <p key={index} className={`${item.title === category ? 'bg-grass-green text-white' : 'bg-gray-50'} px-3 py-0.5 border border-gray-200 rounded-full text-xs text-center cursor-pointer whitespace-nowrap`} onClick={() => {
                                            handleReset()
                                            setCategory(item.title)
                                        }}>{item?.title}</p>
                                    ))
                                }
                                </PopoverContent>
                            </Popover>
                            <button className='text-xs text-blue-600 hover:underline cursor-pointer' onClick={handleReset}>Reset</button>
                        </div>
                        <div className=' flex-1 grid grid-cols-1 sm:grid-cols-2 blg:grid-cols-3! b2xl:grid-cols-4! gap-y-6 sm:px-5 md:px-18 md:gap-y-8 blg2:px-24! blg2:gap-y-12! blg:px-0! bxl:px-12! b2xl:px-0! mt-4 place-items-center'>
                            {
                                courses && courses?.map((course) => (
                                    <CourseCard key={course._id} course={course} isEnrolled={false} />
                                ))
                            }
                            {
                                courses && courses.length === 0 && (
                                    <p className=' w-full col-span-4 text-center py-48 text-gray-600 text-sm'>Sorry, No courses found :(</p>
                                )
                            }
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default CoursesContainer