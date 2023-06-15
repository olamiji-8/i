import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import './Topmenu.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { Divider, IconButton } from '@mui/material';
import { BiMenuAltLeft } from 'react-icons/bi';
import { Link as ScrollLink } from 'react-scroll'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },

});

export default function SidebarHome({ iconColor }) {



  // useEffect(() => {
  //  console.log(window.location)
  // }, []);

  const navigation = useNavigate()
  let location = useLocation()


  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <List style={{ padding: "30px 10px", display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ListItem>
          <ListItemText>
            <ScrollLink
              onClick={toggleDrawer(anchor, false)}
              activeClass="linksContLinkActive"
              className="linksContLink"
              spy
              to="containered">
              Home
            </ScrollLink>
          </ListItemText>
        </ListItem>


        {/*
        <ListItem>
          <ListItemText>
            <ScrollLink
            onClick={toggleDrawer(anchor, false)}
              activeClass="linksContLinkActive"
              className="linksContLink"
              spy
              to="containered">
                Home
            </ScrollLink>
          </ListItemText>
        </ListItem> */}



        <ListItem>
          <ListItemText>
            <ScrollLink
              onClick={toggleDrawer(anchor, false)}
              activeClass="linksContLinkActive"
              className="linksContLink"
              spy
              to="howitworksmobile">
              How It Work
            </ScrollLink>
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>
            <ScrollLink
              onClick={toggleDrawer(anchor, false)}
              activeClass="linksContLinkActive"
              className="linksContLink"
              spy
              to="pricing">
              Pricing
            </ScrollLink>
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>
            <ScrollLink
              onClick={toggleDrawer(anchor, false)}
              activeClass="linksContLinkActive"
              className="linksContLink"
              spy
              to="faq">
              FAQ
            </ScrollLink>
          </ListItemText>
        </ListItem>

        <Divider />

        <ListItem onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}>
          <ListItemText
            onClick={() => navigation('/memorials')}
            className={location.pathname === "/memorials" ? 'linksContLinkActive' : "linksContLink"}>Memorials</ListItemText>
        </ListItem>

        <ListItem onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}>
          <ListItemText
            onClick={() => navigation("/about-us")}
            className={location.pathname === "/about-us" ? 'linksContLinkActive' : "linksContLink"}>About us</ListItemText>
        </ListItem>

        <ListItem onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}>
          <ListItemText
            onClick={() => navigation("/contact-us")}
            className={location.pathname === "/contact-us" ? 'linksContLinkActive' : "linksContLink"}>Contact us</ListItemText>
        </ListItem>

      </List>
    </div>
  );

  return (
    <>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className='sideBarDrawer'>
            {/* <IconButton onClick={toggleDrawer(anchor, true)} aria-label="menu" size="small"> */}
            <BiMenuAltLeft onClick={toggleDrawer(anchor, true)} size={36} color={iconColor} />
            {/* </IconButton> */}
          </div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
