import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSignUpDetails, resetData } from "./loginSlice";
import "../../assests/signup.css";
import { useNavigate } from "react-router";

function Signup() {
  const signup = useSelector((state) => state.login);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState(signup.email);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [referredCodeKey, setReferredCodeKey] = useState("");
  const [referral, setReferral] = useState(null);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (signup.step !== 3) {
      dispatch(resetData());
      navigate("/");
    }
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleReferralCodeKey = (e) => {
    const { value } = e.target;
    let regex = /^[A-Z0-9]+$/;
    let isValid = regex.test(document.getElementById("input").value);
    if (isValid && value.length === 6) {
      setReferral(true);
      setReferredCodeKey(value);
    } else {
      setReferral(false);
    }
  };

  const handleAgreeToPrivacy = () => {
    setAgreeToPrivacy((prev) => !prev);
  };

  function sendSignupDetails() {
    let inputValues = {
      firstName: firstName,
      email: email,
      referredCodeKey: referredCodeKey,
      agreeToPrivacyPolicy: agreeToPrivacy,
      token: signup?.token,
      source: "WEB_APP",
    };
    return { ...inputValues };
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (firstName !== "" && email !== "" && agreeToPrivacy === true) {
        await dispatch(postSignUpDetails(sendSignupDetails()));
        setMessage(true);
      } else {
        setMessage(false);
      }
    } catch (error) {}
  };

  return (
    <div className="form">
      <form className="form__container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your first name"
          onChange={handleFirstNameChange}
          value={firstName}
        />
        <input
          type="email"
          placeholder="Enter your email"
          readOnly={true}
          value={email}
        />
        <input
          type="text"
          placeholder="Enter your referral code in capital letters"
          id="input"
          onChange={handleReferralCodeKey}
        />
        <div className="signup__error">
          {message && <p>{signup?.message}</p>}
        </div>
        <div className="signup__error">
          {!referral && <p>Please enter a valid code or else leave empty</p>}
        </div>
        <div className="signup__error">
          {referral && <p>valid referral code</p>}
        </div>
        <label>
          <input type="checkbox" onClick={handleAgreeToPrivacy} />
          *Agree to privacy
        </label>
        <input className="button__signup" value="Sign up" type="submit" />
      </form>
    </div>
  );
}

export default Signup;
