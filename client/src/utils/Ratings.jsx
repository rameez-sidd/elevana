import React from 'react'
import { IoStarOutline, IoStarHalfOutline, IoStar } from "react-icons/io5";

const Ratings = ({ rating }) => {
    const stars = []

    for(let i=1; i<=5; i++){
        if(i <= rating){
            stars.push(<IoStar className='cursor-pointer'/>)
        } else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<IoStarHalfOutline className='cursor-pointer'/>)
        } else{
            stars.push(<IoStarOutline className='cursor-pointer'/>)
        }
    }


    return (
        <div className='flex items-center gap-2'>
            {stars}
        </div>
    )
}

export default Ratings