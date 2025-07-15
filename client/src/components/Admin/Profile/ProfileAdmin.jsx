import React from 'react'
import DashboardHeader from '../DashboardHeader'
import MyAccount from '../../Profile/MyAccount'

const ProfileAdmin = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='Profile'/>
        <div className='flex-1'>
            <MyAccount/>
        </div>
    </div>
  )
}

export default ProfileAdmin