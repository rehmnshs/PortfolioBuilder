import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../css/signup.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Components/LoginButton";
export default function SignUpPage() {
  const navigate = useNavigate();
  const [cookies, setcookies] = useState("");

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    // Validate inputs and call signUp function
    if (email && confirmEmail && password && confirmPassword) {
      if (email === confirmEmail && password === confirmPassword) {
        try {
          const req = await axios.post(
            "https://portfoliifybackend-tp8u.onrender.com/signup",
            {
              email: email,
              pass: password,
            }
          );
          document.cookie = `yourCookieName=${
            req.data
          }; path=/; samesite=strict; max-age=${30 * 24 * 60 * 60}; secure`;

          navigate("/");
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
    setcookies(checkCookie("yourCookieName"));
    console.log(cookies);
    // Optional cleanup code if needed
    return () => {
      // Cleanup code here
    };
  }, []);
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

  return (
    <>
      {!cookies && (
        <div className="wholepageA">
          <div className="headerA">
            <img src={logo} alt="Logo" />
          </div>
          <div className="titleA">
            <div className="signupA">Sign Up</div>
            <div className="signbA">
              Already have an account?{" "}
              <span
                id="span234"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </span>
            </div>
          </div>
          <div className="loginboxA">
            <div className="emailA">
              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                />
                <label className="label">Email</label>
              </div>
              <div>
                <input
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder=""
                />
                <label className="label">Password</label>
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">Choose a password</label>
              </div>
              <div>
                <input
                  type="password"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label className="label">Confirm password</label>
              </div>
              <button type="button" id="aaSs" onClick={handleSignUp}>
                Sign up
              </button>
            </div>
            <LoginButton />
          </div>
          <div id="paradown">
            {" "}
            <div>
              *By signing up, you agree to our Terms of Use and acknowledge
              you’ve read our Privacy Policy
            </div>
            <div>
              This site is protected by reCAPTCHA Enterprise. Google's Privacy
              Policy and Terms of Service apply.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
