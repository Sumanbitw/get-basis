import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../../assests/login.css";
import { fetchUserEmail } from "./loginSlice";

function Login() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    if(login.step === 1){
      navigate("/")
    }
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  const handleEmailChange = (e) => {
    const { value } = e.target;
    if (value !== "") {
      setEmail(value);
    }
  };

  const handleEnterClick = async (e) => {
    e.preventDefault();
    let regex =
      /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
    let isValid = regex.test(document.getElementById("email")?.value);
    try {
      if (isValid) {
        await dispatch(fetchUserEmail(email));
        navigate("/verify");
        setMessage(false);
      } else {
        setMessage(true);
      }
    } catch (error) {}
  };

  return (
    <div className="login">
      <div className="login__container">
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleEmailChange}
        />
        {message && <p>Please enter a valid email address</p>}
        <button className="button" onClick={handleEnterClick}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
