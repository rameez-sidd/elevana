import { DecrementByOne, IncrementByOne, setActiveVideo } from '../../redux/features/courses/courseContentSlice';
import { useAddAnswerinQuestionMutation, useAddNewQuestionMutation, useAddReviewinCourseMutation, useGetCourseContentQuery } from '../../redux/features/courses/coursesApi'
import { groupBySection } from '../../utils/courseContentGrouping';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { LucideTvMinimalPlay } from 'lucide-react';
import profilePic from '../../assets/images/avatar.jpg'
import { data } from 'react-router-dom';
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import { MdVerified } from 'react-icons/md';

import socketIO from 'socket.io-client'
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { IoMdPlay } from "react-icons/io";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';

const ENDPOINT = import.meta.env.VITE_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

const CourseContent = ({ id, user, courseData, courseRefetch }) => {


    const { data: videoData, isLoading, refetch } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })


    const { activeVideo } = useSelector((state) => state.courseContent)
    const dispatch = useDispatch()

    const [addNewQuestion, { isLoading: isSubmittingQuestion }] = useAddNewQuestionMutation()
    const [addAnswerInQuestion, { isLoading: isSubmittingAnswer }] = useAddAnswerinQuestionMutation()
    const [addReviewInCourse, { isLoading: isSubmittingReview }] = useAddReviewinCourseMutation()

    const initialDetail = user?.role === 'admin' ? 'qa' : 'overview'

    const [activeDetail, setActiveDetail] = useState(initialDetail)
    const [openSections, setOpenSections] = useState([])
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [openReply, setOpenReply] = useState(null)
    const [openAllReplies, setOpenAllReplies] = useState(null)
    const [isShowButtons, setIsShowButtons] = useState(false)

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


    const isReviewExists = (courseData?.course?.reviews.find((item) => item?.user?._id === user?._id) || user?.role === 'admin')




    const toggleOpenReply = (index) => {
        setOpenReply((prev) => (prev === index ? null : index))
        setOpenAllReplies(null)
    }
    const toggleOpenAllReplies = (index) => {

        setOpenAllReplies((prev) => (prev === index ? null : index))
        setOpenReply(null)
    }

    const handleNext = () => {
        if (activeVideo === videoData?.content?.length - 1) {
            return
        }
        dispatch(IncrementByOne())
        setQuestion('')
        setAnswer('')
        setRating(0)
        setReview('')
        setOpenReply(null)
        setOpenAllReplies(null)
    }

    const handlePrevious = () => {
        if (activeVideo === 0) {
            return
        }
        dispatch(DecrementByOne())
        setQuestion('')
        setAnswer('')
        setRating(0)
        setReview('')
        setOpenReply(null)
        setOpenAllReplies(null)
    }

    const handleSwitchVideo = (index) => {
        dispatch(setActiveVideo(index))
        setQuestion('')
        setAnswer('')
        setRating(0)
        setReview('')
        setOpenReply(null)
        setOpenAllReplies(null)
    }

    const handleQuestionSubmit = async () => {
        if (question.length === 0) {
            return
        }
        try {
            await addNewQuestion({ question, courseId: id, contentId: videoData?.content[activeVideo]?._id }).unwrap()
            toast.success('Question posted successfully!')
            refetch()

            setQuestion("")
            socketId.emit("notification", {
                adminId: courseData?.course?.createdBy,
                notification: {
                    title: 'New Question Received',
                    message: `You have a new question in ${videoData?.content[activeVideo]?.title}`,
                    userId: user?._id
                }
            })
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong.";
            toast.error(message);
        }

    }

    const handleAnswerSubmit = async (questionId) => {
        if (answer.length === 0) {
            return
        }
        try {
            await addAnswerInQuestion({ answer, courseId: id, contentId: videoData?.content[activeVideo]?._id, questionId }).unwrap()
            toast.success('Reply added successfully!')
            refetch()
            setAnswer("")
            if (user?.role !== 'admin') {
                socketId.emit("notification", {
                    adminId: courseData?.course?.createdBy,
                    notification: {
                        title: 'New Reply Received',
                        message: `You have a new question reply in ${videoData?.content[activeVideo]?.title}`,
                        userId: user?._id
                    }
                })
            }
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong.";
            toast.error(message);
        }
    }

    const handleReviewSubmit = async () => {
        if (review.length === 0) {
            return
        }
        try {
            await addReviewInCourse({ review, rating, courseId: id }).unwrap()
            toast.success('Thank You for reviewing this course!')
            courseRefetch()
            setReview('')
            setRating(0)
            socketId.emit("notification", {
                adminId: courseData?.course?.createdBy,
                notification: {
                    title: 'New Review Received',
                    message: `${user?.name} has given a review in ${courseData?.name}`,
                    userId: user?._id
                }
            })
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong.";
            toast.error(message);
        }
    }



    return (
        <div className={`${user?.role === 'admin' ? 'p-12' : 'py-16 px-0'}`}>
            <div className='mx-auto max-w-7xl'>
                <div className='grid grid-cols-6  mt-4'>
                    <div className='col-span-4 flex flex-col'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-2xl font-[700] line-clamp-1 '>{videoData?.content[activeVideo]?.title}</h3>
                            <div className='p-3 bg-black rounded-sm relative' onMouseOver={() => setIsShowButtons(true)} onMouseLeave={() => setIsShowButtons(false)}>
                                {
                                    isShowButtons && (
                                        <div className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] z-10 flex items-center justify-between px-4 w-full '>
                                            <TbPlayerTrackPrevFilled size={70} className='text-[#ffffffd1] p-4 bg-[#000000a6] rounded-full cursor-pointer hover:scale-110 transition-transform duration-300' title='Previous' onClick={handlePrevious} />
                                            <TbPlayerTrackNextFilled size={70} className='text-[#ffffffd1] p-4 bg-[#000000a6] rounded-full cursor-pointer hover:scale-110 transition-transform duration-300' title='Next' onClick={handleNext} />
                                        </div>
                                    )
                                }

                                <video src={videoData?.content[activeVideo]?.videoUrl} controls className='w-full'></video>
                            </div>
                            

                            {/* Overview, Resources, Q&A, Reviews */}
                            <div className='mt-9 bg-white border border-gray-300 rounded-md overflow-hidden'>
                                <div className='flex items-center bg-gray-200 text-xs'>
                                    {
                                        user?.role !== 'admin' && (
                                            <>

                                                <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'overview' ? 'bg-gray-400 text-white' : 'text-black'}`} onClick={() => setActiveDetail('overview')}>Overview</p>
                                                <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'resources' ? 'bg-gray-400 text-white' : 'text-black'}`} onClick={() => setActiveDetail('resources')}>Resources</p>
                                            </>
                                        )
                                    }
                                    <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'qa' ? 'bg-gray-400 text-white' : 'text-black'}`} onClick={() => setActiveDetail('qa')}>Q & A</p>
                                    <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'reviews' ? 'bg-gray-400 text-white' : 'text-black'}`} onClick={() => setActiveDetail('reviews')}>Reviews</p>
                                </div>

                                <div className='h-[300px] p-3 py-5 text-sm overflow-y-scroll custom-scrollbar'>
                                    {
                                        activeDetail === 'overview' && user?.role !== 'admin' && <p>{videoData?.content[activeVideo]?.description}</p>
                                    }
                                    {
                                        activeDetail === 'resources' && user?.role !== 'admin' && (
                                            <div className='flex flex-col gap-2'>
                                                {
                                                    videoData?.content[activeVideo]?.links.map((link) => (
                                                        <p key={link?._id}>{link?.title}: <a href={link?.title} className='ml-2 text-blue-700 font-[300] hover:underline'>{link?.url}</a></p>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        activeDetail === 'qa' && (
                                            <>
                                                {
                                                    user?.role !== 'admin' && (
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex items-center gap-2'>
                                                                <img src={user?.avatar ? user?.avatar?.url : profilePic} alt="user-avatar" width={35} height={35} className='rounded-full object-cover border border-gray-300 self-start' />
                                                                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Ask your doubts...' rows={5} className='border border-gray-400 flex-1 resize-none rounded-sm outline-none px-2 py-1 text-xs placeholder:text-xs'></textarea>
                                                            </div>
                                                            <div className='flex justify-end'>
                                                                <button disabled={isSubmittingQuestion} className={`bg-black text-white text-xs px-4 py-1  rounded-full ${isSubmittingQuestion ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-300' : 'cursor-pointer hover:bg-gray-700'}`} onClick={handleQuestionSubmit}>{isSubmittingQuestion ? 'Submitting...' : 'Submit'}</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }


                                                {/* All Questions */}
                                                <div className='mt-4 flex flex-col gap-8'>
                                                    {
                                                        videoData?.content[activeVideo]?.questions?.slice().reverse().map((item, index) => (
                                                            <div className='flex items-center gap-3' key={index}>
                                                                <div className='self-start'>
                                                                    <img src={item?.user?.avatar ? item?.user?.avatar?.url : profilePic} alt="user-avatar" width={35} height={35} className='rounded-full object-cover border border-gray-300 self-start' />
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-0.5 '>
                                                                    <div className='flex items-center gap-2'>
                                                                        <p className='font-[500]'>{item?.user?.name}</p>
                                                                        <p className='text-gray-400 text-[10px]'>{format(item?.createdAt)}</p>
                                                                    </div>
                                                                    <p className='text-xs text-gray-800'>{item?.question}</p>
                                                                    <div className='flex items-center gap-2 mt-1.5'>
                                                                        <button className='text-xs border border-gray-300 hover:bg-gray-200 cursor-pointer px-3 py-1 rounded-full' onClick={() => toggleOpenAllReplies(index)}>{openAllReplies === index ? 'Hide Replies' : `${item?.questionReplies.length} Replies`}</button>
                                                                        <button className='text-xs border border-gray-300 hover:bg-gray-200 cursor-pointer px-3 py-1 rounded-full' onClick={() => toggleOpenReply(index)}>Reply</button>
                                                                    </div>
                                                                    {
                                                                        openReply === index && (
                                                                            <div className='flex items-center gap-3 mt-1.5'>
                                                                                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className='outline-none border-b border-gray-400 w-full text-xs p-1' placeholder='Add your reply...' />
                                                                                <button disabled={isSubmittingAnswer} className={`bg-grass-green text-white rounded-full text-xs px-4 py-1 ${isSubmittingAnswer ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : "cursor-pointer hover:bg-dark-grass-green"}`} onClick={() => handleAnswerSubmit(item?._id)}>Reply</button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    {
                                                                        openAllReplies === index && (
                                                                            item?.questionReplies.length > 0 ? (

                                                                                <div className='flex flex-col gap-4 mt-3'>
                                                                                    {

                                                                                        item?.questionReplies?.slice().reverse().map((reply, i) => (
                                                                                            <div className='flex items-center gap-3' key={i}>
                                                                                                <div >
                                                                                                    <img src={reply?.user?.avatar ? reply?.user?.avatar?.url : profilePic} alt="user-avatar" width={28} height={28} className='rounded-full object-cover border border-gray-300 self-start' />
                                                                                                </div>
                                                                                                <div className='flex-1 flex flex-col '>
                                                                                                    <div className='flex items-center gap-2'>
                                                                                                        <p className='font-[500] flex items-center gap-0.5'>{reply?.user?.name} {reply?.user?._id === courseData?.course?.createdBy && <MdVerified className='text-blue-700' size={17} />} </p>
                                                                                                        <p className='text-gray-400 text-[10px]'>{format(reply?.createdAt)}</p>
                                                                                                    </div>
                                                                                                    <p className='text-xs text-gray-800'>{reply?.answer}</p>
                                                                                                </div>

                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            ) : (
                                                                                <></>
                                                                            )
                                                                        )
                                                                    }


                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        activeDetail === 'reviews' && (

                                            <>
                                                {
                                                    !isReviewExists && (
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex items-center gap-2'>
                                                                <img src={user?.avatar ? user?.avatar?.url : profilePic} width={35} height={35} className='rounded-full object-cover border border-gray-300 self-start' />
                                                                <div className='flex-1 flex flex-col gap-1'>
                                                                    <Rating value={rating} precision={0.5} onChange={(event, newValue) => {
                                                                        setRating(newValue)
                                                                    }} />
                                                                    <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder='Write a review...' rows={5} className='border border-gray-400 flex-1 resize-none rounded-sm outline-none px-2 py-1 text-xs placeholder:text-xs'></textarea>
                                                                </div>
                                                            </div>
                                                            <div className='flex justify-end'>
                                                                <button disabled={isSubmittingReview} className={`bg-black text-white text-xs px-4 py-1 rounded-full ${isSubmittingReview ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300" : "cursor-pointer hover:bg-gray-700"}`} onClick={handleReviewSubmit}>{isSubmittingReview ? "Submitting..." : "Submit"}</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div className={`${!isReviewExists && "mt-4"} flex flex-col gap-8`}>
                                                    {
                                                        courseData?.course?.reviews?.slice().reverse().map((review, index) => (
                                                            <div className='flex items-center gap-3' key={index}>
                                                                <div className='self-start'>
                                                                    <img src={review?.user?.avatar ? review?.user?.avatar?.url : profilePic} width={35} height={35} className='rounded-full object-cover border border-gray-300 self-start' />
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-0.5'>
                                                                    <div className='flex items-center gap-1'>
                                                                        <p className='font-[500]'>{review?.user?.name}</p>
                                                                        <p>∙</p>
                                                                        <Rating readOnly precision={0.5} value={review?.rating} size='small' />

                                                                    </div>
                                                                    <p className='text-xs text-gray-800'>{review?.comment}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                            </>

                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  */}

                    <div className='col-span-2 pl-12'>
                        <h3 className='text-2xl font-[600] opacity-0'>Lessons</h3>
                        <div className='bg-white border border-gray-300 rounded-sm mt-2'>

                            {
                                courseBySection && courseBySection.map((content, index) => (
                                    <Collapsible key={index} open={openSections.includes(index)} onOpenChange={() => handleToggle(index)} className={`${index !== courseBySection.length - 1 && "border-b border-gray-300"}`}>
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
                                        <CollapsibleContent className=" flex flex-col text-xs cursor-pointer my-1.5">
                                            {
                                                content?.videos.map((video, index) => (
                                                    <div className={`flex items-center mx-4 px-3 py-3 rounded-sm gap-3 ${activeVideo === video?.videoIndex && "bg-grass-green  text-white"}`} onClick={() => handleSwitchVideo(video?.videoIndex)} key={index}>
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
        </div>
    )
}

export default CourseContent