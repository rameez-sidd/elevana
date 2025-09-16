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
    <div className={`col-span-5 blg:col-span-8 lg:col-span-6 bxl:col-span-13! bxl2:col-span-7! xl:col-span-4! px-2.5 bsm2:px-6 sm:px-10 md:px-20 blg:px-0! lg:px-44  flex items-start sm:items-center justify-center ${user?.role === 'admin' && "h-full"}`}>
      <div className={`w-full sm:w-xl lg:min-w-2xl flex flex-col items-center  mt-10 sm:mt-0`}>
        {
          user?.role !== 'admin' && (
            <div className='h-[60px]'></div>
          )
        }

        <div className={`bg-white w-full max-w-[500px] rounded-md px-3.5 sm:px-5  ${user?.role === 'admin' ? 'pt-12px' : 'pt-[58px] sm:pt-[68px] '} pb-6 sm:pb-7 flex items-center justify-center ${user?.role === 'admin' ? "shadow-none" : "shadow-lg"}   relative`}>
          <form className='flex flex-col items-center w-full' onSubmit={handlePasswordChange}>
            {
              user?.role !== 'admin' && (
                <div className='absolute top-[-60px] w-[100px] h-[100px] rounded-full bg-green border border-gray-300 p-1.5 flex items-center justify-center shadow-lg'>
                  <img src={changePasswordIcon} alt="" className='rounded-full bg-white p-2' />
                </div>
              )
            }

            {/* <div className='h-[100px] invisible'></div> */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-5 w-full'>
              <label htmlFor="oldPassword" className='min-w-[90px] text-[13px] '>Old Password</label>
              <div className='flex bg-gray-100 w-full rounded-sm overflow-hidden'>
                <input type={showOldPassword ? "text" : "password"} name="" id="oldPassword" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='text-[13px] font-[300] bg-gray-100 w-full p-2 px-3 outline-none' placeholder='Your existing password' />
                <div className='px-2 hover:bg-gray-200  grid place-items-center cursor-pointer' onClick={() => setShowOldPassword(!showOldPassword)}>
                  {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}

                </div>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-5 mt-4 sm:mt-6  w-full'>
              <label htmlFor="newPassword" className='min-w-[90px] text-[13px] whitespace-nowrap'>New Password</label>
              <div className='flex bg-gray-100 w-full  rounded-sm overflow-hidden'>

                <input type={showNewPassword ? "text" : "password"} name="" id="newPassword" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='text-[13px] font-[300] bg-gray-100 w-full p-2 px-3 outline-none' placeholder='Choose a new, secure password' />
                <div className='px-2 hover:bg-gray-200  grid place-items-center cursor-pointer' onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}

                </div>
              </div>
            </div>
            <div className='mt-6 sm:mt-7'>
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