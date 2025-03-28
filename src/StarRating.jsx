import React, { useState } from 'react'
import {Star , StarHalf} from 'lucide-react'
const StarRating = () => {

  const [hoverRating, setHoverRating] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const handleOnHover = (e,index) => {
     if(index === null){  setHoverRating(index);  return}
     else {
        console.log(e)
        const rect = e.currentTarget.getBoundingClientRect();
        console.log(rect , e.clientX)
        const starPosition = e.clientX - rect.left;
        const halfWidth = rect.width / 2;
        if(starPosition < halfWidth) {
            setHoverRating(index - 0.5)
        } else {
        setHoverRating(index);
        }
     }
  }

  const calculateStar = (e, index) => { 
        console.log(e.currentTarget)
        const button = e.currentTarget.getBoundingClientRect();
        const clickPosition = e.clientX - button.left;
        const halfWidth = button.width / 2; 
        const rating = clickPosition < halfWidth ? index - 0.5 : index;
        setUserRating(rating)
  }

  const renderStar = (index) => {
    const currentRating = hoverRating ?? userRating
    const isHalfStar = currentRating === index - 0.5
    const isHovered = currentRating  >=index  
    return (
        <button key={index}  className='text-yellow-400' 
        onClick={(e) => calculateStar(e, index)}
        onMouseEnter={(e)=> handleOnHover(e,index)} 
        onMouseLeave={(e)=> handleOnHover(e,null)} >
        {isHalfStar ? 
        <StarHalf fill='currentColor'/> : 
         <Star fill={`${isHovered ? 'currentColor':'transparent'}`}/>
        }
        </button>
    )
  }

  return (
    <div className='bg-white fixed top-1/2 left-1/2 transform -translate-1/2 flex justify-center flex-col items-center w-100 h-40 shadow-md rounded-lg'>
        <p className='block'>How was your experience ?</p>
        <div className='flex gap-1'>
            {Array.from({length:5},(_,i)=> renderStar(i+1))}
        </div>
    </div>
  )
}

export default StarRating



