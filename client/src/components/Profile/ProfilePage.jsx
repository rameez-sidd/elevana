import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const ProfilePage = () => {

 

  return (
    <div className='flex h-full'>
      <div className='flex-1 grid grid-cols-5 blg:grid-cols-11 lg:grid-cols-8 bxl:grid-cols-17! bxl2:grid-cols-9! xl:grid-cols-5!'>
        <SideBar/>
        <Outlet/>
       
      </div>
    </div>
  )
}

export default ProfilePage