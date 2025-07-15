import React from 'react'
import DashboardHeader from '../DashboardHeader'
import CategoryContainer from './CategoryContainer'

const Categories = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='Categories'/>
        <div className='flex-1'>
            <CategoryContainer/>
        </div>
    </div>
  )
}

export default Categories