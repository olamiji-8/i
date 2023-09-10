import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CookieConsent from "react-cookie-consent";
// import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}



root.render(

  <>
    <App />
    <CookieConsent
      location="bottom"
      buttonText="I Agree"
      cookieName="myAwesomeCookieName2"
      style={{ background: "#ffffff", color: '#000000', border:"2px solid #000000" }}
      buttonStyle={{ background: '#ff7900', color: "#ffffff", fontSize: "13px", borderRadius: "4px" }}

    >
      This website uses cookies to enhance the user experience.{" "}
      See our <a href='/privacy'>privacy policy</a> for more.
    </CookieConsent>

  </>



);
reportWebVitals();
