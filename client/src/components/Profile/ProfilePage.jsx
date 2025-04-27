import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const ProfilePage = () => {

 

  return (
    <div className=' h-full flex'>
      <div className='flex w-full'>
        <SideBar/>
        <Outlet/>
       
      </div>
    </div>
  )
}

export default ProfilePage