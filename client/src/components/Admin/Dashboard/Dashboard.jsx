import React from 'react'
import DashboardHeader from '../DashboardHeader'

const Dashboard = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='Dashboard'/>
        <div className='flex-1'></div>
    </div>
  )
}

export default Dashboard