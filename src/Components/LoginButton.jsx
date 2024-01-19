
import React, {  useState } from "react";
import './lb.css';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginButton() {
    const navigate = useNavigate();
    const clientId =import.meta.env.VITE_GAPI_KEY_ENV;
    

    function onSuccess(res) {
      const email = (jwtDecode(res.credential)).email;

   
         document.cookie = `yourCookieName=${encodeURIComponent(email)}; path=/; samesite=strict; max-age=${30 * 24 * 60 * 60}; secure`;
   
       console.log("success");
       navigate('/')
 
    
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

    <div className='B' onClick={handleBClick}>
        <div className='bb'></div>
      </div>
      <GoogleLogin
       className="one"
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={false}
      />
      </GoogleOAuthProvider>


    </>
  );
}
