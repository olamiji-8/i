import React from 'react'
import "./Footer.css"
import { Grid, Stack } from '@mui/material';
import IconButton from '../IconButton/IconButton';
import { FaFacebookF } from 'react-icons/fa'
import { BsWhatsapp, BsTwitter } from 'react-icons/bs'
import ProductHuntBtn from '../ProductHuntBtn/ProductHuntBtn';
import { useNavigate } from "react-router-dom";

function Footer() {
  let navigate = useNavigate();
  return (
    <div className='footer_container'>
      <div className="home_max_width">
        <div className="footer_body">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} >
              <div className="footer_text">Copyright © 2022 Createtribute.com</div>
              {/* <div className="footer_links"> Powered by Codefixbug Limited</div> */}
              <a href="https://codefixbug.com/"
                    target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    <div  className="footer_links"> Powered by Codefixbug Limited</div>
                  </a>
              <div className="footer_text">All rights reserved</div>
              <Stack direction="row" spacing={2} style={{ marginTop: '40px' }}>
                {/* <IconButton bg="rgba(255,255,255,0.1)" width="32px" height="32px" icon={<GrInstagram color='white' size={18} />} onClick={()=>console.log('clicked')}/> */}

                <a href="https://wa.me/2348157853136"
                  target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
                  <IconButton bg="rgba(255,255,255,0.1)" width="32px" height="32px" icon={<BsWhatsapp color='white' size={18} />} />
                </a>
                <a href="https://twitter.com/Createtribute"
                  target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
                  <IconButton bg="rgba(255,255,255,0.1)" width="32px" height="32px" icon={<BsTwitter color='white' size={18} />} />
                </a>
                <a href="https://web.facebook.com/createtribute"
                  target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
                  <IconButton bg="rgba(255,255,255,0.1)" width="32px" height="32px" icon={<FaFacebookF color='white' size={18} />} />
                </a>

              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={8} >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={4} className="addPaddingDesktop">
                  <div onClick={() => navigate("/contact-us")} className="footer_title">Contact us</div>
                  <div className="footer_links">Address:</div>
                  <div className="footer_text">13/147 Bill Ferguson Circuit Bonner ACT 2914 Australia</div>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className="addPaddingDesktop" >
                  <div className="footer_title">Company</div>
                  <div onClick={() => navigate("/about-us")} className="footer_links">About Createtribute</div>
                  <div onClick={() => navigate("/memorials")} className="footer_links">Memorials</div>
                  {/* <div onClick={() => navigate("https://createtribute.com/blog")} className="footer_links">Blog</div> */}


                  <a href="https://createtribute.com/blog"
                    target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    <div  className="footer_links">Blog</div>
                  </a>


                  <a href = "https://www.producthunt.com/products/create-tribute?utm_source=badge-featured&utm_medium=badge#create-tribute">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=390895&theme=light%22%20alt=%22Create&#0032;Tribute%20-%20Tribute&#0032;to&#0032;a&#0032;love&#0032;one%20|%20Product%20Hunt%22%20style=%22width:%20250px;%20height:%2054px;%22%20width=%22250%22%20height=%2254" alt="" />
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className="addPaddingDesktop" >
                  <div className="footer_title">Legal</div>
                  {/* <a href="https://tributetoaloveone.com/terms&conditions"
                    target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
                    <div className="footer_links">Terms and conditions</div>
                  </a> */}
                    <div onClick={() => navigate("/terms_condition")} className="footer_links">Terms & conditions</div>
                  {/* <div className="footer_links">Legal</div> */}
                  {/* <a href="https://tributetoaloveone.com/privacypolicy"
                    target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
                    <div className="footer_links">Privacy policy</div>
                  </a> */}
                                    <div onClick={() => navigate("/privacy")} className="footer_links">Privacy & Policy</div>
                  <div className="footer_links" onClick={() => navigate("/contact-us")}>Contact us</div>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className="addPaddingDesktop showMobile" >
                  <div className="footer_title">Stay up to date</div>
                  <a href = "https://www.producthunt.com/products/create-tribute?utm_source=badge-featured&utm_medium=badge#create-tribute">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=390895&theme=light%22%20alt=%22Create&#0032;Tribute%20-%20Tribute&#0032;to&#0032;a&#0032;love&#0032;one%20|%20Product%20Hunt%22%20style=%22width:%20250px;%20height:%2054px;%22%20width=%22250%22%20height=%2254" alt="" />
                    
                    </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default Footer

