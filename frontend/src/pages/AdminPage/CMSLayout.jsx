import React,{useState} from 'react'
import Navbar from '../../Components/CMS/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import './CMSLayout.css'
import TopNav from '../../Components/CMS/TopNav/TopNav'
import MobileNav from '../../Components/CMS/MobileNav/MobileNav'

const CMSLayout = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };
  return (
    <div className='body_grid'>
        <div><Navbar/></div>         
        <div className='body_box'> 
          <TopNav isMenuActive={isMenuActive} toggleMenu={toggleMenu}/>
          <MobileNav isMenuActive={isMenuActive} toggleMenu={toggleMenu}/>              
          <Outlet/>
        </div>   

    </div>
  )
}

export default CMSLayout