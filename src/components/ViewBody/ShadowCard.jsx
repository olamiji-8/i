import React from 'react'

function ShadowCard({ children }) {
  return (
    <div style={{
      width: '100%',
      background: '#FFFFFF',
      boxShadow: "0px 1px 7px rgba(222, 222, 222, 0.54)",
      borderRadius: "10px",

    }}>
      {children}
    </div>
  )
}
export default ShadowCard
