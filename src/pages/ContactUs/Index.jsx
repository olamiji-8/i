import { Grid } from '@mui/material'
import React from 'react'
import ContactForm from '../../components/ContactForm'
import ContactMap from '../../components/ContactMap'
import CreateMemory from '../../components/CreateMemory/CreateMemory'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import OverLayHeader from '../../components/OverLayHeader/OverLayHeader'
import "./ContactUs.css"

function ContactUs() {
  return (
    <div>
      <Navbar mobilebgColor="" bgColor="var(--sub-main)" iconColor="white"/>
      <OverLayHeader title="CONTACT US"/>
      <div className="home_max_width">
        <Grid container spacing={4} className="container_contact">
          <Grid item xs={12} sm={6} md={7}>
            <ContactForm/>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <ContactMap/>
          </Grid>
        </Grid>
      </div>
      
      <CreateMemory/>
      <Footer/>
    </div>
  )
}

export default ContactUs