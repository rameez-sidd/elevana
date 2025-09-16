import React, { useState } from 'react'
import { TbCameraPlus } from "react-icons/tb";
import profilePic from '../../assets/images/avatar.jpg'
import { useSelector } from 'react-redux';
import { useUpdateAvatarMutation, useUpdateProfileMutation } from '../../redux/features/user/userApi';
import { toast } from 'react-toastify';

const MyAccount = () => {
  const { user } = useSelector((state) => state.auth)
  const [name, setName] = useState(user?.name || "")
  const [previewImage, setPreviewImage] = useState(user?.avatar?.url || profilePic)
  const [selectedImage, setSelectedImage] = useState(null)

  const [updateAvatar, {isLoading : avatarUploading}] = useUpdateAvatarMutation()
  const [updateProfile, {isLoading: nameUploading}] = useUpdateProfileMutation()

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(name !== user?.name) {
        await updateProfile({name}).unwrap()
        toast.success("Name updated successfully")
      }
      if(selectedImage){
        const image = await fileToBase64(selectedImage)
        await updateAvatar(image).unwrap()
        toast.success("Avatar updated successfully")
        setSelectedImage(null)
      }
    } catch (error) {
        toast.error(error?.data?.message || "Something went wrong")
    }
  }
  



  return (
    <div className={`col-span-5 blg:col-span-8 lg:col-span-6 bxl:col-span-13! bxl2:col-span-7! xl:col-span-4!  px-2.5 bsm2:px-6 sm:px-10 md:px-20 blg:px-0! lg:px-44  flex items-start sm:items-center justify-center  ${user?.role === 'admin' && "h-full"} `}>
      <div className={`w-full sm:w-xl lg:min-w-2xl flex flex-col items-center mt-10 sm:mt-0`}>
        <div className='h-[60px] '>

        </div>
        <div className={`bg-white rounded-md  w-full px-3.5 sm:px-5  max-w-[500px] pt-[58px] sm:pt-[68px] pb-6 sm:pb-7 lg:pb-8 flex items-center justify-center  ${user?.role === 'admin' ? "shadow-none" : "shadow-lg"}   relative`}>
          <form className='flex flex-col items-center w-full' onSubmit={handleSubmit}>
            <div className='absolute top-[-60px] w-[100px] h-[100px] rounded-full flex items-center justify-center shadow-lg'>
              <img src={previewImage} alt="avatar"  className='w-full h-full rounded-full outline outline-gray-200 border-5 sm:border-6 bg-gray-200 border-white object-cover' />
              <input type="file" name="" id="avatar" className="hidden" accept="image/png,image/jpg,image/jpeg,image/webp" onChange={handleImageChange}/>
              <label htmlFor="avatar" className='cursor-pointer absolute bottom-1 right-1 bg-dark-green text-white rounded-full h-8 w-8 hover:bg-muted-green grid place-items-center'><span className='text-[17px]'><TbCameraPlus/></span></label> 
            </div>
            {/* <div className='h-[100px] invisible'></div> */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-5 w-full'>
              <label htmlFor="name" className='min-w-[6%] text-[13px]'>Name</label>
              <input type="text" name="" id="name" value={name} onChange={(e) => setName(e.target.value)} className='text-[13px] font-[300] bg-gray-100 w-full p-2 px-3 rounded-sm outline-none' />
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-5 mt-4 sm:mt-6 w-full'>
              <label htmlFor="email" className='min-w-[6%] text-[13px] '>Email</label>
              <input type="email" name="" id="email" value={user?.email || ""} readOnly className='text-[13px] font-[300] bg-gray-100 w-full p-2 px-3 rounded-sm outline-none' />
            </div>
            <div className='mt-6 sm:mt-7'>
              <input type="submit" disabled={nameUploading || avatarUploading} value={nameUploading || avatarUploading ? "Saving..." : "Save"} className={`bg-dark-green text-white py-1.5 px-15 ${nameUploading || avatarUploading ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : "cursor-pointer hover:bg-muted-green "} rounded-sm text-sm`} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MyAccount