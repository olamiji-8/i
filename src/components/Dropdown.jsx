/* eslint-disable jsx-a11y/role-supports-aria-props */
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import groupico from "../assets/groupico.svg";

export default function Dropdown({editClick, deleteClick, hideClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{position:'relative'}}>
        <img src={groupico} alt='dots' id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size={24}
        />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{handleClose(); editClick()}}>Edit</MenuItem>
        <MenuItem onClick={()=>{handleClose(); deleteClick()}}>Delete</MenuItem>
        <MenuItem onClick={()=>{handleClose(); hideClick()}}>Hide from public</MenuItem>
      </Menu>
    </div>
  );
}