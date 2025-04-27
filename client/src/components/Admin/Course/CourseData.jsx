import React from 'react'
import { HiPlus } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setBenefits, setPrerequisites } from '../../../redux/features/courses/courseCreationSlice';
import { useNavigate } from 'react-router-dom';

const CourseData = () => {
  const dispatch = useDispatch();
  const { benefits, prerequisites } = useSelector((state) => state.courseCreation);
  const navigate = useNavigate()

  const handleBenefitChange = (index, value) => {
    const updatedBenefits = benefits.map((benefit, i) => 
      i === index ? { ...benefit, title: value } : benefit
    );
    dispatch(setBenefits(updatedBenefits));
  };

  const handleAddBenefit = () => {
    dispatch(setBenefits([...benefits, { title: "" }]));
  };

  const handlePrerequisitesChange = (index, value) => {
    const updatedPrerequisites = prerequisites.map((prerequisite, i) => 
      i === index ? { ...prerequisite, title: value } : prerequisite
    );
    dispatch(setPrerequisites(updatedPrerequisites));
  };

  const handleAddPrerequisites = () => {
    dispatch(setPrerequisites([...prerequisites, { title: "" }]));
  };

  const handleRemoveBenefit = (index) => {
    const updated = benefits.filter((_, i) => i !== index);
    dispatch(setBenefits(updated));
  };

  const handleRemovePrerequisite = (index) => {
    const updated = prerequisites.filter((_, i) => i !== index);
    dispatch(setPrerequisites(updated));
  };

  const handlePrev = () => {
    navigate('/admin/admin-dashboard/create-course')
  }
  const handleNext = () => {
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
      navigate('/admin/admin-dashboard/create-course/course-content')
    } else{
        toast.error("Please fill all the fields to go to next!")
    }
  }

  return (
    <div className='py-12 px-12'>
      <div className='flex flex-col gap-8'>

        <div className='flex flex-col gap-1'>
          <label>What are the benefits of purchasing this course?</label>
          <div className='flex flex-col gap-2'>
            {
              benefits.map((benefit, index) => (
                <div className='flex items-center gap-2' key={index}>
                  <input type="text" name="benefit" key={index} required value={benefit.title} onChange={(e) => handleBenefitChange(index, e.target.value)} placeholder='e.g. Build real-world projects from scratch' className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' />
                  <CgClose className='text-dark-green bg-white rounded-full p-1 cursor-pointer outline outline-gray-300' size={26} onClick={() => handleRemoveBenefit(index)} />
                </div>
              ))
            }
            <HiPlus className='bg-dark-green text-white cursor-pointer rounded-full p-1 mt-1' size={24} onClick={handleAddBenefit} />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label>What are the prerequisites for starting this course?</label>
          <div className='flex flex-col gap-2'>
            {
              prerequisites.map((prerequisite, index) => (
                <div className='flex items-center gap-2' key={index}>
                  <input type="text" name="prerequisite" key={index} required value={prerequisite.title} onChange={(e) => handlePrerequisitesChange(index, e.target.value)} placeholder='e.g. Basic HTML & CSS knowledge' className='text-sm font-[300] bg-white w-full p-2 px-3 border border-gray-300 rounded-sm outline-none' />
                  <CgClose className='text-dark-green bg-white rounded-full p-1 cursor-pointer outline outline-gray-300' size={26} onClick={() => handleRemovePrerequisite(index)} />
                </div>
              ))
            }
            <HiPlus className='bg-dark-green text-white cursor-pointer rounded-full p-1 mt-1' size={24} onClick={handleAddPrerequisites} />
          </div>
        </div> 

        <div className='flex items-center justify-between'>
          <button className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' onClick={handlePrev}> Previous</button>
          <button className='bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm cursor-pointer' onClick={handleNext}> Next</button>
        </div>
      </div>
    </div>
  )
}

export default CourseData