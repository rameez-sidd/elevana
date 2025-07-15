import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import React, { useState } from 'react'
import { PiPencilSimpleLineFill, PiLinkBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineChevronDown } from "react-icons/hi";
import { BiVideoPlus } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseContentData, setContentFileName, setCourseData, setContentDuration } from '../../../redux/features/courses/courseCreationSlice';
import { useNavigate } from 'react-router-dom';
import { formatVideoLength } from '../../../utils/formatVideoLength';

const CourseContent = () => {
  const dispatch = useDispatch();
  const courseContentData = useSelector((state) => state.courseCreation.courseContentData);
  const courseInfo = useSelector((state) => state.courseCreation.courseInfo);
  const benefits = useSelector((state) => state.courseCreation.benefits);
  const prerequisites = useSelector((state) => state.courseCreation.prerequisites);
  const [isEditable, setIsEditable] = useState(null)
  const [activeSection, setActiveSection] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [isAnyVideoUploading, setIsAnyVideoUploading] = useState(false)
  const navigate = useNavigate()

  const updateField = (index, field, value) => {
    const updatedData = courseContentData.map((item, i) => {
      if (field === "videoSection") {
        // Update all items in the same section
        if (item.videoSection === courseContentData[index].videoSection) {
          return { ...item, videoSection: value };
        }
        return item;
      }
      return i === index ? { ...item, [field]: value } : item;
    });
    dispatch(setCourseContentData(updatedData));
  }

  const updateLinkField = (index, linkIndex, field, value) => {
    const updatedData = courseContentData.map((item, i) => {
      if (i === index) {
        const updatedLinks = item.links.map((link, j) => 
          j === linkIndex ? { ...link, [field]: value } : link
        );
        return { ...item, links: updatedLinks };
      }
      return item;
    });
    dispatch(setCourseContentData(updatedData));
  };

  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = courseContentData.map((item, i) => {
      if (i === index) {
        const updatedLinks = item.links.filter((_, j) => j !== linkIndex);
        return { ...item, links: updatedLinks };
      }
      return item;
    });
    dispatch(setCourseContentData(updatedData));
  };

  const handleAddLink = (index) => {
    const updatedData = courseContentData.map((item, i) => {
      if (i === index) {
        return { ...item, links: [...item.links, { title: "", url: "" }] };
      }
      return item;
    });
    dispatch(setCourseContentData(updatedData));
  };

  const validateContent = (item) => {
    return (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    );
  };

  const newContentHandler = (item) => {
    if (validateContent(item)) {
      toast.error("Please fill all the fields first!");
      return;
    }

    const newVideoSection = courseContentData.length > 0 ? courseContentData[courseContentData.length - 1].videoSection : "";

    dispatch(setCourseContentData([...courseContentData, {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: newVideoSection,
      videoLength: "",
      links: [{ title: "", url: "" }],
      fileName: "",
    }]));
  };

  const addNewSection = () => {
    const lastItem = courseContentData[courseContentData.length - 1];
    if (validateContent(lastItem)) {
      toast.error("Please fill all the fields first!");
      return;
    }

    setActiveSection(activeSection + 1);
    dispatch(setCourseContentData([...courseContentData, {
      videoUrl: "",
      title: "",
      description: "",
      videoLength: "",
      videoSection: `Untitled Section ${activeSection}`,
      links: [{ title: "", url: "" }],
      fileName: "",
    }]));
  };

  const handlePrev = () => {
    navigate('/admin/admin-dashboard/create-course/course-data')
  }

  const formatData = () => {
    const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoLength: courseContent.videoLength,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }))

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      categories: courseInfo.categories,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    }
    return data
  }

  const setTheCourseDetails = () => {
    const data = formatData()

    dispatch(setCourseData(data))
  }

  const handleNext = () => {
    if (validateContent(courseContentData[courseContentData.length - 1])) {
      toast.error("A Section cannot be empty!")
    } else {
      setTheCourseDetails()
      navigate('/admin/admin-dashboard/create-course/course-preview')
    }
  }

  const handleVideoUpload = async (e, index) => {
    const file = e.target.files?.[0]
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast.error("Video size should be less than 100MB");
      return;
    }

    setIsAnyVideoUploading(true);
    setUploading(index);
    const formData = new FormData();
    formData.append("video", file);
    
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_PUBLIC_SERVER_URI}/upload-video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updateField(index, "videoUrl", data.videoUrl);
      toast.success("Video uploaded successfully!");
      dispatch(setContentFileName({ index, fileName: file.name }));
      dispatch(setContentDuration({ index, videoLength: formatVideoLength(data.videoLength) }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading video");
    } finally {
      setUploading(null);
      setIsAnyVideoUploading(false);
    }
  };

  return (
    <div className='px-12 py-12'>
      <div className=' flex flex-col gap-20'>
        <form className='flex flex-col gap-4'>
          {
            courseContentData?.map((item, index) => {
              const newSection = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection

              return (
                <div className={`one-section flex flex-col gap-2 bg-white border border-gray-300  ${newSection ? "pt-2 rounded-sm" : "pt-0 rounded-b-md mt-[-26px] border-t-0"} pb-2 px-3`} key={index}>
                  {
                    newSection && (
                      <div className='flex items-center gap-3'>
                        <input type="text" name="videoSection" id={`videoSection-${index}`} disabled={isAnyVideoUploading} readOnly={isEditable !== index} value={item.videoSection} className='outline-none w-full border-none text-lg font-[600] text-dark-green' onChange={(e) => updateField(index, "videoSection", e.target.value)} onBlur={() => setIsEditable(null)} autoFocus={isEditable === index} />
                        <label htmlFor={`videoSection-${index}`} onClick={() => setIsEditable((prev) => (prev === index ? null : index))} className={`${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} hover:bg-light-green rounded-full p-2 text-dark-green`} ><PiPencilSimpleLineFill size={22} /></label>
                      </div>
                    )
                  }

                  <Collapsible>
                    <div className='px-3 flex flex-col gap-6 bg-gray-100 border text-black rounded-sm border-gray-300 py-2'>
                      <div className='flex items-center w-full '>
                        <CollapsibleTrigger className='flex-1 text-left'>
                          <h5 className='text-sm font-[600] cursor-pointer flex-1 '>{item.title ? `${index + 1}. ${item.title}` : `${index + 1}. Video Title`}</h5>
                        </CollapsibleTrigger>
                        <div className='flex items-center gap-3'>
                          {
                            index > 0 && (
                              <RiDeleteBin6Line className={`${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} w-6.5 h-6.5 p-1 hover:bg-green rounded-full`} size={25} onClick={() => {
                                const updatedData = [...courseContentData];
                                updatedData.splice(index, 1);
                                dispatch(setCourseContentData(updatedData));
                              }} />
                            )
                          }

                          <CollapsibleTrigger>
                            <HiOutlineChevronDown className={`w-6.5 h-6.5 p-1 hover:bg-green rounded-full ${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}`} size={25} />
                          </CollapsibleTrigger>
                        </div>
                      </div>

                      <CollapsibleContent>
                        <div className='flex flex-col gap-3'>
                          <div className='flex flex-col gap-0.5'>
                            <input type="text" name="video-title" id="video-title" disabled={isAnyVideoUploading} value={item.title} className='text-sm font-[300] bg-white w-full p-2 px-3 rounded-sm outline-none border border-gray-300' onChange={(e) => updateField(index, "title", e.target.value)} placeholder='Enter the title of the video'/>
                          </div>
                          <div className='flex flex-col gap-0.5'>
                            <div className='flex items-center gap-2'>
                              <input type="file" name={`video-upload-${index}`} id={`video-upload-${index}`} accept="video/*" onChange={(e) => handleVideoUpload(e, index)} className='hidden' />
                              <label htmlFor={`video-upload-${index}`} className={`text-sm font-[300] bg-white w-full p-2 px-3 rounded-sm outline-none border ${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} border-gray-300 ${uploading === index || item.videoUrl === "" ? "text-[#7F7F7F]" : "text-black"} flex items-center gap-1`}>
                                {
                                  uploading === index ? <>
                                    <span>Uploading...</span>
                                    <div className="w-4 h-4 border-4 border-gray-300 border-t-dark-green rounded-full animate-spin"></div>
                                  </> : item.videoUrl ? item.fileName || "Change Video" : "Upload your video file here"
                                }
                              </label>
                              {item.videoUrl && (
                                <button type="button" onClick={() => {updateField(index, "videoUrl", ""); setFileNames((prev) => ({ ...prev, [index]: "" }))}} className='text-red-500 hover:text-red-700 text-xs'>Remove</button>
                              )}
                            </div>

                          </div>
                          <div className='flex flex-col gap-0.5'>
                            <input type="text" readOnly name="video-length" id="video-length" disabled={isAnyVideoUploading} value={item.videoLength} className='text-sm font-[300] bg-white w-full p-2 px-3 rounded-sm outline-none border border-gray-300'  placeholder='Enter duration (e.g. 5:23)'/>
                          </div>
                          <div className='flex flex-col gap-0.5'>
                            <textarea name="video-description" id="video-description" disabled={isAnyVideoUploading} value={item.description} className='text-sm font-[300] bg-white w-full p-2 px-3 rounded-sm outline-none border border-gray-300 resize-none' rows='7' onChange={(e) => updateField(index, "description", e.target.value)} placeholder='Enter a brief description of the video' />
                          </div>
                        </div>

                        {/* links */}
                        <div className='flex flex-col gap-4 mt-5 mb-2 rounded-sm  '>
                          {
                            item?.links?.map((link, linkIndex) => (
                              <div className='flex flex-col gap-2 rounded-sm ' key={linkIndex}>
                                <div className='flex items-center justify-between'>
                                  <h6 className='text-sm font-[600]'>{`Link ${linkIndex + 1}`}</h6>
                                  {
                                    linkIndex > 0 && (
                                      <div onClick={() => handleRemoveLink(index, linkIndex)}><RiDeleteBin6Line className={`w-6.5 h-6.5 p-1 hover:bg-green rounded-full ${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}`} size={25} /></div>
                                    )
                                  }

                                </div>
                                <div>
                                  <div className='flex flex-col gap-2'>
                                    <input type='text' name="link-title" disabled={isAnyVideoUploading} value={link.title} onChange={(e) => updateLinkField(index, linkIndex, "title", e.target.value)} className='text-sm font-[300] bg-white w-full py-1  px-3 rounded-sm border border-gray-300 outline-none' placeholder='e.g. Official React Docs' />
                                    <input type='text' name="link-url" disabled={isAnyVideoUploading} value={link.url} onChange={(e) => updateLinkField(index, linkIndex, "url", e.target.value)} className='text-sm font-[300] bg-white w-full py-1 px-3 rounded-sm border border-gray-300 outline-none' placeholder='e.g. https://reactjs.org' />
                                  </div>
                                </div>
                              </div>
                            ))
                          }

                          <div className={`flex items-center gap-1 ${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} border border-dark-green text-dark-green  w-fit rounded-sm px-3 py-1 `} onClick={() => handleAddLink(index)}>
                            <PiLinkBold />
                            <p className='text-xs font-[500]'>Add Link</p>
                          </div>
                        </div>
                      </CollapsibleContent>

                    </div>
                  </Collapsible>

                  {/* Add new Content */}
                  <div className='mt-2 mb-2'>
                    {
                      index === courseContentData.length - 1 && (
                        <div className={`flex items-center justify-center gap-1 ${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} hover:bg-muted-green bg-dark-green w-fit rounded-sm font-[300] text-xs p-2 px-3 text-white`} onClick={(e) => newContentHandler(item)}>
                          Add New Video
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            })
          }

          {/* Add new section */}
          <div className=''>
            <div className={`flex items-center justify-center gap-1 ${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} bg-black hover:bg-gray-700  w-9 rounded-full h-9 text-white`} onClick={addNewSection}>
              <FiPlus size={24} />
            </div>
          </div>
        </form>

        <div className='flex items-center justify-between'>
          <button className={`bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm ${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}`} onClick={handlePrev}> Previous</button>
          <button className={`bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm ${isAnyVideoUploading ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}`} onClick={handleNext}> Next</button>
        </div>
      </div>
    </div>
  )
}

export default CourseContent