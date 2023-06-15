import React from 'react'
import './AboutUs.css'
import About from '../../assets/About.png'
import Mission from '../../assets/Mission.png'

function AboutUsCard() {
  return (
    <div className='about_container'>
      <div className="home_max_width">
        <div className="about_body">
          <div className="about_head">
            <h1>What We Do</h1>
            <p>About Create Tribute</p>
          </div>
          <div className="flexedCard">
            <div className="flexText">
              <h2>Preserving Legacies of Our Loved Ones</h2>
              <p>Each online memorial comes with features that enable family, friends, and love ones to digitally celebrate the life of their loved ones, by sharing the memories, tributes, and stories of those that have passed away. Creators of each memorial have full control over the memorials they create, some of the features include; About the departed, the life history, birth and death dates, the image, other gallery images of the deceased with members of the family, and a tribute song.</p>
              <p> Each memorial created comes with subscription packages of free, yearly, and lifetime plans, which ensures every memorial stays active for the duration selected by the user.</p>
              <p> Create Tribute is a product of Codefixbug limited, a software company located in Nigeria, its goal is to provide simplified solutions that solve problems in Nigeria, Africa, and around the world. Create Tribute is an indigenous platform, created for the greater good of preserving the legacies of people around the world.</p>
              <p> Amy Winehouse in her Back To Black song said "We only said goodbye with words", we got inspired by this to create the platform where people can come together to say goodbye to their loved ones in words, written and shared, which would bring smiles or tears to those who read the tributes and stories.</p>
            </div>
            <div className="flexImage">
              <img src={About} alt="" />
            </div>
          </div>

          <div className="flexedCardReverse">
            <div className="flexImage">
              <h2 className='showMobile'>Our Mission Statement</h2>
              <img src={Mission} alt="" />
            </div>
            <div className="flexText">
              <h2 className='showDesktop'>Our Mission Statement</h2>
              <p>Our mission is to create an online memorial website where tributes, stories, and photos from families and friends are shared. We hope you get value using createtribute.com.</p>
              <p> We consider it an honor, to serve you and your family, during a difficult time of losing a loved one</p>
              <p> Thank you for trusting us to preserve the legacies of those you love.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsCard
