import { useGetCoursesQuery } from '../../redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import Loading from '../Loading'
import { useGetLayoutDataQuery } from '../../redux/features/layout/layoutApi'
import { useLocation } from 'react-router-dom'
import Fuse from 'fuse.js'

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
        if(!data?.courses){
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
    };
    

    return (
        <div className='py-16  pb-32'>
            {
                isLoading ? (
                    <Loading size="screen" />
                ) : (
                    <div className='mx-auto max-w-7xl flex flex-col gap-6'>
                        {/* <h3 className='text-center text-3xl font-[800] py-4'>Start Your <span className='text-dark-grass-green'>Elevation</span> Journey</h3> */}
                        <div className='flex items-center justify-between gap-12'>

                            <div className='flex items-center gap-8  overflow-x-scroll custom-scrollbar'>
                                <p className={`${category === 'All' ? 'bg-grass-green text-white' : 'bg-white'} px-3.5 py-0.5  rounded-full text-sm text-center border border-gray-200 cursor-pointer`} onClick={() => { 
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
                        <div className=' flex-1 grid grid-cols-4 gap-y-12 mt-4 place-items-center'>
                            {
                                courses && courses?.map((course) => (
                                    <CourseCard key={course._id} course={course} isEnrolled={false} />
                                ))
                            }
                            {
                                courses && courses.length === 0  && (
                                    <p className=' w-full col-span-4 text-center py-24 text-gray-600 text-sm'>Sorry, No courses found :(</p>
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