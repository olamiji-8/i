import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


function PrimaryBtn({type, txtColor,pd, br,fs, w, bg, hoverBG,hoverColor, txt, fw, onClick, border, className, disable}) {

   const ColorButton = styled(Button)(() => ({
    color: txtColor,
    backgroundColor: bg, 
    borderRadius:br,
    width: w,
    padding:pd,
    fontWeight:fw,
    textTransform:"none",
    fontSize:fs,
    border:`1px solid ${border}`,
    
    '&:hover': {
       background: hoverBG,
       color: hoverColor,
       
    },
  }));

    return (
        <div>
           <ColorButton className={className} type={type} disableElevation variant="contained" onClick={onClick}> {txt}</ColorButton>
        </div>
    )
}

export default PrimaryBtn
