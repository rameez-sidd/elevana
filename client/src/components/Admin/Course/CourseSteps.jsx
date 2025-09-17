import React from 'react'
import { ImRadioChecked2 } from "react-icons/im";
import { useLocation } from 'react-router-dom';


const CourseSteps = () => {
    const steps = [
        "Course Overview",
        "Benefits and Prerequisites",
        "Course Content",
        "Course Preview",
    ]
    
    const location = useLocation()
    let activeStep = 0

    if(location.pathname === '/admin/admin-dashboard/create-course'){
        activeStep = 0
    } else if(location.pathname === '/admin/admin-dashboard/create-course/course-data'){
        activeStep = 1

    } else if(location.pathname === '/admin/admin-dashboard/create-course/course-content'){
        activeStep = 2

    } else if(location.pathname === '/admin/admin-dashboard/create-course/course-preview'){
        activeStep = 3

    }

    return (
        <div className='flex flex-col gap-0.5'>
            {
                steps.map((step, index) => (
                    <div key={index} className='flex flex-col gap-0.5'>
                        <div className={`flex items-center cursor-pointer ${activeStep + 1 > index ? "text-dark-green" : "text-green"}`} >
                            <ImRadioChecked2 size={20} className='w-8' />
                            <p className='text-sm whitespace-nowrap'>{step}</p>
                        </div>
                        {
                            index !== steps.length - 1 && (
                                <div className='flex items-center cursor-pointer' >
                                    <div className='w-8 grid place-items-center'>
                                        <div className={`w-1 ${activeStep + 1 > index ? "bg-dark-green" : "bg-green"}  h-6`}></div>
                                    </div>
                                    <p className='invisible text-sm'>{step}</p>
                                </div>
                            )

                        }




                    </div>
                ))
            }
        </div>
    )
}

export default CourseSteps