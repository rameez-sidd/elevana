import React, { useState } from 'react'
import Header from '../components/shared/Header'
import ProfilePage from '../components/Profile/ProfilePage'
import profileBg from '../assets/images/profile-bg.jpg'

const Profile = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(true)

  return (
    <div className='bg-profile flex flex-col h-screen'>
        <Header isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}/>
        <ProfilePage/>
    </div>
  )
}

export default Profile