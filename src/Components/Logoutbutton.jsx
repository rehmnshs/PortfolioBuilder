import React from 'react'
import { GoogleLogin, GoogleLogout} from 'react-google-login';


export default function Logoutbutton() {
    const clientId =import.meta.env.VITE_GAPI_KEY_ENV;

    function onSuccess(res){
        console.log('log out success')
        
    }
  return (
<div id='signOutButton'>
        <GoogleLogout 
         className='glogout'
        clientId={clientId}
        buttonText='Logout'
        onLogoutSuccess={onSuccess}


        />
    </div>  )
}
