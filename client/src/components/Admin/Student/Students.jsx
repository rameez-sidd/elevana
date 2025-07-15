import React from 'react'
import DashboardHeader from '../DashboardHeader'
import StudentsDataGrid from './StudentsDataGrid'

const Students = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='All Students'/>
        <div className='flex-1'>
          <StudentsDataGrid/>
        </div>
    </div>
  )
}

export default Students