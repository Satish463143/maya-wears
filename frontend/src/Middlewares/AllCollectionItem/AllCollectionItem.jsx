import React from 'react'

const AllCollectionItem = ({ image, name, description}) => {
  return (
    <div className='allcollection_item'>
        {item?.category === "video" && (
          <>
            <div className="desktop_img">
              <video autoPlay muted loop loading='lazy'>
                <source src={item?.desktopVideo} />
              </video>
            </div>
            <div className="mobile_img">
              <video autoPlay muted loop loading='lazy'>
                <source src={item?.mobileVideo} />
              </video>
            </div>
          </>
        )}
        {item?.category === "image" && (
          <>
            <div className="desktop_img">
              <img src={item?.desktopImage} alt={item?.desktopImage}  loading='lazy'/>
            </div>
            <div className="mobile_img">
              <img src={item?.mobileImage} alt={item?.mobileImage}  loading='lazy'  />
            </div>
          </>
        )}
        <div className='collection_content'>
            <h1>{name}</h1>
            <h3>{description}</h3>
            <button >View {name}</button>
        </div>
    </div>
  )
}

export default AllCollectionItem