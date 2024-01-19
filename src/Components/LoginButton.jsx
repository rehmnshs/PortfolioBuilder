import { GoogleLogin } from "react-google-login";

import React, {  useState } from "react";
import './lb.css';
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
    const navigate = useNavigate();
    const clientId = import.meta.env.VITE_GAPI_KEY_ENV;

  function onSuccess(res) {
    const cookieValues = {
        uid: res.googleId,
        email: res.profileObj.email,
        
      };
      const serializedValues = JSON.stringify(cookieValues);

      document.cookie = `yourCookieName=${encodeURIComponent(serializedValues)}; path=/; samesite=strict; max-age=${30 * 24 * 60 * 60}; secure`;

    console.log("success", res);
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

    </>
  );
}
