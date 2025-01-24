import React from 'react'

function ImageSlider() {
    const [data, setData] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [images,setImages] = React.useState([])
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
        let newImageLinks = []
        json.forEach(item=>newImageLinks.push(<img src={item.urls.full} />))
        setImages(newImageLinks)
        
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
// console.log(images)
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
       images[currentImage] }
        <button onClick={()=>setCurrentImage(currentImage+1)}>next</button>
        </div>
      )
}
  
}

export default ImageSlider




