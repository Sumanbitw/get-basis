import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import waving from "../../assests/images/waving.png"
import { HiOutlineMail } from "react-icons/hi"
import { HiPhone } from "react-icons/hi"
import "../../assests/profile.css"
import { useNavigate } from 'react-router'

function Profile() {
  const profile = useSelector(state => state.login )
  const navigate = useNavigate()

  const handleLogout = () => {
    
  }
  console.log(profile)
  return (
    <div className="profile">
      <div className="profile__container">
        <h1>Hello, {profile?.user?.firstName}</h1>
        <span><img src={waving} alt=""/></span>
      </div>
      <div>
        <div><HiOutlineMail/> {profile?.user?.email}</div>
        <div><HiPhone/> {profile?.user?.phoneNumber}</div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
