import React, { useEffect, useState } from 'react';
import './App.css'
import Routing from './route/Routing';
import $ from 'jquery'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import DashProvider from './contexts/DashboardContext/Dashboard';
import PlanContextProvider from './contexts/PlanContext/PlanContext';
import MemorialProvider from './contexts/MemorialContext/MemorialContext';
import UserSingleMemorialProvider from './contexts/MemorialContext/UserSingleMemorialContext';
import TributeProvider from './contexts/TributeContext/TributeContext';
import StoryProvider from './contexts/StoryContext/StoryContext';
import PaymentProvider from './contexts/PaymentContext/PaymentContext';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ReactGA from 'react-ga';
import { Cookies } from './components/Cookies'
import IPProvider from './contexts/GetIPAddress/NewIp';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';

const query_client = new QueryClient()

$(window).scroll(function () {
  if ($(window).scrollTop() > 10) {
    $('#navbar_container').addClass('floatingNav');
  } else {
    $('#navbar_container').removeClass('floatingNav');
  }
});
const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID


function App() {
  // const { pathname } = useLocation();

  useEffect(() => {

    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  },)

  const [state, setState] = useState(() => {
    const useCookies = localStorage.getItem('useCookies');
    return {
      actionTaken: useCookies ? true : false,
      useCookies: JSON.parse(useCookies),
    };
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <QueryClientProvider client={query_client}>
        {/* <GoogleReCaptchaProvider reCaptchaKey="6LcVFywiAAAAAAOd1IWayc7zAgu22Eh5-ZfBxcRf"  > */}
        <IPProvider>
          <PlanContextProvider>
            <MemorialProvider>
              <DashProvider>
                <UserSingleMemorialProvider>
                  <TributeProvider>
                    <StoryProvider>
                      <PaymentProvider>

                        <Routing />
                      </PaymentProvider>
                    </StoryProvider>
                  </TributeProvider>
                </UserSingleMemorialProvider>
              </DashProvider>
            </MemorialProvider>
          </PlanContextProvider>
        </IPProvider>
        {/* </GoogleReCaptchaProvider> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>

  )
}

export default App