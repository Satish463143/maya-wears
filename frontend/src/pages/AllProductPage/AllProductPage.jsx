import React from 'react'
import './AllProductPage.css'
import Banner from '../../Components/Banner/Banner'
import AllProductBanner from '../../Components/AllProductBanner/AllProductBanner'
import AllProducts from '../../Components/AllProducts/AllProducts'

const AllProductPage = () => {
  return (
    <div >
        <AllProductBanner/>
        <AllProducts/>
    </div>
  )
}

export default AllProductPage