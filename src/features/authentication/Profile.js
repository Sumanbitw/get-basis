import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import waving from "../../assests/images/waving.png";
import { HiOutlineMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import "../../assests/profile.css";
import { useNavigate } from "react-router";
import { logoutUser, resetData } from "./loginSlice";

function Profile() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(login.step !== 4){
      dispatch(resetData())
      navigate("/")
    }
  },[])

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logoutUser(sendTokenAndId()));
      await dispatch(resetData())
    } catch (error) {}
  };

  function sendTokenAndId() {
    let inputValues = { id: login?.user?._id, token: login?.user?.token };
    return { ...inputValues };
  }
  
  console.log(login?.message)
  return (
    <div className="profile">
      {login?.success ? (
        <>
          <div className="profile__container">
            <h1>Hello, {login?.user?.firstName}</h1>
            <span>
              <img src={waving} alt="" />
            </span>
          </div>
          <div>
            <div>
              <HiOutlineMail /> {login?.user?.email}
            </div>
            <div>
              <HiPhone /> {login?.user?.phoneNumber}
            </div>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <div style={{marginTop:"10rem"}}>Successfully logged out{login?.message}
          <button onClick={() => navigate("/")}>Retry</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
