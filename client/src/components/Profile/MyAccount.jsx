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
    <div className={`flex-1 px-44  flex items-center justify-center  ${user?.role === 'admin' && "h-full"}`}>
      <div className={`min-w-2xl flex flex-col`}>
        <div className='h-[100px] '>

        </div>
        <div className={`bg-white rounded-md px-8 pt-20 pb-8 flex items-center justify-center border border-gray-300  ${user?.role === 'admin' ? "shadow-none" : "shadow-lg"}   relative`}>
          <form className='flex flex-col items-center w-full' onSubmit={handleSubmit}>
            <div className='absolute top-[-80px] w-[130px] h-[130px] rounded-full flex items-center justify-center shadow-lg'>
              <img src={previewImage} alt="avatar"  className='w-full h-full rounded-full outline outline-gray-200 border-6 bg-gray-200 border-white object-cover' />
              <input type="file" name="" id="avatar" className="hidden" accept="image/png,image/jpg,image/jpeg,image/webp" onChange={handleImageChange}/>
              <label htmlFor="avatar" className='cursor-pointer absolute bottom-1 right-1 bg-dark-green text-white rounded-full p-1.5 hover:bg-muted-green'><TbCameraPlus size={21} /></label>
            </div>
            {/* <div className='h-[100px] invisible'></div> */}
            <div className='flex items-center gap-7 w-full'>
              <label htmlFor="name" className='min-w-[6%] text-sm'>Name:</label>
              <input type="text" name="" id="name" value={name} onChange={(e) => setName(e.target.value)} className='text-sm font-[300] bg-gray-100 w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' />
            </div>
            <div className='flex items-center gap-7 mt-8 w-full'>
              <label htmlFor="email" className='min-w-[6%] text-sm'>Email:</label>
              <input type="email" name="" id="email" value={user?.email || ""} readOnly className='text-sm font-[300] bg-gray-100 w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' />
            </div>
            <div className='mt-8'>
              <input type="submit" disabled={nameUploading || avatarUploading} value={nameUploading || avatarUploading ? "Saving..." : "Save"} className={`bg-dark-green text-white py-1.5 px-15 ${nameUploading || avatarUploading ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : "cursor-pointer hover:bg-muted-green "} rounded-sm text-sm`} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MyAccount