import React from 'react'
import DashboardHeader from '../DashboardHeader'
import DashboardContainer from './DashboardContainer'

const Dashboard = () => {
  
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='Dashboard'/>
        <div className='flex-1'>
          <DashboardContainer/>
        </div>
    </div>
  )
}

export default Dashboard