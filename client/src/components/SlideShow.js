import React, { useEffect, useState } from 'react'

const SlideShow = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      image:`http://localhost:5000/uploads/assets/undraw1.svg`,
      text: 'Sell your food!'
    },
    {
      id: 2,
      image:`http://localhost:5000/uploads/assets/undraw3.svg`,
      text: 'Buy the food!'
    },
    {
      id: 3,
      image:`http://localhost:5000/uploads/assets/undraw2.svg`,
      text: 'Enjoy Your Food'
    }
  ])

  return (
    <div className="slider-frame">
      <div className="image-slider">
      {images.map((data, index) => (
        <div className="img-container text-center" key={data.id} >
          <h1 className="text-dark mb-4">{data.text}</h1>
          <img src={data.image} />
        </div>
      ))}
      </div>
    </div>
  )
}

export default SlideShow
