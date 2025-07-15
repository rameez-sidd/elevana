import React from 'react'
import DashboardHeader from '../../DashboardHeader'
import UsersAnalyticsContainer from './UsersAnalyticsContainer'

const UsersAnalytics = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='Users Analytics'/>
        <div className='flex-1'>
            <UsersAnalyticsContainer/>
        </div>
    </div>
  )
}

export default UsersAnalytics