import { decrementCurrentVideo, incrementCurrentVideo, setActiveVideos } from '../../redux/features/courses/courseContentSlice';
import { useAddAnswerinQuestionMutation, useAddNewQuestionMutation, useAddReviewinCourseMutation, useGetCourseContentQuery } from '../../redux/features/courses/coursesApi'
import { groupBySection } from '../../utils/courseContentGrouping';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { IoChevronDown, IoChevronUp, IoPlaySkipBack, IoPlaySkipBackSharp, IoPlaySkipForward, IoPlaySkipForwardSharp } from 'react-icons/io5';
import { LuTvMinimalPlay } from "react-icons/lu";
import profilePic from '../../assets/images/avatar.jpg'
import { data } from 'react-router-dom';
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import { MdVerified } from 'react-icons/md';

import socketIO from 'socket.io-client'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { IoIosPlay } from 'react-icons/io';
import useInteractionType from '@/utils/DeviceScreenDetector';
import { CgClose } from 'react-icons/cg';

const ENDPOINT = import.meta.env.VITE_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

const CourseContent = ({ id, user, courseData, courseRefetch }) => {


    const { data: videoData, isLoading, refetch } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })
    console.log(videoData);
    console.log(courseData);




    const { activeVideos = [] } = useSelector((state) => state.courseContent)
    const activeVideo = activeVideos.find((video) => video.id === id)?.currentVideo || 0
    const dispatch = useDispatch()

    const [addNewQuestion, { isLoading: isSubmittingQuestion }] = useAddNewQuestionMutation()
    const [addAnswerInQuestion, { isLoading: isSubmittingAnswer }] = useAddAnswerinQuestionMutation()

    const initialDetail = user?.role === 'admin' ? 'qa' : 'overview'

    const [activeDetail, setActiveDetail] = useState(initialDetail)
    const [openSections, setOpenSections] = useState([])
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const [openReply, setOpenReply] = useState(null)
    const [openAllReplies, setOpenAllReplies] = useState([])
    const [isShowButtons, setIsShowButtons] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPlayButton, setShowPlayButton] = useState(true);
    const [controlsTimeout, setControlsTimeout] = useState(null);
    const [showChapters, setShowChapters] = useState(false);

    const { isTouchDevice, hasHover } = useInteractionType();

    useEffect(() => {
        if (showChapters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup: Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showChapters]);

    const toggleControls = () => {
        if (controlsTimeout) {
            clearTimeout(controlsTimeout);
            setControlsTimeout(null);
        }

        setIsShowButtons(prev => !prev);

        if (!isShowButtons) {
            const timeout = setTimeout(() => {
                setIsShowButtons(false);
            }, 3000);
            setControlsTimeout(timeout);
        }
    };

    const hideControls = () => {
        setIsShowButtons(false);
        if (controlsTimeout) {
            clearTimeout(controlsTimeout);
            setControlsTimeout(null);
        }
    };

    useEffect(() => {
        return () => {
            if (controlsTimeout) {
                clearTimeout(controlsTimeout);
            }
        };
    }, [controlsTimeout]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            setIsPlaying(true);
            setShowPlayButton(false);
        };

        const handlePause = () => {
            setIsPlaying(false);
            setShowPlayButton(true);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setShowPlayButton(true);
        };

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

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
        setOpenAllReplies((prev) => prev.filter(i => i !== index))
    }
    const toggleOpenAllReplies = (index, replies) => {
        if (replies <= 0) {
            return
        }
        setOpenAllReplies((prev) => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]))
        if (openReply === index) {
            setOpenReply(null)
        }
    }

    const handleNext = () => {
        if (activeVideo === videoData?.content?.length - 1) {
            return
        }
        dispatch(incrementCurrentVideo({ id }))
        setQuestion('')
        setAnswer('')

        setOpenReply(null)
        setOpenAllReplies([])
        setExpanded(false)
    }

    const handlePrevious = () => {
        if (activeVideo === 0) {
            return
        }
        dispatch(decrementCurrentVideo({ id }))
        setQuestion('')
        setAnswer('')

        setOpenReply(null)
        setOpenAllReplies([])
        setExpanded(false)
    }

    const handleSwitchVideo = (index) => {
        dispatch(setActiveVideos({ id, currentVideo: index }))
        setQuestion('')
        setAnswer('')
        setOpenReply(null)
        setOpenAllReplies([])
        setExpanded(false)
    }
    const handleVideoClick = (e) => {
        e.preventDefault();
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play()
                .then(() => {
                    setIsPlaying(true);
                    setShowPlayButton(false);
                    hideControls();
                })
                .catch(error => {
                    console.error("Error playing video:", error);
                });
        }
    };

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





    return (
        <div className={`${user?.role === 'admin' ? 'p-12' : 'py-12 lg:py-16 px-0'} relative`}>
            <div className='mx-auto max-w-7xl'>
                <div className='grid grid-cols-6 mt-0 lg:mt-4'>

                    {/* For mobile screens */}
                    <div className='col-span-6 mx-3 mb-3 sm:mx-4 bg-[#66a23b41] rounded-sm py-2 px-2.5 md:px-3 md:py-2.5 flex items-center justify-between gap-3 text-sm md:text-base lg:hidden' onClick={() => setShowChapters(true)}>
                        <div className='flex flex-col gap-1 max-w-full overflow-x-hidden'>
                            <p className='font-[600] whitespace-nowrap overflow-x-hidden text-ellipsis break-words max-w-full'>Chapter: {videoData?.content[activeVideo].videoSection}</p>
                            <p className='text-xs md:text-sm font-[400] text-dark-green whitespace-nowrap overflow-x-hidden text-ellipsis break-words max-w-full'>{activeVideo + 1}. {videoData?.content[activeVideo].title}</p>
                        </div>
                        <span><IoChevronDown /></span>
                    </div>

                    <div className='col-span-6 lg:col-span-4  flex flex-col px-3 sm:px-4 lg:px-3 bxl:px-4! xl:px-0! '>
                        <div className='flex flex-col gap-2 max-w-full'>
                            <div className='p-3 bg-black rounded-sm relative' onMouseOver={() => hasHover && setIsShowButtons(true)} onTouchStart={() => isTouchDevice && toggleControls()} onMouseLeave={() => hasHover && hideControls()}>
                                {
                                    isShowButtons && (
                                        <>
                                            <span className='text-[45px] sm:text-[60px] '><IoPlaySkipBackSharp className='absolute top-1/2 translate-y-[-50%] left-4 z-10 text-[#ffffffb1] p-3 pl-3 sm:p-4 sm:pl-4 shadow-2xl bg-[#00000077] rounded-full cursor-pointer hover:scale-110 transition-transform duration-300' title='Previous' onClick={handlePrevious} /></span>
                                            <span className='text-[45px] sm:text-[60px] '><IoPlaySkipForwardSharp className='absolute top-1/2 translate-y-[-50%] right-4 z-10 text-[#ffffffb1] p-3 pr-3 sm:p-4 sm:pr-4 shadow-2xl bg-[#00000077] rounded-full cursor-pointer hover:scale-110 transition-transform duration-300' title='Next' onClick={handleNext} /></span>
                                        </>
                                    )
                                }

                                {
                                    showPlayButton && (

                                        <IoIosPlay className='hidden lg:block absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] bg-grass-green p-2 pr-0.5 shadow-2xl text-white rounded-full' size={70} />
                                    )
                                }
                                <video ref={videoRef} src={videoData?.content[activeVideo]?.videoUrl} controls controlsList='nodownload' className='w-full cursor-pointer' onClick={handleVideoClick} onEnded={() => setShowPlayButton(true)}></video>
                            </div>
                            <h3 className='text-lg sm:text-xl md:text-[22px] lg:text-2xl font-[700] break-words whitespace-normal max-w-full mt-[-5px] md:mt-[-3px] xl:mt-0'>{videoData?.content[activeVideo]?.title}</h3>
                            {
                                user?.role !== 'admin' && (
                                    <div className='flex items-center gap-2.5 xl:gap-3 mt-1 lg:mt-1.5 '>
                                        <div className=''>
                                            <img src={courseData?.course?.createdBy?.avatar?.url || profilePic} className='min-w-[30px] min-h-[30px] w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-full border border-gray-300' />
                                        </div>
                                        <div className='flex flex-col gap-0  max-w-full'>
                                            <div className='flex items-center gap-2 overflow-x-hidden'>
                                                <p className='text-sm lg:text-base font-[500] max-w-[250px] lg:max-w-[300px] whitespace-nowrap text-ellipsis overflow-x-hidden '>{courseData?.course?.createdBy?.name}</p>
                                                <span className='text-[17px]'><MdVerified className='text-blue-700' /></span>
                                            </div>
                                            <p className='text-gray-700 font-[300] text-[11px] lg:text-xs'>Author</p>
                                        </div>
                                    </div>

                                )
                            }


                            {/* Overview, Resources, Q&A, Reviews */}
                            {
                                user?.role === 'admin' ? (
                                    <div className='mt-9 bg-white border border-gray-300 rounded-md overflow-hidden'>
                                        <div className='flex items-center bg-light-green text-black text-xs'>

                                            <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'qa' && 'bg-dark-green text-white'}`} onClick={() => setActiveDetail('qa')}>Q & A</p>
                                            <p className={`flex-1 text-center cursor-pointer p-2 ${activeDetail === 'reviews' && 'bg-dark-green text-white'}`} onClick={() => setActiveDetail('reviews')}>Reviews</p>
                                        </div>

                                        <div className='h-[300px] p-3 py-5 text-sm overflow-y-scroll custom-scrollbar'>


                                            {
                                                activeDetail === 'qa' && (
                                                    videoData?.content[activeVideo]?.questions.length === 0 ? (
                                                        <div className='text-gray-600 text-xs text-center py-[120px]'>
                                                            No questions yet!
                                                        </div>
                                                    ) : (
                                                        <div className=' flex flex-col gap-8'>
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
                                                                                <button className='text-xs border border-gray-300 hover:bg-gray-200 cursor-pointer px-3 py-1 rounded-full' onClick={() => toggleOpenAllReplies(index, item?.questionReplies.length)}>{openAllReplies.includes(index) ? 'Hide Replies' : `${item?.questionReplies.length} Replies`}</button>
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
                                                                                openAllReplies.includes(index) && (
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
                                                                                                                <p className='font-[500] flex items-center gap-0.5'>{reply?.user?.name} {reply?.user?._id === courseData?.course?.createdBy?._id && <MdVerified className='text-blue-700' size={17} />} </p>
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
                                                    )
                                                )
                                            }
                                            {
                                                activeDetail === 'reviews' && (
                                                    courseData?.course?.reviews?.length === 0 ? (
                                                        <div className='text-gray-600 text-xs text-center py-[120px]'>
                                                            No reviews yet!
                                                        </div>
                                                    ) : (
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
                                                    )




                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className='mt-1.5 lg:mt-3 flex flex-col gap-4'>


                                        <div className=' bg-gray-200 rounded-md p-2 px-2.5 lg:px-3'>

                                            <div className='flex items-center gap-2 gap-y-0 flex-wrap'>
                                                {
                                                    courseData?.course?.tags.split(", ").map((tag, index) => (
                                                        <span key={index} className='text-xs md:text-[13px] lg:text-sm text-gray-400'>#{tag.toLowerCase().replace(/\s+/g, '')}</span>
                                                    ))
                                                }
                                            </div>

                                            <div className='mt-2 lg:mt-1 text-sm lg:leading-5.5'>
                                                {
                                                    videoData?.content[activeVideo]?.description.length <= 250 || expanded ? (
                                                        <div>
                                                            <p>{videoData?.content[activeVideo]?.description}</p>

                                                            <div className='flex flex-col gap-1 mt-6 mb-3'>
                                                                <h4 className='text-[17px] sm:text-lg lg:text-xl font-[600]'>Resources</h4>
                                                                <div className='flex flex-col text-[13px] lg:text-sm'>
                                                                    {
                                                                        videoData?.content[activeVideo]?.links.map((link) => (
                                                                            <p key={link?._id}>{link?.title}: <a href={link?.url} target='_blank' className='ml-1 text-blue-700 font-[300] hover:underline'>{link?.url}</a></p>

                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ) : (videoData?.content[activeVideo]?.description.slice(0, 250))
                                                }
                                                {videoData?.content[activeVideo]?.description.length > 250 && !expanded && <span className='text-gray-500'>... </span>}
                                                {videoData?.content[activeVideo]?.description.length > 250 && (

                                                    <button className={`font-[600] cursor-pointer  text-md  ${expanded && 'block mt-4'}`} onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'more'}</button>
                                                )}

                                            </div>





                                        </div>

                                        <p className='mt-2 lg:mt-2.5 text-lg lg:text-xl font-[600]'>{videoData?.content[activeVideo]?.questions.length} Question{videoData?.content[activeVideo]?.questions.length === 1 ? "" : "s"}</p>
                                        <div className=''>
                                            <div className='flex flex-col gap-1'>
                                                <div className='flex items-center gap-2'>
                                                    <img src={user?.avatar ? user?.avatar?.url : profilePic} alt="user-avatar" className='min-w-[28px] min-h-[28px] w-[28px] h-[28px] lg:w-[35px] lg:h-[35px] rounded-full object-cover border border-gray-300 self-start' />
                                                    <input type='text' value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Ask your doubts...' rows={1} className='border-b border-gray-400 flex-1 resize-none outline-none focus:border-b-2 focus:border-black px-2 py-1 text-sm placeholder:text-sm'></input>
                                                </div>
                                                <div className='flex justify-end'>
                                                    <button disabled={isSubmittingQuestion} className={`bg-black text-white text-xs px-4 py-1  rounded-full ${isSubmittingQuestion ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-300' : 'cursor-pointer hover:bg-gray-700'}`} onClick={handleQuestionSubmit}>{isSubmittingQuestion ? 'Submitting...' : 'Submit'}</button>
                                                </div>
                                            </div>
                                            <div className='mt-3.5 xl:mt-5 flex flex-col gap-4.5 md:gap-6'>
                                                {
                                                    videoData?.content[activeVideo]?.questions?.slice().reverse().map((item, index) => (
                                                        <div className='flex items-center gap-3' key={index}>
                                                            <div className='self-start'>
                                                                <img src={item?.user?.avatar ? item?.user?.avatar?.url : profilePic} alt="user-avatar" className='min-w-[28px] min-h-[28px] w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] rounded-full object-cover border border-gray-300 self-start' />
                                                            </div>
                                                            <div className='flex-1 flex flex-col gap-0.5 '>
                                                                <div className='flex items-center gap-2'>
                                                                    <p className='font-[500] text-sm'>{item?.user?.name}</p>
                                                                    <p className='text-gray-400 text-[10px]'>{format(item?.createdAt)}</p>
                                                                </div>
                                                                <p className='text-xs text-gray-800'>{item?.question}</p>
                                                                <div className='flex items-center gap-2 mt-1.5'>
                                                                    <button className='text-xs border border-gray-300 hover:bg-gray-200 cursor-pointer px-3 py-1 rounded-full' onClick={() => toggleOpenAllReplies(index, item?.questionReplies.length)}>{openAllReplies.includes(index) ? 'Hide Replies' : `${item?.questionReplies.length} Replies`}</button>
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
                                                                    openAllReplies.includes(index) && (
                                                                        item?.questionReplies.length > 0 ? (

                                                                            <div className='flex flex-col gap-4 mt-3'>
                                                                                {

                                                                                    item?.questionReplies?.slice().reverse().map((reply, i) => (
                                                                                        <div className='flex items-start gap-3' key={i}>
                                                                                            <div >
                                                                                                <img src={reply?.user?.avatar ? reply?.user?.avatar?.url : profilePic} alt="user-avatar" className='min-w-[26px] min-h-[26px] w-[26px] h-[26px] lg:w-[28px] lg:h-[28px] rounded-full object-cover border border-gray-300 self-start' />
                                                                                            </div>
                                                                                            <div className='flex-1 flex flex-col '>
                                                                                                <div className='flex items-center gap-2'>
                                                                                                    <p className='font-[500] text-sm flex items-center gap-0.5'>{reply?.user?.name} {reply?.user?._id === courseData?.course?.createdBy?._id && <MdVerified className='text-blue-700' size={17} />} </p>
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
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    {/*  */}

                    <div className='col-span-6 lg:col-span-2 lg:pr-3 bxl:pr-4 xl:pl-12! lg:block hidden'>
                        <div className='bg-white border border-gray-300 rounded-sm'>

                            {
                                courseBySection && courseBySection.map((content, index) => (
                                    <Collapsible key={index} open={openSections.includes(index)} onOpenChange={() => handleToggle(index)} className={`${index !== courseBySection.length - 1 && "border-b border-gray-300"}`}>
                                        <CollapsibleTrigger className=" w-full flex items-center justify-between  p-2 px-3 cursor-pointer ">
                                            <div className='flex-1 text-left max-w-full'>
                                                <h5 className='font-[600] whitespace-nowrap overflow-x-hidden text-ellipsis break-words max-w-full'>{content?.section}</h5>
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
                                                    <div className={`max-w-full flex items-center mx-4 px-3 py-3 rounded-sm gap-3 ${activeVideo === video?.videoIndex && (user?.role === 'admin' ? 'bg-dark-green text-white' : 'bg-grass-green text-white')}`} onClick={() => handleSwitchVideo(video?.videoIndex)} key={index}>
                                                        <span className='text-[20px]'><LuTvMinimalPlay /></span>
                                                        <div className='max-w-full overflow-x-hidden'>
                                                            <p className='whitespace-nowrap overflow-x-hidden text-ellipsis break-words max-w-[100%]'>{video?.title}</p>
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


            {/* mobile - chapters */}
            {
                showChapters && (
                    <div className={`bg-white p-1 fixed ${showChapters ? "top-[50px]" : "top-[100%]"} left-0 w-full h-full rounded-t-md shadow-[0_-3px_9px_0px_#00000015] transition-all duration-1000 lg:hidden`}>
                        <div className='flex items-center justify-between px-1.5 py-2'>
                            <p className='font-bold'>All Chapters</p>
                            <span className='text-[20px] hover:bg-gray-100 rounded-full p-1' onClick={() => setShowChapters(false)}><CgClose /></span>
                        </div>
                        <div className='h-full overflow-y-scroll md:mx-2'>
                            <div className='bg-gray-50 rounded-sm'>

                                {
                                    courseBySection && courseBySection.map((content, index) => (
                                        <Collapsible key={index} open={openSections.includes(index)} onOpenChange={() => handleToggle(index)} className={`${index !== courseBySection.length - 1 && "border-b border-gray-300"} `}>
                                            <CollapsibleTrigger className=" w-full flex items-center justify-between  p-2 px-2.5 cursor-pointer ">
                                                <div className='flex-1 text-left max-w-full'>
                                                    <h5 className='font-[550] whitespace-nowrap text-sm overflow-x-hidden text-ellipsis break-words max-w-full'>{content?.section}</h5>
                                                    <div className='flex items-center gap-2 text-xs'>
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
                                                        <div className={`max-w-full flex items-center mx-2 px-3 py-3 rounded-sm gap-3 ${activeVideo === video?.videoIndex && (user?.role === 'admin' ? 'bg-dark-green text-white' : 'bg-grass-green text-white')}`} onClick={() => handleSwitchVideo(video?.videoIndex)} key={index}>
                                                            <span className='text-[20px]'><LuTvMinimalPlay /></span>
                                                            <div className='max-w-full overflow-x-hidden'>
                                                                <p className='whitespace-nowrap overflow-x-hidden text-ellipsis break-words max-w-[100%]'>{video?.title}</p>
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
                )
            }

        </div>
    )
}

export default CourseContent