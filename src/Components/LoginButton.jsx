
import React, {  useState } from "react";
import './lb.css';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

export default function LoginButton() {
    const navigate = useNavigate();
    const clientId =import.meta.env.VITE_GAPI_KEY_ENV;
    

    const onSuccess = async(res)=> {
      const email = (jwtDecode(res.credential)).email;
    try{  const req = await axios.post("http://localhost:3001/signupg", {
        email: email,
       
      }
      ); console.log("receadsa")} catch(error){
        console.log(error);
      }
         document.cookie = `yourCookieName=${encodeURIComponent(email)}; path=/; samesite=strict; max-age=${30 * 24 * 60 * 60}; secure`;
   
       console.log("success");
       navigate('/templates')
 
    
     }
  function onFailure(res) {
    console.log("failute", res);
  }
  const handleBClick = () => {
    // Find the GoogleLogin element and trigger a click event
    const googleLoginElement = document.querySelector('.one');
    if (googleLoginElement) {
      googleLoginElement.click();
    }
  };
  return (
    <>
    <GoogleOAuthProvider clientId={clientId}>

<div id="gloginbt">
      <GoogleLogin
      
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={false}
      />
      </div>
      </GoogleOAuthProvider>


    </>
  );
}
