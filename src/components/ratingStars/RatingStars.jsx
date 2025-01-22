import React from 'react'
import { FaStar } from "react-icons/fa";
function RatingStars(){
  const [selected, setSelected] = React.useState(-1)
  const [hovered, setHovered] = React.useState(-1)
  return (
    <div className='flex justify-center mt-4'>
      {[...Array(6)].map(
        (curr,index)=>{
          
          return (
            <FaStar 
            onClick={() =>setSelected(index)}
            onMouseEnter={()=>setHovered(index)}
            onMouseLeave={()=>setHovered(selected)}
            key={index}
            className={`${index <= hovered ? "fill-yellow-500" : ""}`}
            />
          )
        }
      )}
      
    </div>
  )
}

export default RatingStars
