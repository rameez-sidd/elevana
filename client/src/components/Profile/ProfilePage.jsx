import React, { useCallback } from 'react'
import SideBar from './SideBar'
import MyAccount from './MyAccount'
import ChangePassword from './ChangePassword'
import EnrolledCourses from './EnrolledCourses'
import { useSelector, useDispatch } from 'react-redux'
import { setActivePage } from '../../redux/features/profile/profileSlice'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const activePage = useSelector((state) => state.profile.activePage)

  const handlePageChange = useCallback((page) => {
    dispatch(setActivePage(page));
  }, [dispatch]);

  return (
    <div className=' h-full flex'>
      <div className='flex w-full'>
        <SideBar activePage={activePage} setActivePage={handlePageChange}/>
        {
          activePage === 'myAccount' && <MyAccount /> 
        }
        {
          activePage === 'changePassword' && <ChangePassword /> 
        }
        {
          activePage === 'enrolledCourses' && <EnrolledCourses /> 
        }
      </div>
    </div>
  )
}

export default ProfilePage