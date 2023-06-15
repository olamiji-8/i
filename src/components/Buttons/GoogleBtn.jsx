import Facebook from '../../assets/Facebook.png'
import Google from '../../assets/Google.png'

function GoogleBtn({icon, txt, onClick}) {

    return (
        <div 
         onClick={onClick}
         style={{
           display:'flex',
           alignItems:'center',
         //   width:'100%',
           cursor:'pointer',
            gap: "10px",
          //  marginRight: '10px',
           padding:'5px 10px',
           userSelect:'none',
           borderRadius: '15px',
           backgroundColor: icon ==="fb" ? '#E7E8ED' : '#EDE7E7',
           color:'#333333',
            fontWeigh:'300'
        }}>
         <img style={{width: '20px', }} className='showDesktop' src={icon ==="fb" ? Facebook : Google} alt="google" width="35px" />
         <img className='showMobile' src={icon ==="fb" ? Facebook : Google} alt="google" width="18px" />
         <span className='showDesktop' style={{fontSize:'18px',}}>{txt}</span>
         <span className='showMobile' style={{fontSize:'10px',}}>{txt}</span>
      </div>
    )
}

export default GoogleBtn
