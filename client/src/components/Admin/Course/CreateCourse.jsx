import React from 'react'
import DashboardHeader from '../DashboardHeader'
import CourseSteps from './CourseSteps'
import CourseInfo from './CourseInfo'
import CourseContent from './CourseContent'
import CourseData from './CourseData'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from '../../../redux/features/courses/coursesApi'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { 
  setActiveStep, 
  setCourseInfo, 
  setBenefits, 
  setPrerequisites, 
  setCourseContentData, 
  setCourseData,
  resetCourseCreation 
} from '../../../redux/features/courses/courseCreationSlice'

const CreateCourse = ({activePage, setActivePage}) => {
  const dispatch = useDispatch()
  const [createCourse, { isLoading }] = useCreateCourseMutation()

  const { 
    activeStep,
    courseInfo,
    benefits,
    prerequisites,
    courseContentData,
    courseData
  } = useSelector((state) => state.courseCreation)

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }))

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    }

    dispatch(setCourseData(data))
  }

  const handleCourseCreate = async (e) => {
    const data = courseData
    console.log(data);
    
    try {
      const res = await createCourse(data).unwrap()
      toast.success("Course created successfully!")
      dispatch(resetCourseCreation())
      setActivePage('users')
    } catch (error) {
      const message = error?.data?.message || error?.message || "Something went wrong.";
      toast.error(message)
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <DashboardHeader title="Create Course" />
      <div className='flex-1 flex '>
        <div className='flex-1'>
          {
            activeStep === 0 && (
              <CourseInfo 
                courseInfo={courseInfo} 
                setCourseInfo={(info) => dispatch(setCourseInfo(info))} 
                activeStep={activeStep} 
                setActiveStep={(step) => dispatch(setActiveStep(step))} 
              />
            )
          }
          {
            activeStep === 1 && (
              <CourseData 
                benefits={benefits} 
                setBenefits={(benefits) => dispatch(setBenefits(benefits))} 
                activeStep={activeStep} 
                setActiveStep={(step) => dispatch(setActiveStep(step))} 
                prerequisites={prerequisites} 
                setPrerequisites={(prerequisites) => dispatch(setPrerequisites(prerequisites))} 
              />
            )
          }
          {
            activeStep === 2 && (
              <CourseContent 
                activeStep={activeStep} 
                setActiveStep={(step) => dispatch(setActiveStep(step))} 
                courseContentData={courseContentData} 
                setCourseContentData={(data) => dispatch(setCourseContentData(data))} 
                handleSubmit={handleSubmit} 
              />
            )
          }
          {
            activeStep === 3 && (
              <CoursePreview 
                activeStep={activeStep} 
                setActiveStep={(step) => dispatch(setActiveStep(step))} 
                courseData={courseData} 
                handleCourseCreate={handleCourseCreate} 
                isLoading={isLoading}
              />
            )
          }
        </div>
        <div className='px-6 py-8'>
          <CourseSteps 
            activeStep={activeStep} 
            setActiveStep={(step) => dispatch(setActiveStep(step))} 
          />
        </div>
      </div>
    </div>
  )
}

export default CreateCourse