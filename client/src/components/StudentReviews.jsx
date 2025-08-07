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
        <div className='flex items-center bg-dark-green py-12 pb-14 sm:py-18 sm:pb-20 md:py-23 md:pb-24 px-2 sm:px-3 md:px-5'>
            <div className='mx-auto max-w-7xl flex flex-col gap-6 sm:gap-9 md:gap-14 w-full'>
                <div className='flex flex-col gap-0 sm:gap-1.5 md:gap-2'>
                    <h3 className='text-center text-[23px] sm:text-2xl md:text-3xl lg:text-4xl font-[700] text-white'>Trusted by <span className='text-grass-green'>Learners</span></h3>
                    <p className='text-center text-[13px] sm:text-[15px] md:text-[17px] lg:text-lg text-gray-300'>Genuine stories from real learners</p>
                </div>
                <div className='grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 lg:gap-8'>
                    {
                        reviews.map((review, index) => (
                            <div key={index} className='col-span-2 sm:col-span-1 bg-light-green flex flex-col justify-between gap-4 md:gap-6 p-2.5 md:p-3 md:px-4 lg:py-4 lg:px-6 rounded-md relative'>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-2xl md:text-[30px]'><BiSolidQuoteLeft className='text-dark-green' /></span>
                                    <p className='text-xs md:text-sm'>{review.comment}</p>
                                </div>
                                <div className='flex justify-between gap-3 items-end'>

                                    <div className='grid grid-cols-[auto_1fr] items-center gap-3 lg:gap-5'>
                                        <div className=''><img src={review.avatar} className='w-[35px] md:w-[42px] lg:w-[50px] rounded-full outline-3 outline-white' /></div>
                                        <div className='flex flex-col'>
                                            <h5 className='font-[600] text-sm md:text-base'>{review.name}</h5>
                                            <p className='text-[11px] md:text-xs text-gray-600 line-clamp-1 overflow-x-hidden max-w-[200px] text-ellipsis'>{review.profession}</p>
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