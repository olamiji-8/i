import React from 'react';
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


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },

});

export default function Sidebar({ iconColor }) {

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
                <ListItem
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}>
                    <ListItemText
                        onClick={() => navigation('/')}
                        // className={location.pathname === "/" ? 'linksContLinkActive' : "linksContLink"}
                    >Home</ListItemText>
                </ListItem>

                <ListItem onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}>
                    <ListItemText
                        onClick={() => navigation('/')}
                        className="linksContLink">
                        How it works
                    </ListItemText>
                </ListItem>

                <ListItem onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}>
                    <ListItemText
                        onClick={() => navigation('/')}
                        className="linksContLink">
                        Pricing
                    </ListItemText>
                </ListItem>

                <ListItem onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}>
                    <ListItemText
                        onClick={() => navigation('/')}
                        className="linksContLink">Faq</ListItemText>
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
        <div>
            {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
                <div className='sideBarDrawer'>
                    {/* <IconButton onClick={toggleDrawer(anchor, true)} aria-label="menu" size="small"> */}
                        <BiMenuAltLeft onClick={toggleDrawer(anchor, true)} size={36} color={iconColor}/>
                    {/* </IconButton> */}
                </div>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
                </Drawer>
            </React.Fragment>
            ))}
        </div>
    );
}
