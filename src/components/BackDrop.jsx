import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Ctblogo from "../assets/Ctblogo.png";
import './BackDrop.css'


export default function BackDrop({open}) {

  return (
    <div>
      <Backdrop
        className='backdrop_bg'
        sx={{ color: 'var(--main)',backgroundColor:'whitesmoke', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {/* <CircularProgress color="inherit" size={60} thickness={4}/> */}
         <div className="loaderWrapper">
            <div className="spinners">
               <div className='insideSpinner'>
                <img src={Ctblogo} alt="ctb logo"/>
                </div> 
            </div>
         </div>
      </Backdrop>
    </div>
  );
}
