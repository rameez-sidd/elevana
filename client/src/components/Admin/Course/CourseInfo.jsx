import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

const CourseInfo = ({ courseInfo, setCourseInfo, activeStep, setActiveStep }) => {
    const [dragging, setDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [fileName, setFileName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setActiveStep(activeStep + 1)
    }

    const handleChange = (e) => {
        setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
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

        setFileName(file.name)
        setUploading(true);
        const formData = new FormData();
        formData.append("video", file);

        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/upload-video", formData, {

                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setCourseInfo({ ...courseInfo, demoUrl: data.videoUrl });
            toast.success("Video uploaded successfully!");
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
                setCourseInfo({ ...courseInfo, thumbnail: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }


    return (
        <div className='py-12 px-12'>
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
                                <p className='text-lg'>$</p>
                                <input type="number" disabled={uploading} name="price" id="price" value={courseInfo.price} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='499' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-0.5 flex-1'>
                            <label htmlFor="estimated-price" className='text-sm'>Estimated Price (optional)</label>
                            <div className='flex items-center gap-1.5'>
                                <p className='text-lg'>$</p>
                                <input type="number" disabled={uploading} name="estimatedPrice" id="estimated-price" value={courseInfo.estimatedPrice} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='799' />
                            </div>
                        </div>

                    </div>

                    <div className='flex flex-col gap-0.5'>
                        <label htmlFor="course-tags" className='text-sm'>Course Tags</label>
                        <input type="text" name="tags" disabled={uploading} id="course-tags" value={courseInfo.tags} onChange={handleChange} className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' placeholder='Separate with commas (e.g. HTML, CSS, Javascript)' required />
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
                                <label htmlFor="demo-video" className={`text-sm font-[300] ${uploading || courseInfo?.demoUrl === "" ? "text-[#7F7F7F]" : "text-black"} bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none ${uploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} hover:bg-gray-50 flex items-center gap-1`}>
                                    {
                                        uploading ? <>
                                            <span>Uploading...</span>
                                            <div className="w-4 h-4 border-4 border-gray-300 border-t-dark-green rounded-full animate-spin"></div>
                                        </> : courseInfo.demoUrl ? fileName || "Change Video" : "Upload your demo video file here"
                                    }

                                    
                                </label>
                                { 
                                    courseInfo.demoUrl && (
                                        <button  type="button" onClick={() => { setCourseInfo({ ...courseInfo, demoUrl: "" }); setFileName("") }} className='text-red-500 hover:text-red-700 text-xs'>Remove</button>
                                    )
                                }
                            </div>

                            

                        </div>
                    </div>

                    <div className='mt-5'>
                        <input type="file" disabled={uploading} name="thumbnail" id="file" accept='image/*' className='hidden' onChange={handleFileChange} />
                        <label htmlFor="file" className={`${courseInfo.thumbnail ? "w-[500px] p-2" : "w-full p-4"} ${dragging ? "bg-light-green" : "bg-white"} border border-gray-300 flex flex-col items-center justify-center rounded-sm ${uploading ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'} `} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                            {
                                courseInfo.thumbnail ? (
                                    <>
                                        <div className='text-sm p-2 pb-4'>
                                            Replace your thumbnail <span className='text-dark-green cursor-pointer'>Browse</span>
                                        </div>
                                        <img src={courseInfo.thumbnail} alt="thumbnail" className='max-h-full w-full object-cover' />
                                    </>
                                ) : (
                                    <div className='text-sm'>
                                        Drop your thumbnail here or <span className='text-dark-green cursor-pointer'>Browse</span>
                                    </div>
                                )
                            }
                        </label>
                    </div>

                    <div className='flex justify-end'>
                        <input type="submit" value="Next" disabled={uploading} className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseInfo