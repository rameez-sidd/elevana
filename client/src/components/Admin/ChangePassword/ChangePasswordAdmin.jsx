import React from 'react'
import DashboardHeader from '../DashboardHeader'
import ChangePassword from '../../Profile/ChangePassword'

const ChangePasswordAdmin = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='Change Password'/>
        <div className='flex-1'>
            <ChangePassword/>
        </div>
    </div>
  )
}

export default ChangePasswordAdmin