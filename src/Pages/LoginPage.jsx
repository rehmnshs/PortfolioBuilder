import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../css/Login.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Components/LoginButton";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setcookies] = useState("");
  const navigate = useNavigate();
//
  const handleSignUp = async () => {
    // Validate inputs and call signUp function

    try {
      const req = await axios.post(
        "https://localhost:5000/signin",
        {
          email: email,
          pass: password,
        }
      );

      console.log(req.data);
      document.cookie = `yourCookieName=${
        req.data
      }; path=/; samesite=strict; max-age=${30 * 24 * 60 * 60}; secure`;

      navigate('/templates')
    } catch (error) {
      console.log(error);
    }
  };

  function checkCookie(name) {
    // Get all cookies from document.cookie and split into an array
    const cookies = document.cookie.split("; ");

    // Iterate over the array of cookies
    for (const cookie of cookies) {
      // Split the cookie into name and value
      const [cookieName, cookieValue] = cookie.split("=");

      // Trim any leading or trailing spaces
      const trimmedCookieName = cookieName.trim();

      // Check if the current cookie matches the specified name
      if (trimmedCookieName === name) {
        return true; // Cookie found
      }
    }

    return false; // Cookie not found
  }

  useEffect(() => {
    setcookies(checkCookie("yourCookieName"));
    console.log(cookies);
    return () => {
      // Cleanup code here
    };
  }, []);

  return (
    <>
      {!cookies && (
        <div className="wholepageA">
          <div className="headerA">
            <img src={logo} alt="Logo" />
          </div>
          <div className="titleA">
            <div className="signupA">Log In</div>
            <div className="signbA">
              Don't have an account?{" "}
              <span id="span234" onClick={() => navigate("/signup")}>
                Sign up
              </span>
            </div>
          </div>
          <div className="loginboxAL">
            <div className="emailB">
              <div>
                <input
                  className="inputbox"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="label" >
                  Email
                </label>
              </div>
              <div>
                <input
                  className="inputbox"
                  placeholder=""
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label" >
                  Password
                </label>
              </div>
              <button
                type="button"
                className="asss"
                id="aaSs"
                onClick={handleSignUp}
              >
                Log In
              </button>
            </div>
            <LoginButton />
          </div>
          <div id="paradown">
            {" "}
            <div>
              This site is protected by reCAPTCHA Enterprise. Google's Privacy
              Policy and Terms of Service
            </div>
            <div>apply.</div>
          </div>
        </div>
      )}
    </>
  );
}
