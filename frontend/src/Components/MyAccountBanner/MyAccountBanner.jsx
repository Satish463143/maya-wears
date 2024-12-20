import React from 'react'
import './MyAccountBanner.css'
import myAccountBanner from '../../../src/assets/images/my account banner.png'

const MyAccountBanner = () => {
  return (
    <div className='account_banner'>
        <div className="banner_img">
            <img className='desktopImg' src={myAccountBanner} alt="" />
        </div>    
        <div className="account_banner_content">
            <h1>My Account</h1>
        </div>    
    </div>
  )
}

export default MyAccountBanner