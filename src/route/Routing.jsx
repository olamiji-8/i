import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from '../pages/AboutUs/AboutUs';
// import ContactUs from '../pages/ContactUs/ContactUs';
import Dashboard from '../pages/MainDashboard/Dashbaord';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Memorial from '../pages/Memorials/Memorials';
import ViewMemorial from '../pages/Memorials/ViewMemorial/ViewMemorial';
import SignUp from '../pages/SignUp/SignUp';
import Notfound from '../pages/NotFound/Notfound';
import CreateMemorial from '../pages/CreateMemorial';
import EditMemorial from '../pages/EditMemorial';
import ProfileForm from '../pages/MainDashboard/ProfileForm';
import ResetPassword from '../pages/MainDashboard/ResetPassword';
import ManageTribute from '../pages/MainDashboard/ManageTribute';
import ManageStories from '../pages/MainDashboard/ManageStories';
import Payment from '../pages/MainDashboard/Payment';
import ContactUs from '../pages/ContactUs/ContactUs';
import VerifyOTP from '../pages/SignUp/VerifyOTP';
import ForgetPass from '../pages/Forgetpass/ForgetPass';
import Resetpassword from '../pages/ResetPassword/Resetpassword';
import UserMemorials from '../pages/Memorials/UserMemorials';
import ProtectedRoute from './ProtectedRoute';
import UpdateSub from '../pages/EditMemorial/Update_sub';
import PreviewMemorial from '../pages/Memorials/ViewMemorial/PreviewMemorial';
import Privacy from '../pages/Privacy/Privacy';
import Terms from '../pages/TermsandCondition/Terms';
import GoogleFacebook from '../pages/MainDashboard/GoogleFacebook';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms_condition" element={<Terms />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="verify-account" element={<VerifyOTP />} />
        <Route path="memorials" element={<Memorial />} />
        <Route path="user/memorials" element={
          <ProtectedRoute>
            <UserMemorials />
          </ProtectedRoute>
        } />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="memorial/:uuid" element={<ViewMemorial />} />

        <Route path="preview_memo/:uuid" element={
          <ProtectedRoute>
            <PreviewMemorial />
          </ProtectedRoute>
        } />
        <Route path="create-memorial" element={<CreateMemorial />} />
        <Route path="edit-memorial/:slug" element={
          <ProtectedRoute>
            <EditMemorial />
          </ProtectedRoute>
        } />
        <Route path="update-subscription/:slug" element={
          <ProtectedRoute>
            <UpdateSub />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfileForm />
          </ProtectedRoute>} />
        <Route path="googlefacebook" element={
          <ProtectedRoute>
            <GoogleFacebook />
          </ProtectedRoute>} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="manage-tributes" element={
          <ProtectedRoute>
            <ManageTribute />
          </ProtectedRoute>} />
        <Route path="manage-stories" element={
          <ProtectedRoute>
            <ManageStories />
          </ProtectedRoute>} />
        <Route path="payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>} />
        <Route path="forgetpass" element={<ForgetPass />} />
        <Route path="reset" element={<Resetpassword />} />
        {/* <Route path="resetpass" element={<ResetPassword/>}/> */}
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
