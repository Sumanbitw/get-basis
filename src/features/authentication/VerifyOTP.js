import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../../assests/verify.css";
import { resetData, verifyOtpAndToken } from "./loginSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function VerifyOTP() {
  const login = useSelector((state) => state.login);
  const [verifyOtp, setVerifyOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (login.step !== 2) {
      dispatch(resetData());
      navigate("/");
    }
  }, []);

  const handleVerifyOtpChange = (e) => {
    const { value } = e.target;
    if (value !== "") {
      setVerifyOtp(value);
    }
  };
  function sendOtp() {
    let inputValues = {
      email: login.email,
      token: login?.token,
      verificationCode: verifyOtp,
    };
    return { ...inputValues };
  }
  const handleVerifyClick = async (e) => {
    e.preventDefault();
    try {
      await dispatch(verifyOtpAndToken(sendOtp()));
      if (login.isLogin === false && verifyOtp === "112233") {
        navigate("/signup");
      } else if (login.isLogin === true && verifyOtp === "112233") {
        navigate("/profile");
      } else {
        navigate("/verify");
      }
    } catch (error) {}
  };
  console.log(login?.wrongEmailTokenCount)
  return (
    <div className="verify">
      <div className="verify__container">
        <div className="verify__header">
          <h1>Verify email</h1>
        </div>
        <div className="verify__input">
          <input
            type="text"
            placeholder="Enter a valid OTP"
            onChange={handleVerifyOtpChange}
          />
        </div>
        <div className="verify__error">
          {login?.success === false && <p>{login?.message}</p>}
        </div>
        <div className="button__container">
          <button className="button__verify" onClick={handleVerifyClick}>
            Verify
          </button>
        </div>
        <div className="arrow">
        {login?.wrongEmailTokenCount === false && (
          <AiOutlineArrowLeft onClick={() => navigate("/")} size={28}/>
        )}
      </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
