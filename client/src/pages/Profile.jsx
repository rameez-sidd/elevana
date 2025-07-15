import React, { useState } from 'react'
import Header from '../components/shared/Header'
import ProfilePage from '../components/Profile/ProfilePage'
import useDocumentTitle from '../utils/useDocumentTitle'

const Profile = () => {
  useDocumentTitle('Elevana | Profile')
    const [isProfileOpen, setIsProfileOpen] = useState(true)

  return (
    <div className='bg-background-green flex flex-col h-screen'>
        <Header isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}/>
        <ProfilePage/>
    </div>
  )
}

export default Profile