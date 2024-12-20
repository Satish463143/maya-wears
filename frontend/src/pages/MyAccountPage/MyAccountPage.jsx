import React from 'react'
import MyAccount from '../../Components/MyAccount/MyAccount'
import MyAccountBanner from '../../Components/MyAccountBanner/MyAccountBanner'

const MyAccountPage = () => {
  return (
    <div>
      <MyAccountBanner/>
      <MyAccount/>      
    </div>
  )
}

export default MyAccountPage