import React from 'react'
import DashboardHeader from '../../DashboardHeader'
import CoursesAnalyticsContainer from './CoursesAnalyticsContainer'

const CoursesAnalytics = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='Courses Analytics'/>
        <div className='flex-1'>
            <CoursesAnalyticsContainer/>
        </div>
    </div>
  )
}

export default CoursesAnalytics