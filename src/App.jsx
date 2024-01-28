import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import logo from "../src/assets/logo.png";
import pic1 from "../src/assets/p1.png";
import pic2 from "../src/assets/p2.png";
import pic3 from "../src/assets/p3.png";
import pic4 from "../src/assets/p4.png";
import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

import "./App.css";


function App() {

  const [uid,setuid] = useState('');
  const navigate = useNavigate();
  function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [name, encodedValue] = cookie.split("=");

      if (name === cookieName) {
        const decodedValue = decodeURIComponent(encodedValue);

        try {
          // Try to parse the cookie value as JSON
          return JSON.parse(decodedValue);
        } catch (error) {
          // If parsing fails, return the original value
          return decodedValue;
        }
      }
    }

    return null; // Return null if the cookie with the specified name is not found
  }

  function deleteAllCookies(cookieName) {
    googleLogout();

    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [name] = cookie.split("=");

      if (name === cookieName) {
        // Expire the cookie by setting its expiration date to a date in the past
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }

    window.location.reload();
  }
  function displayAllCookies() {
    const allCookies = document.cookie;
  
    if (allCookies) {
      const cookiesArray = allCookies.split('; ');
  
      cookiesArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        console.log(`${name}: ${decodeURIComponent(value)}`);
      });
    } else {
      console.log('No cookies found.');
    }
  }
  
  // Call the function to display all cookies
  
  useEffect(() => {
    setuid(getCookie("yourCookieName"));
    console.log(uid);
    console.log(encodeURIComponent(base64_encode(uid)));



  }, []);
  

  return (
    <>
      <div className="wholepage">
        <div className="header">
          <div className="headerContents">
            <img src={logo} />
            {uid && <div onClick={()=>{navigate('/dashboard')}}>Dashboard</div>}
          </div>{" "}
          {!uid && (
            <div className="authOptions">
              <a
                className="login"
                href=""
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In{" "}
              </a>
              <div
                
                class=""
                
                id="signup"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Get Started
              </div>
            </div>
          )}
          {uid && (
            <div className="accountcenter">
              <div className="emailname">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="grey"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                </svg>
                <div className="emailtext">{uid} </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  deleteAllCookies("yourCookieName");
                }}
                className="svgdown"
                height="24"
                fill="grey"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
            </div>
          )}
        </div>
        <div className="headerr">
          <div>Pick the Website Template You Love</div>
          <div className="searchbar">
            <input class="input-elevated" type="text" placeholder="Search" />
          </div>
        </div>
        <div className="showcase">
          <div className="awt">All Website Templates</div>
          <div className="showcases">
           {/* <div className="simgo">
              <div className="headerofoverlay">
                <img className="simg" src={pic1} />
                <div className="overlay"></div>
              </div>
              <div className="btfulls">
                <a
                  href={
                    uid
                      ? `https://developer-portfolio-editable.onrender.com/?id=${encodeURIComponent(base64_encode(uid))}`

                      : "http://localhost:5173/login"
                  }
                  target="_blank"
                >
                  {" "}
                  <button type="button"id="aas1">
                    Edit
                  </button>
                </a>
                <a
                  href="https://mohan-test-15-portfolio-2.onrender.com/"
                  target="_blank"
                >
                  {" "}
                  <button type="button"id="aas">
                    View
                  </button>{" "}
                </a>
              </div>
              <div className="textdown">Developer portfolio</div>
            </div> */}
            <div className="simgo">
              <div className="headerofoverlay">
                <img className="simg" src={pic2} />
                <div className="overlay"></div>
              </div>
              <div className="btfulls">
                <a
                  href={
                    uid
                      ? `https://photography1-portfolio-editable.onrender.com/?id=${encodeURIComponent(base64_encode(uid))}`
                      : "http://localhost:5173/login"
                  }
                  target="_blank"
                >
                  {" "}
                  <button type="button"id="aas1">
                    Edit
                  </button>
                </a>
                <a
                  href='https://jayanth-kpv-portfolio-1.onrender.com/'
                  target="_blank"
                >
                  {" "}
                  <button type="button"id="aas">
                    View
                  </button>{" "}
                </a>
              </div>
              <div className="textdown">Photographer portfolio</div>
            </div>
            {/*
            <div className="simgo">
              <div className="headerofoverlay">
                <img className="simg" src={pic4} />
                <div className="overlay"></div>
              </div>{" "}
              <div className="btfulls">
                <a
                  href={
                    uid
                      ? `https://design-portfolio-editable.onrender.com/?id=${encodeURIComponent(base64_encode(uid))}`

                      : "http://localhost:5173/login"
                  }
                  target="_blank"
                >
                  {" "}
                  <button type="button"id="aas1">
                    Edit
                  </button>
                </a>
                <a
                  href="https://mohan-test-15-portfolio-2.onrender.com/"
                  target="_blank"
                >
                  {" "}
                  <button type="button" id="aas">
                    View
                  </button>{" "}
                </a>
              </div>
              <div className="textdown">Designer portfolio</div>
            </div> */}
           {/* <div className="simgo">
              <div className="headerofoverlay">
                <img className="simg" src={pic3} />
                <div className="overlay"></div>
              </div>{" "}
              <div className="btfulls">
                <a
                  href={
                    uid
                      ? `https://photography2-portfolio-editable.onrender.com/?id=${base64_encode(uid)}`

                      : "http://localhost:5173/login"
                  }
                  target="_blank"
                >
                  {" "}
                  <button type="button" id="aas1">
                    Edit
                  </button>
                </a>
                <a
                  href="https://templateportfolio.onrender.com"
                  target="_blank"
                >
                  {" "}
                  <button type="button" class="viewbt" id="aas">
                    View
                  </button>{" "}
                </a>
              </div>
              <div className="textdown">Photographer portfolio</div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
