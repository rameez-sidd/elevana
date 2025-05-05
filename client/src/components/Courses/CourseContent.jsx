import { DecrementByOne, IncrementByOne, setActiveVideo } from '../../redux/features/courses/courseContentSlice';
import { useGetCourseContentQuery } from '../../redux/features/courses/coursesApi'
import { groupBySection } from '../../utils/courseContentGrouping';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { LucideTvMinimalPlay } from 'lucide-react';

const CourseContent = ({ id }) => {
    console.log(id);
    

    const { data: videoData, isLoading, refetch } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })


    const { activeVideo } = useSelector((state) => state.courseContent)
    const dispatch = useDispatch()



    const [activeDetail, setActiveDetail] = useState('overview')
    const [openSections, setOpenSections] = useState([])

    useEffect(() => {
        refetch()
        // Initialize all sections as open
        if (videoData?.content) {
            const allSections = groupBySection(videoData?.content, true)
            setOpenSections(allSections.map((_, index) => index))
        }
    }, [videoData?.content])

    const courseBySection = videoData?.content ? groupBySection(videoData?.content, true) : []
    console.log(courseBySection);

    const handleToggle = (index) => {
        setOpenSections(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }
    


    const handleNext = () => {
        if (activeVideo === videoData?.content?.length - 1) {
            return
        }
        dispatch(IncrementByOne())
    }

    const handlePrevious = () => {
        if (activeVideo === 0) {
            return
        }
        dispatch(DecrementByOne())
    }

    const handleSwitchVideo = (index) => {
        dispatch(setActiveVideo(index))
    }


    return (
        <div className='py-16 '>
            <div className='mx-auto max-w-7xl'>
                <div className='grid grid-cols-6'>
                    <div className='col-span-4 flex flex-col'>
                        <div className='flex flex-col gap-3'>
                            <div className='p-3 bg-black rounded-sm '>
                                <video src={videoData?.content[activeVideo]?.videoUrl} controls></video>
                            </div>
                            <h3 className='text-2xl font-[600]'>{videoData?.content[activeVideo]?.title}</h3>
                            <div className='flex items-center justify-between mt-3'>
                                <button className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' onClick={handlePrevious}>Previous</button>
                                <button className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' onClick={handleNext}>Next</button>
                            </div>

                            {/* Overview, Resources, Q&A, Reviews */}
                            <div className='mt-7 border border-gray-300 rounded-md overflow-hidden'>
                                <div className='flex items-center bg-light-green text-xs'>
                                    <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'overview' ? 'bg-muted-green-lighter text-white' : 'text-black'}`} onClick={() => setActiveDetail('overview')}>Overview</p>
                                    <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'resources' ? 'bg-muted-green-lighter text-white' : 'text-black'}`} onClick={() => setActiveDetail('resources')}>Resources</p>
                                    <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'qa' ? 'bg-muted-green-lighter text-white' : 'text-black'}`} onClick={() => setActiveDetail('qa')}>Q & A</p>
                                    <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'reviews' ? 'bg-muted-green-lighter text-white' : 'text-black'}`} onClick={() => setActiveDetail('reviews')}>Reviews</p>
                                </div>

                                <div className='h-[300px] p-3 py-5 text-sm overflow-y-scroll custom-scrollbar'>
                                    {
                                        activeDetail === 'overview' && <p>{videoData?.content[activeVideo]?.description}</p>
                                    }
                                    {
                                        activeDetail === 'resources' && (
                                            <div>
                                                {
                                                    videoData?.content[activeVideo]?.links.map((link) => (
                                                        <p key={link?._id}>{link?.title}: <a href={link?.title} className='ml-2 text-blue-700 font-[300] hover:underline'>{link?.url}</a></p>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className='col-span-2 pl-12'>
                        {
                            courseBySection && courseBySection.map((content, index) => (
                                <Collapsible key={index} open={openSections.includes(index)} onOpenChange={() => handleToggle(index)} className="border-b border-gray-300">
                                    <CollapsibleTrigger className=" w-full flex items-center justify-between  p-2 px-3 cursor-pointer ">
                                        <div className='flex-1 text-left '>
                                            <h5 className='font-[600]'>{content?.section}</h5>
                                            <div className='flex items-center gap-2 text-sm'>
                                                <p>{content?.videos?.length} {content?.videos?.length === 1 ? "Lesson" : "Lessons"}</p>
                                                <p>•</p>
                                                <p>{content?.sectionDuration} </p>
                                            </div>
                                        </div>
                                        {
                                            openSections.includes(index) ? <IoChevronUp /> : <IoChevronDown />
                                        }

                                    </CollapsibleTrigger>
                                    <CollapsibleContent className=" flex flex-col text-xs cursor-pointer">
                                        {
                                            content?.videos.map((video, index) => (
                                                <div className={`flex items-center px-6 py-3 gap-3 ${activeVideo === video?.videoIndex && "bg-dark-green text-white"}`} onClick={() => handleSwitchVideo(video?.videoIndex)} key={index}>
                                                    <LucideTvMinimalPlay size={20} />
                                                    <div>
                                                        <p>{video?.title}</p>
                                                        <p className='text-xs font-[300]'>{video?.length}</p>
                                                    </div>
                                                </div>

                                            ))
                                        }
                                    </CollapsibleContent>
                                </Collapsible>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseContent