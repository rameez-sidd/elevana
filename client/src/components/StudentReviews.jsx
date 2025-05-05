import { Rating } from '@mui/material';
import React from 'react'
import { BiSolidQuoteLeft } from "react-icons/bi";

export const reviews = [
    {
        name: "Gene Bates",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge University",
        comment:
            "A great platform with a wide range of tech courses. Easy to follow and perfect for growing your skills.",
    },
    {
        name: "Verna Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Full Stack Developer | Quarter Ltd.",
        comment:
            "The tutorials are clear, practical, and beginner-friendly. I really appreciate the structured learning approach.",
    },
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "Computer Systems Engineering Student | Zimbabwe",
        comment:
            "Great content that breaks down complex topics with ease. The real-world examples were super helpful.",
    },
    {
        name: "Mina Davidson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:
            "Loved the variety and quality of courses. It's a great place to start or sharpen your tech journey.",
    }
];


const StudentReviews = () => {
    return (
        <div className='min-h-screen flex items-center bg-dark-green'>
            <div className='mx-auto max-w-7xl flex flex-col gap-14 w-full'>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-center text-4xl font-[700] text-white'>Trusted by <span className='text-grass-green'>Learners</span></h3>
                    <p className='text-center text-lg text-gray-300'>Real experiences from real students who took the leap</p>
                </div>
                <div className='grid grid-cols-2  gap-8'>
                    {
                        reviews.map((review, index) => (
                            <div key={index} className=' bg-light-green flex flex-col gap-6 p-4 px-6 rounded-md relative'>
                                <div className='flex flex-col gap-1'>
                                    <BiSolidQuoteLeft className='text-dark-green' size={30} />
                                    <p className='text-sm'>{review.comment}</p>
                                </div>
                                <div className='flex justify-between items-end'>

                                    <div className='flex items-center gap-5'>
                                        <div><img src={review.avatar} width={50} className='rounded-full outline-3 outline-white' /></div>
                                        <div className='flex flex-col'>
                                            <h5 className='font-[600] text-md'>{review.name}</h5>
                                            <p className='text-xs text-gray-600'>{review.profession}</p>
                                        </div>
                                    </div>
                                    <Rating value={Math.random() * (5 - 3.5) + 3.5} precision={0.5} readOnly size='small' />
                                </div>


                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default StudentReviews