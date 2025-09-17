import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseCreation, setCourseInfo, setDemoFileName } from '../../../redux/features/courses/courseCreationSlice';
import { useGetLayoutDataQuery } from '../../../redux/features/layout/layoutApi';

const CourseInfo = () => {
    const dispatch = useDispatch();
    const courseInfo = useSelector((state) => state.courseCreation.courseInfo);
    const [dragging, setDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate()
    const isEditing = useSelector((state) => state.courseCreation.isEditing)
    const { data, isLoading } = useGetLayoutDataQuery("Categories", { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories)
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/admin/admin-dashboard/create-course/course-data')
        

    }

    const handleChange = (e) => {
        dispatch(setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    dispatch(setCourseInfo({ ...courseInfo, thumbnail: reader.result }))
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleVideoUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return;

        if (file.size > 100 * 1024 * 1024) { // 100MB limit
            toast.error("Video size should be less than 100MB");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("video", file);

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_PUBLIC_SERVER_URI}/upload-video`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(setCourseInfo({ ...courseInfo, demoUrl: data.videoUrl }));
            toast.success("Video uploaded successfully!");
            dispatch(setDemoFileName(file.name))
        } catch (error) {
            toast.error(error.response?.data?.message || "Error uploading video");
        } finally {
            setUploading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                dispatch(setCourseInfo({ ...courseInfo, thumbnail: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className='py-12 px-6 b2xl:px-12'>
            <div>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-0.5'>
                        <label htmlFor="course-name" className='text-sm'>Course Name</label>
                        <input type="text" name="name" id="course-name" disabled={uploading} value={courseInfo.name} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='e.g. Full Stack Web Development' required />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <label htmlFor="course-description" className='text-sm'>Course Description</label>
                        <textarea name="description" disabled={uploading} id="course-description" value={courseInfo.description} onChange={handleChange} className='resize-none text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='e.g. Learn to build modern web applications using HTML, CSS, JavaScript, and the MERN stack.' rows={7} />
                    </div>
                    <div className='flex items-center w-full justify-between gap-12'>
                        <div className='flex flex-col gap-0.5 flex-1'>
                            <label htmlFor="price" className='text-sm'>Course Price</label>
                            <div className='flex items-center gap-1.5'>
                                <p className='text-lg'>₹</p>
                                <input type="number" disabled={uploading} name="price" id="price" value={courseInfo.price} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='499' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-0.5 flex-1'>
                            <label htmlFor="estimated-price" className='text-sm'>Estimated Price (optional)</label>
                            <div className='flex items-center gap-1.5'>
                                <p className='text-lg'>₹</p>
                                <input type="number" disabled={uploading} name="estimatedPrice" id="estimated-price" value={courseInfo.estimatedPrice} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='799' />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center w-full justify-between gap-12'>
                        <div className='flex flex-col gap-0.5 flex-1'>
                            <label htmlFor="course-tags" className='text-sm'>Course Tags</label>
                            <input type="text" name="tags" disabled={uploading} id="course-tags" value={courseInfo.tags} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='Separate with commas (e.g. HTML, CSS, Javascript)' required />
                        </div>
                        <div className='flex flex-col gap-0.5 flex-1'>
                            <label htmlFor="course-category" className='text-sm'>Course Category</label>
                            <select name="categories" id="course-category" value={courseInfo.categories} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none cursor-pointer'>
                                <option value="" className='hidden !text-[#7F7F7F]'>Select Category</option>
                                {
                                    categories.map((item) => (
                                        <option key={item._id} value={item.title}>{item.title}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>
                  
                    <div className='flex items-center w-full justify-between gap-12'>
                        <div className='flex flex-col gap-0.5 flex-1'>
                            <label htmlFor="course-level" className='text-sm'>Course Level</label>
                            <input type="text" name="level" disabled={uploading} id="course-level" value={courseInfo.level} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='e.g. Beginner, Intermediate, Advanced' required />
                        </div>
                        <div className='flex flex-col gap-0.5 flex-1'>
                            <label htmlFor="demo-video" className='text-sm'>Demo Video</label>
                            <div className='flex items-center gap-2'>
                                <input type="file" disabled={uploading} name="demoVideo" id="demo-video" accept="video/*" onChange={handleVideoUpload} className='hidden' />
                                <label htmlFor="demo-video" className={`text-sm font-[300] ${courseInfo?.demoUrl ? "text-black" : "text-[#7F7F7F]"} bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none ${uploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} hover:bg-gray-50 flex items-center gap-1 line-clamp-1!`}>
                                    {
                                        uploading ? <>
                                            <span>Uploading...</span>
                                            <div className="inline-block b2xl:block w-4 h-4 border-4 border-gray-300 border-t-dark-green rounded-full animate-spin"></div>
                                        </> : courseInfo.demoUrl ? courseInfo.demoFileName || "Change Video" : "Upload your demo video file here"
                                    }
                                </label>
                                {
                                    courseInfo.demoUrl && (
                                        <button type="button" onClick={() => {
                                            dispatch(setCourseInfo({ ...courseInfo, demoUrl: "" }));
                                            dispatch(setDemoFileName(""));
                                        }} className='text-red-500 hover:text-red-700 text-xs'>Remove</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <input type="file" disabled={uploading} name="thumbnail" id="file" accept='image/*' className='hidden' onChange={handleFileChange} />
                        <label htmlFor="file" className={`${courseInfo.thumbnail ? "max-w-full bxl:w-[500px] p-2" : "w-full p-4"} ${dragging ? "bg-light-green" : "bg-white"} border border-gray-300 flex flex-col items-center justify-center rounded-sm ${uploading ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'} `} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                            {
                                courseInfo.thumbnail ? (
                                    <>
                                        <div className='text-sm p-2 pb-4'>
                                            Replace your thumbnail <span className='text-dark-green cursor-pointer'>Browse</span>
                                        </div>
                                        <img src={isEditing ? courseInfo.thumbnail.url || courseInfo.thumbnail : courseInfo.thumbnail} alt="thumbnail" className='max-h-full w-full object-cover' />
                                    </>
                                ) : (
                                    <div className='text-sm'>
                                        Drop your thumbnail here or <span className='text-dark-green cursor-pointer'>Browse</span>
                                    </div>
                                )
                            }
                        </label>
                    </div>
                    <div className={`flex items-center mt-3 ${isEditing ? "justify-between" : "justify-end"}`}>
                        {
                            isEditing && (
                                <button type="button" disabled={uploading} className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' onClick={() => {
                                    dispatch(resetCourseCreation())
                                    navigate('/admin/admin-dashboard/all-courses')
                                }} >Cancel</button>
                            )
                        }

                        <input type="submit" value="Next" disabled={uploading} className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseInfo