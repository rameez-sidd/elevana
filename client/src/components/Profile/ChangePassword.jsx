import React, { useState } from 'react'
import changePasswordIcon from '../../assets/images/changePasswordIcon.png'
import { useUpdatePasswordMutation } from '../../redux/features/user/userApi'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const ChangePassword = () => {
  const { user } = useSelector((state) => state.auth)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    try {
      const res = await updatePassword({ oldPassword, newPassword }).unwrap()
      toast.success("Password updated successfully")
      setOldPassword("")
      setNewPassword("")
    } catch (error) {
      const message = error?.data?.message || error?.message || "Something went wrong. Please try again.";
      toast.error(message)
    }

  }

  return (
    <div className={`flex-1 p-6 px-44  flex items-center justify-center ${user?.role === 'admin' && "h-full"}`}>
      <div className={`min-w-2xl flex flex-col`}>
        {
          user?.role !== 'admin' && (
            <div className='h-[100px] '></div>
          )
        }

        <div className={`bg-white rounded-md px-8 ${user?.role === 'admin' ? 'pt-12' : 'pt-20'} pb-8 flex items-center justify-center border border-gray-300  ${user?.role === 'admin' ? "shadow-none" : "shadow-lg"}   relative`}>
          <form className='flex flex-col items-center w-full' onSubmit={handlePasswordChange}>
            {
              user?.role !== 'admin' && (
                <div className='absolute top-[-80px] rounded-full bg-light-green border border-gray-300 p-2 flex items-center justify-center shadow-lg'>
                  <img src={changePasswordIcon} alt="" width={110} height={110} className='rounded-full bg-white p-2' />
                </div>
              )
            }

            {/* <div className='h-[100px] invisible'></div> */}
            <div className='flex items-center gap-7 w-full'>
              <label htmlFor="oldPassword" className='min-w-[130px] text-sm'>Old Password:</label>
              <div className='flex bg-gray-100 w-full border border-gray-300 rounded-sm overflow-hidden'>
                <input type={showOldPassword ? "text" : "password"} name="" id="oldPassword" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='text-sm font-[300] bg-gray-100 w-full p-2 px-3 outline-none' placeholder='Your existing password' />
                <div className='px-2 hover:bg-gray-200  grid place-items-center cursor-pointer' onClick={() => setShowOldPassword(!showOldPassword)}>
                  {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}

                </div>
              </div>
            </div>
            <div className='flex items-center gap-7 mt-8 w-full'>
              <label htmlFor="newPassword" className='min-w-[130px] text-sm'>New Password:</label>
              <div className='flex bg-gray-100 w-full border border-gray-300 rounded-sm overflow-hidden'>

                <input type={showNewPassword ? "text" : "password"} name="" id="newPassword" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='text-sm font-[300] bg-gray-100 w-full p-2 px-3 outline-none' placeholder='Choose a new, secure password' />
                <div className='px-2 hover:bg-gray-200  grid place-items-center cursor-pointer' onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}

                </div>
              </div>
            </div>
            <div className='mt-8'>
              <input type="submit" disabled={isLoading} value={isLoading ? "Saving..." : "Save"} className={`bg-dark-green text-white py-1.5 px-15 ${isLoading ?
                "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : "cursor-pointer hover:bg-muted-green"}  rounded-sm text-sm`} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword