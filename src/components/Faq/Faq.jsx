import React from 'react'
import "./Faq.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {IoChevronDown} from 'react-icons/io5'

function Faq() {
  return (
    <div className='faq_container' id='faq' >
      <div className="home_max_width">
        <div className="faq_body">
          <div className="faq_head">
            <h1>Frequently Asked Questions?</h1>
            <p>Have any question?</p>
          </div>
          <div className='accord_body'>
            <Accords 
              question="How can i create an online memorial?" 
              answer="Click on the signup button at the top right of the page, create an account, log in to your personalized dashboard and create free, yearly, or lifetime memorials."
            />
            <Accords 
              question="What are your subscription plans in Nigeria?" 
              answer="We have freemium, yearly, and lifetime subscription plans for our Nigerian-based users."
            />
            <Accords 
              question="What are your subscription plans in Australia?" 
              answer="We have three months, six months, 1 year, and two years subscription plans for our Australian-based users."
            />
           <Accords 
              question="Does the price cover all memorials created?" 
              answer="No, each memorial created would be based on the subscription plan selected for that particular memorial."
            />
            <Accords 
              question="Are your payment processors PCI-DSS compliant?" 
              answer="Yes, we currently use Paystack to process payments, subsequently, more options will be added."
            />
            <Accords 
              question="What is the name of the parent company?" 
              answer="Createtribute is an indigenous product of Codefixbug limited, a software company located in Nigeria"
            />
             <Accords 
              question="Can I make my memorials private for only family and friends?" 
              answer="Yes,  when creating a memorial, you can make it either public or private, when a memorial is private, it won't be displayed on our memorial page, however, you can only share the link to the memorials with only family and friends."
            />
             <Accords 
              question="How can I share memorials on social media?" 
              answer="Sharing a memorial on social media is easy, each memorial has a social share icon which makes it easy for you to share your memorial or various social media platforms."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq

const Accords = ({question, answer}) => (
  <Accordion sx={{
    backgroundColor:'var(--gray)', 
    color:'var(--black)',
    boxShadow: 'none',
    borderRadius: "5px",
    '& .Mui-expanded':{
      color:'var(--main)',
      backgroundColor:'var(--sub-main)',
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px",
    },
    '& .MuiAccordionDetails-root':{
      color:'var(--light-black)',
      backgroundColor:'var(--sub-main)',
      borderBottomLeftRadius: "5px",
      borderBottomRightRadius: "5px",

    }
  }}>
  <AccordionSummary 
    expandIcon={<IoChevronDown />}
    aria-controls="panel2a-content"
    id="panel2a-header"
  >
    {/* for desktop view */}
    <Typography 
      className='showDesktop'
      sx={{fontWeight:'500',
      fontSize:'25px'}}
      >
      {question}
    </Typography>

    {/* for mobile view */}
    <Typography 
      className='showMobile'
      sx={{fontWeight:'500',
        fontSize:'15px'}}
      >
      {question}
    </Typography>
  </AccordionSummary>

  <AccordionDetails  sx={{padding:'0 30px 20px 30px', }}>
    
    {/* for desktop view */}
    <Typography className='showDesktop' sx={{fontWeight:'300',fontSize:'20px', lineHeight:'40px'}}>
      {answer}
    </Typography>

    {/* for mobile view */}
    <Typography className='showMobile' sx={{fontWeight:'300',fontSize:'14px', lineHeight:'24px'}}>
      {answer}
    </Typography>
  </AccordionDetails>
</Accordion>
)