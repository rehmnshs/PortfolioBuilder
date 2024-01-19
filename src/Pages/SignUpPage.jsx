import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../css/signup.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Components/LoginButton";
export default function SignUpPage() {
  const navigate = useNavigate();
  const [cookies,setcookies] = useState('');

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    // Validate inputs and call signUp function
    if (email && confirmEmail && password && confirmPassword) {
      if (email === confirmEmail && password === confirmPassword) {
        try {
          const req = await axios.post("http://localhost:5000/signup", {
            email: email,
            pass: password,
          });
          document.cookie = `yourCookieName=${req.data}; path=/; samesite=strict; max-age=${30 * 24 * 60 * 60}; secure`;

        navigate('/');
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("Email or password mismatch");
      }
    } else {
      console.error("Please fill in all the fields");
    }
  };
  useEffect(() => {
    setcookies(checkCookie('yourCookieName'));
  console.log(cookies)
    // Optional cleanup code if needed
    return () => {
      // Cleanup code here
    };
  }, []);
  function checkCookie(name) {
    // Get all cookies from document.cookie and split into an array
    const cookies = document.cookie.split('; ');
  
    // Iterate over the array of cookies
    for (const cookie of cookies) {
      // Split the cookie into name and value
      const [cookieName, cookieValue] = cookie.split('=');
  
      // Trim any leading or trailing spaces
      const trimmedCookieName = cookieName.trim();
  
      // Check if the current cookie matches the specified name
      if (trimmedCookieName === name) {
        return true; // Cookie found
      }
    }
  
    return false; // Cookie not found
  }
  
  return (<>
  {!cookies &&
    <div className="wholepageA">
      <div className="headerA">
        <img
          src={logo}
          alt="Logo"

        />
      </div>
      <div className="titleA">
        <div className="signupA">Sign Up</div>
        <div className="signbA">Already have an account? Log in </div>
      </div>
      <div className="loginboxA">
        <div className="emailA">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Confirm Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <input
            placeholder="Choose a password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleSignUp}
          >
            Sign up
          </button>
        </div>
   <LoginButton />
      </div>
    </div>}
    </>
  );
}
