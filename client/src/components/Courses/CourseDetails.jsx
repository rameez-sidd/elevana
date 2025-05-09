import { Rating } from '@mui/material'
import React, { useState } from 'react'
import { RiCheckDoubleFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { groupBySection } from '../../utils/courseContentGrouping'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'
import { LucideTvMinimalPlay } from 'lucide-react'
import { FiUser, FiUsers } from 'react-icons/fi'
import { RxStack } from "react-icons/rx";
import PaymentModal from '../Payment/PaymentModal'
import { setModalOpen } from '@/redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'

const CourseDetails = ({ data, stripePromise, clientSecret }) => {
  const [openPayment, setOpenPayment] = useState(false)
  const { user, modalOpen } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const discount = (((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100).toFixed(0)

  const isPurchased = user && user?.courses?.find((item) => item._id === data._id)
  const [openSections, setOpenSections] = useState([])
  const courseContent = groupBySection(data?.courseData, false)
  const navigate = useNavigate()

  const handleToggle = (index) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleOrder = () => {
    if (!user) {
      dispatch(setModalOpen('signup'))
    } else {

      setOpenPayment(true)
    }

  }


  return (
    <div className='py-24'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-4 '>
          <div className='col-span-3 flex flex-col gap-5 pr-8'>
            <div className='flex flex-col gap-4'>
              <h2 className='text-5xl font-[700] text-grass-green'>{data?.name}</h2>
              <div className='flex items-center gap-2 text-sm'>
                <Rating value={data?.ratings} precision={0.5} readOnly />
                <p className='text-gray-600'>({data?.reviews?.length} {data?.reviews?.length === 1 ? "Review" : "Reviews"})</p>
                <p className='flex items-center gap-3 ml-3 border border-gray-300 rounded-sm px-3 py-1'><span><FiUsers size={15} /></span> {data?.purchased} {data?.purchased === 1 ? "Student" : "Students"}</p>
                <p className='flex items-center gap-3 ml-3 border border-gray-300 rounded-sm px-3 py-1'><span><RxStack size={19} /></span> {courseContent?.length} {courseContent?.length === 1 ? "Chapter" : "Chapters"}</p>
              </div>



            </div>

            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-3xl font-[600]'>Why should you join us?</h2>
              <div className='flex flex-col gap-2'>
                {data?.benefits?.map((benefit, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <RiCheckDoubleFill size={20} />
                    <p className='text-md'>{benefit.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-3xl font-[600]'>What do you need before starting?</h2>
              <div className='flex flex-col gap-2'>
                {data?.prerequisites?.map((prerequisite, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <RiCheckDoubleFill size={20} />
                    <p className='text-md'>{prerequisite.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-3xl font-[600]'>Course Curriculum</h2>
              <div className='flex flex-col gap-3'>
                {
                  courseContent && courseContent.map((content, index) => (
                    <Collapsible key={index} open={openSections.includes(index)} onOpenChange={() => handleToggle(index)} className="border border-gray-300 rounded-sm">
                      <CollapsibleTrigger className=" w-full flex items-center justify-between  p-2 px-3 cursor-pointer">
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
                      <CollapsibleContent className="px-6 py-3 flex flex-col gap-3.5 text-sm bg-gray-200">
                        {
                          content?.videos.map((video, index) => (
                            <div className='flex items-center gap-3' key={index}>
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

            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-3xl font-[600]'>What's this course all about?</h2>
              <div>
                {data?.description}
              </div>
            </div>


            <div className='flex flex-col gap-4 mt-6'>
              <h2 className='text-3xl font-[600]'>Reviews & Ratings</h2>
              <div className='flex flex-col gap-6'>
                {
                  data?.reviews.map((review, index) => (
                    <div className='flex items-center gap-3' key={index}>
                      <div className='self-start'>
                        <img src={review?.user?.avatar ? review?.user?.avatar?.url : profilePic} width={35} height={35} className='rounded-full object-cover border border-gray-300 self-start' />
                      </div>
                      <div className='flex-1 flex flex-col gap-0.5'>
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
          <div className='col-span-1 flex flex-col gap-4'>
            <div className='rounded-sm overflow-hidden'>
              <video src={data?.demoUrl} poster={data?.thumbnail?.url} controls></video>
            </div>
            <div className=' flex flex-col gap-2'>
              <div className=' flex items-center gap-2'>
                <p className='text-2xl font-[550] text-dark-green'>{data?.price === 0 ? "Free" : `$${data?.price}`}</p>
                <p className='text-gray-500 line-through font-[300]'>${data?.estimatedPrice}</p>
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
        openPayment && <PaymentModal data={data} openPayment={openPayment} setOpenPayment={setOpenPayment} stripePromise={stripePromise} clientSecret={clientSecret} />
      }
    </div>
  )
}

export default CourseDetails