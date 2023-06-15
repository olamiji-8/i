import React from 'react'
import "./Preserve.css"
import PhoneMockup from '../../assets/PhoneMockup.svg'
import PrimaryBtn from '../Buttons/PrimaryBtn'
import { useNavigate } from 'react-router-dom'

function Preserve() {

  const navigate = useNavigate();

  return (
    <div>

    <div className="preservelegacies">

      <div className="legacyimgdiv">
          <img src={PhoneMockup} alt="PhoneMockUp" className="phone-mockup" />
      </div>

      <div className="legaciescontent">
        <h1 className="legacies-title">
        Preserving Legacies of Our Loved Ones
        </h1>

        <p className="legacies-paragraph">
        Each online memorial comes with features 
        that enable family, friends, and love ones 
        to digitally celebrate the life of their loved ones, by sharing the memories, tributes, 
        and stories of those that have passed away.
         Creators of each memorial have full control 
         over the memorials they create, some of the 
         features include; About the departed, the life 
         history, birth and death dates, the image, other 
         gallery images of the deceased with members of 
         the family, and a tribute song.


        </p>

        <PrimaryBtn txtColor="#FFFFFF" 
          bg="#FF7900" hoverBG="#FF7900" br="8px" txt="Learn More About Us"  
          onClick={()=>navigate('/about-us')}
         />
      </div>


    </div>


    </div>
  )
}

export default Preserve