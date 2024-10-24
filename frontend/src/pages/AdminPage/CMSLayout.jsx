import React from 'react'
import Navbar from '../../Components/CMS/Navbar/Navbar'
import Footer from '../../Components/CMS/Footer/Footer'
import { Outlet } from 'react-router-dom'

const CMSLayout = () => {
  return (
    <div>
        <Navbar/>                   
          <Outlet/>
        <Footer/>

    </div>
  )
}

export default CMSLayout