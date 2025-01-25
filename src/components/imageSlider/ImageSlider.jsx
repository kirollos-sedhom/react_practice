import React from 'react'
import { IoIosArrowDroprightCircle,IoIosArrowDropleftCircle  } from "react-icons/io";

function ImageSlider() {
    const [data, setData] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const [currentImage, setCurrentImage] = React.useState(0)

async function getData(){
    setIsLoading(true)
    try{
        const url = `https://api.unsplash.com/photos/random?query=laptop&count=4&client_id=${import.meta.env.VITE_UNSPLASH_SECRET_KEY}`
        const response = await fetch(url)
        if (!response.ok){
            throw new Error(`response status: ${response.status}`);
            
        }
        const json = await response.json()
        setData(json)

        
    }
    catch(error){
        setError(error)
        console.log(error)
    }
    finally{
        setIsLoading(false)
    }
}

React.useEffect(()=>{
    getData()

},[])
console.log(data)
if (isLoading) {
    return (<h1>loading</h1>)
}else{

    
    return (
        <div>
      {/* Display loading indicator or placeholder while fetching */}
      {isLoading && <p>Loading...</p>}

      {/* Display error message if there's an error */}
      {error && <p>Error: {error}</p>}

      {/* Only render the actual data if it's available */}
      {data && 
      (
        // images container
        <div className='relative w-96 h-96 border-2'>
        <IoIosArrowDropleftCircle className='z-10 fill-white size-8 absolute bottom-1/2 left-0' onClick={()=> currentImage===0? setCurrentImage(data.length-1) : setCurrentImage(currentImage-1)} />
            {
                data.map((image,index)=>{
                    const classList = index===currentImage? "h-full w-full object-contain transition-opacity duration-500" : "hidden"
                    return (
                        <>
                        <img key={index} alt={image.alt_description} src={image.urls.full} className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
          index === currentImage ? "opacity-100" : "opacity-0"
        }`}/>
                        
                        </>
            
                )
                  })
            }
            <IoIosArrowDroprightCircle className='fill-white size-8 absolute bottom-1/2 right-0' onClick={()=> currentImage===data.length-1? setCurrentImage(0) : setCurrentImage(currentImage+1)} /> 
            <div className='buttons absolute bottom-10 right-1/2'>
                {[...Array(data.length)].map((item,index)=>{
                    return <button key={index} onClick={()=>setCurrentImage(index)} className={currentImage===index? 'bg-gray-700 rounded-full p-2':"disabled bg-gray-200  rounded-lg rounded-full p-2"}></button>
                })}
            </div>
            
        </div>
      )}
        {/* <button onClick={()=>setCurrentImage(currentImage+1)}>next</button> */}

        </div>
      )
}
  
}

export default ImageSlider




{/* 
                        
*/}