import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../../assests/verify.css"
import { verifyOtpAndToken } from "./loginSlice";

function VerifyOTP() {
  const login = useSelector((state) => state.login);
  const [verifyOtp, setVerifyOtp] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleVerifyOtpChange = (e) => {
    const { value } = e.target
    if(value!== ""){
      setVerifyOtp(value);
    }
  };
  function sendOtp(){
    let inputValues = {email : login.email, token : login?.token, verificationCode : verifyOtp }
    return {...inputValues}
  }
  const handleVerifyClick = async(e) => {
    console.log(login)
    e.preventDefault()
    try{
      console.log("Enter")
      await dispatch(verifyOtpAndToken(sendOtp()))
      if(login.isLogin === false){
        console.log("hii")
        navigate("/signup")
      }else{
        console.log("profile")
        navigate("/profile")
      }
      console.log("Finished")
    }catch(error){}
  };
  return (
    <div className="verify">
      <div className="verify__container">
        <input
          type="text"
          placeholder="Enter a valid OTP"
          onChange={handleVerifyOtpChange}
        />
        <button className="button" onClick={handleVerifyClick}>Verify</button>
      </div>
    </div>
  );
}

export default VerifyOTP;
