import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const ProfilePage = () => {

 

  return (
    <div className='flex h-full'>
      <div className='flex flex-1 '>
        <SideBar/>
        <Outlet/>
       
      </div>
    </div>
  )
}

export default ProfilePage