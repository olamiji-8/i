import React from 'react'
import PrimaryBtn from '../Buttons/PrimaryBtn'
import "./Pricing.css"
import IconButton from '../IconButton/IconButton'
import { FiCheck } from 'react-icons/fi'


function PricingCard({
  shadow,
  iconColor,
  titleColor,
  subColor,
  btnColor,
  bgColor,
  bgImage,
  iconbgColor,
  badge,
  price,
  subPeriod,
  period,
  description,
  values,
  buttonClick
}) {

  return (
    <div className='price_card' style={{ backgroundColor: bgColor, backgroundImage: `url(${bgImage})`, boxShadow: shadow, position: 'relative' }}>
      {
        badge ?
          <>
            <span style={{
              marginLeft: "auto",
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: "#231D4F",
              padding: "8px 15px",
              borderRadius: "14px",
              color: 'white',
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: '0.8px',
              userSelect: 'none'
            }}>MOST POPULAR</span>
            <div style={{ height: '15px' }}></div>
          </>
          :
          null
      }
      <span className="plan_price" style={{ color: titleColor }}>
        {price}
        <span style={{ color: subColor }}>{subPeriod}</span>
      </span>
      <span className="plan_period" style={{ color: titleColor }}>{period}</span>
      <span className='plan_desc' style={{ color: subColor }} >{description}</span>
      <div className="plan_values" style={{ color: subColor }}>
        {
          values?.map((value, i) => (
            <div className="plan_value" key={i}>
              <IconButton bg={iconbgColor} width="20px" height="20px" icon={<FiCheck color={iconColor} size={17} />} />
              <span>{value}</span>
            </div>
          ))
        }
      </div>
      <PrimaryBtn
        txtColor="var(--main)"
        pd="10px"
        br="24px"
        w="100%"
        bg={btnColor}
        hoverBG="whitesmoke"
        txt="Choose plan"
        fw="700"
        fs="15px"
        onClick={buttonClick}
      />

    </div>
  )
}

export default PricingCard