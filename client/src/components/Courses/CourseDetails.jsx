import { Rating } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { RiCheckDoubleFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { groupBySection } from '../../utils/courseContentGrouping'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'
import { LucideTvMinimalPlay } from 'lucide-react'
import { FiUser, FiUsers } from 'react-icons/fi'
import { RxStack } from "react-icons/rx";
import PaymentModal from '../Payment/PaymentModal'
import { setModalOpen } from '../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import profilePic from '../../assets/images/avatar.jpg'
import { useAddReviewinCourseMutation } from '../../redux/features/courses/coursesApi'
import socketIO from 'socket.io-client'
import { MdPlayCircle, MdPlayCircleFilled } from 'react-icons/md'
import { IoIosPlay } from 'react-icons/io'

const ENDPOINT = import.meta.env.VITE_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

const CourseDetails = ({ data, stripePromise, clientSecret, refetch }) => {
  const [openPayment, setOpenPayment] = useState(false)
  const { user, modalOpen } = useSelector((state) => state.auth)
  const [addReviewInCourse, { isLoading: isSubmittingReview }] = useAddReviewinCourseMutation()
  const dispatch = useDispatch()
  const discount = (((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100).toFixed(0)

  const isPurchased = (user && user?.courses?.find((item) => item._id === data._id) || data?.price === 0)
  const [openSections, setOpenSections] = useState([])
  const courseContent = groupBySection(data?.courseData, false)
  const navigate = useNavigate()

  const isReviewExists = (data?.reviews.find((item) => item?.user?._id === user?._id) || user?.role === 'admin')

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [showPlayButton, setShowPlayButton] = useState(true)



  const handleToggle = (index) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleOrder = () => {
    if (!user) {
      dispatch(setModalOpen("login"))
    } else {
      setOpenPayment(true)
    }
  }

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      return
    }
    try {
      await addReviewInCourse({ review, rating, courseId: data?._id }).unwrap()
      toast.success('Thank You for reviewing this course!')
      refetch()
      setReview('')
      setRating(0)
      socketId.emit("notification", {
        adminId: data?.course?.createdBy,
        notification: {
          title: 'New Review Received',
          message: `${user?.name} has given a review in ${data?.name}`,
          userId: user?._id
        }
      })
    } catch (error) {
      const message = error?.data?.message || error?.message || "Something went wrong.";
      toast.error(message);
    }
  }

  const handleVideoClick = () => {
    setShowPlayButton(!showPlayButton)
  };


  return (
    <div className='py-12 lg:py-24'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-4 '>
          <div className='col-span-4 lg:col-span-3 flex flex-col gap-5 px-3 lg:pr-8 lg:pl-0'>
            <div className='flex flex-col gap-4 '>
              <div className='rounded-sm overflow-hidden relative lg:hidden'>
                <video src={data?.demoUrl} poster={data?.thumbnail?.url} onClick={handleVideoClick} onEnded={() => setShowPlayButton(true)} className='cursor-pointer' controls={false} onMouseEnter={(e) => e.target.setAttribute('controls', 'true')} onMouseLeave={(e) => e.target.removeAttribute('controls')} controlsList='nodownload'></video>
                {
                  showPlayButton && (
                    <IoIosPlay className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] bg-grass-green p-2 pr-0.5 cursor-pointer text-white rounded-full pointer-events-none' size={50} />
                  )
                }
              </div>
              <h2 className='text-3xl/8 mt-[-10px] lg:mt-0 lg:text-5xl font-[700] text-grass-green'>{data?.name}</h2>
              <div className='flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-5'>

                <div className='flex items-center gap-2 text-sm'>
                  <span className='hidden lg:inline'><Rating value={data?.ratings} precision={0.5} readOnly /></span>
                  <span className='lg:hidden'><Rating value={data?.ratings} precision={0.5} readOnly size='small' /></span>
                  <p className='text-gray-600 text-xs lg:text-sm'>({data?.reviews?.length} {data?.reviews?.length === 1 ? "Review" : "Reviews"})</p>

                </div>

                <div className='flex items-center gap-3 lg:gap-5 text-sm mt-[-4px] lg:mt-0 w-full lg:w-fit'>
                  <p className='w-full lg:w-fit flex items-center justify-center lg:justify-start gap-3 border border-gray-300 rounded-sm px-3 py-1'><span><FiUsers size={15} /></span> {data?.purchased} {data?.purchased === 1 ? "Student" : "Students"}</p>
                  <p className='w-full lg:w-fit flex items-center justify-center lg:justify-start gap-3 border border-gray-300 rounded-sm px-3 py-1'><span><RxStack size={19} /></span> {courseContent?.length} {courseContent?.length === 1 ? "Chapter" : "Chapters"}</p>
                </div>

              </div>
              <div className='text-[12px] lg:text-sm hidden'>Created By: <span className='ml-2 italic text-gray-600 underline'>{data?.createdBy?.name}</span></div>



            </div>

            <div className='lg:hidden mt-[-6px]'>
              <div className=' flex flex-col gap-2'>
                <div className=' flex items-center gap-2'>
                  <p className='text-2xl font-[550] text-dark-green'>{data?.price === 0 ? "Free" : `₹${data?.price}`}</p>
                  <p className='text-gray-500 line-through font-[300]'>₹{data?.estimatedPrice}</p>
                  <p className='ml-1.5 text-green-700 text-sm font-[600]'>{discount}% off</p>
                </div>
                {
                  !isPurchased ? (
                    <button onClick={handleOrder} className='w-full bg-red-700 text-white px-5 py-1.5 rounded-full cursor-pointer hover:bg-red-500'>Buy Now</button>
                  ) : (
                    <button className='w-full bg-red-700 text-white px-5 py-1.5 rounded-full cursor-pointer hover:bg-red-500' onClick={() => navigate(`/course-access/${data._id}`)}>Start Learning</button>
                  )
                }
              </div>
              <div className='mt-5 ml-2'>
                <ul className='list-disc list-inside text-xs flex flex-col gap-1.5'>
                  <li>Source Code Included</li>
                  <li>Full Lifetime Access</li>
                  <li>Certificate of Completion</li>
                  <li>Expert Support</li>
                </ul>
              </div>
            </div>

            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-[22px]/7 lg:text-3xl font-[600]'>Why should you join us?</h2>
              <div className='flex flex-col gap-2 pl-2 lg:pl-0'>
                {data?.benefits?.map((benefit, index) => (
                  <div key={index} className='flex items-baseline lg:items-center gap-2'>
                    <span className='text-[15px] lg:text-[20px]'><RiCheckDoubleFill /></span>
                    <p className='text-sm lg:text-base'>{benefit.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-[22px]/7 lg:text-3xl font-[600]'>What do you need before starting?</h2>
              <div className='flex flex-col gap-2 pl-2 lg:pl-0'>
                {data?.prerequisites?.map((prerequisite, index) => (
                  <div key={index} className='flex items-baseline lg:items-center gap-2'>
                    <span className='text-[15px] lg:text-[20px]'><RiCheckDoubleFill /></span>
                    <p className='text-sm lg:text-base'>{prerequisite.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-[22px]/7 lg:text-3xl font-[600]'>What's this course all about?</h2>
              <div className='leading-6.5 text-sm lg:text-base'>
                {data?.description}
              </div>
            </div>

            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-[22px]/7 lg:text-3xl font-[600]'>Course Curriculum</h2>
              <div className='flex flex-col gap-1.5 lg:gap-3'>
                {
                  courseContent && courseContent.map((content, index) => (
                    <Collapsible key={index} open={openSections.includes(index)} onOpenChange={() => handleToggle(index)} className="border border-gray-300 rounded-sm">
                      <CollapsibleTrigger className=" w-full flex items-center justify-between p-2 px-2.5 lg:p-2 lg:px-3 cursor-pointer">
                        <div className='flex-1 text-left '>
                          <h5 className='text-sm lg:text-base font-[600] line-clamp-1'>{content?.section}</h5>
                          <div className='flex items-center gap-2 text-xs lg:text-sm mt-0.5 lg:mt-0'>
                            <p>{content?.videos?.length} {content?.videos?.length === 1 ? "Lesson" : "Lessons"}</p>
                            <p>•</p>
                            <p>{content?.sectionDuration} </p>
                          </div>
                        </div>
                        <span className='text-sm lg:text-base'>

                        {
                          openSections.includes(index) ? <IoChevronUp /> : <IoChevronDown />
                        }
                        </span>

                      </CollapsibleTrigger>
                      <CollapsibleContent className=" px-4 lg:px-6 py-3 flex flex-col gap-3.5 text-sm bg-gray-200">
                        {
                          content?.videos.map((video, index) => (
                            <div className='flex items-center gap-3' key={index}>
                              <LucideTvMinimalPlay size={20} />
                              <div>
                                <p className='text-sm'>{video?.title}</p>
                                <p className='text-[11px] lg:text-xs font-[300]'>{video?.length}</p>
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




            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-[22px]/7 lg:text-3xl font-[600]'>Reviews & Ratings</h2>
              {
                isPurchased &&
                !isReviewExists && (
                  <div className='flex flex-col gap-2 px-1 lg:px-0'>
                    <div className='flex items-center gap-2'>
                      <img src={user?.avatar ? user?.avatar?.url : profilePic} className='w-[28px] h-[28px] lg:w-[35px] lg:h-[35px] rounded-full object-cover border border-gray-300 self-start' />
                      <div className='flex-1 flex flex-col gap-1'>
                        <Rating value={rating} precision={0.5} onChange={(event, newValue) => {
                          setRating(newValue)
                        }} />
                        <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder='Write a review...' rows={3} className='border border-gray-400 flex-1 resize-none rounded-sm outline-none px-2 py-1 text-sm placeholder:text-sm'></textarea>
                      </div>
                    </div>
                    <div className='flex justify-end'>
                      <button disabled={isSubmittingReview} className={`bg-black text-white text-xs px-4 py-1 rounded-full ${isSubmittingReview ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300" : "cursor-pointer hover:bg-gray-700"}`} onClick={handleReviewSubmit}>{isSubmittingReview ? "Submitting..." : "Submit"}</button>
                    </div>
                  </div>
                )
              }
              <div className='flex flex-col gap-6 px-1 lg:px-0'>
                {
                  data?.reviews?.slice().reverse().map((review, index) => (
                    <div className='flex items-center gap-2.5 lg:gap-3' key={index}>
                      <div className='self-start'>
                        <img src={review?.user?.avatar ? review?.user?.avatar?.url : profilePic} className='w-[28px] h-[28px] lg:w-[35px] lg:h-[35px] rounded-full object-cover border border-gray-300 self-start' />
                      </div>
                      <div className='flex-1 flex flex-col gap-0 lg:gap-0.5'>
                        <div className='flex items-center gap-1'>
                          <p className='font-[500] text-sm'>{review?.user?.name}</p>
                          <p>∙</p>
                          <Rating readOnly precision={0.5} value={review?.rating} size='small' />

                        </div>
                        <p className='text-xs text-gray-800'>{review?.comment}</p>
                      </div>
                    </div>
                  ))
                }
                {
                  !isPurchased &&
                  data?.reviews.length === 0 && (
                    <div className='text-sm text-gray-500'>
                      No Reviews Yet!
                    </div>
                  )
                }
              </div>
            </div>

          </div>

          {/* sidepart */}
          <div className='col-span-1 lg:flex flex-col gap-4 hidden'>
            <div className='rounded-sm overflow-hidden relative'>
              <video src={data?.demoUrl} poster={data?.thumbnail?.url} onClick={handleVideoClick} onEnded={() => setShowPlayButton(true)} className='cursor-pointer' controls={false} onMouseEnter={(e) => e.target.setAttribute('controls', 'true')} onMouseLeave={(e) => e.target.removeAttribute('controls')} controlsList='nodownload'></video>
              {
                showPlayButton && (
                  <IoIosPlay className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] bg-grass-green p-2 pr-0.5 cursor-pointer text-white rounded-full pointer-events-none' size={50} />
                )
              }
            </div>
            <div className=' flex flex-col gap-2'>
              <div className=' flex items-center gap-2'>
                <p className='text-2xl font-[550] text-dark-green'>{data?.price === 0 ? "Free" : `₹${data?.price}`}</p>
                <p className='text-gray-500 line-through font-[300]'>₹{data?.estimatedPrice}</p>
                <p className='ml-3 text-green-700 text-sm font-[600]'>{discount}% off</p>
              </div>
              {
                !isPurchased ? (
                  <button onClick={handleOrder} className='w-fit bg-red-700 text-white px-5 py-1.5 rounded-full cursor-pointer hover:bg-red-500'>Buy Now</button>
                ) : (
                  <button className='w-fit bg-red-700 text-white px-5 py-1.5 rounded-full cursor-pointer hover:bg-red-500' onClick={() => navigate(`/course-access/${data._id}`)}>Start Learning</button>
                )
              }
            </div>
            <div className='mt-4'>
              <ul className='list-disc list-inside text-sm flex flex-col gap-1.5'>
                <li>Source Code Included</li>
                <li>Full Lifetime Access</li>
                <li>Certificate of Completion</li>
                <li>Expert Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {
        openPayment && stripePromise && clientSecret && <PaymentModal data={data} openPayment={openPayment} setOpenPayment={setOpenPayment} stripePromise={stripePromise} clientSecret={clientSecret} />
      }
    </div>
  )
}

export default CourseDetails