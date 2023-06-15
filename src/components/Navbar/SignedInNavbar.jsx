import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Ctblogo from "../../assets/Ctblogo.png";
import { useNavigate } from 'react-router-dom';

import { useLocation } from "react-router-dom";
import { Local_storage } from '../../utils/LocalStorageConfig';
import { Avatar } from '@mui/material';


const SideData = [
  {
    Title: "Home",
    path: "/",
  },
  {
    Title: "Dashboard",
    path: "/dashboard",
  },
  {
    Title: "Memorials",
    path: "/user/memorials",
  },
];


const SignedInNavbar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  let navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleCloseNavMenu = (item) => {
    setAnchorElNav(null);
  };


  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#ECD348",
        color: "#181819",
        fontSize: '15px'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  let location = useLocation()
  return (
    // <ThemeProvider >
    <AppBar style={{
      backgroundColor: "#ffffff"
    }} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              onClick={() => navigate("/")}
              src={Ctblogo}
              alt="logo"
              className="logo"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            // color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {SideData?.map((page) => (
                <MenuItem key={page.Title} onClick={()=>{navigate(`${page.path}`); handleCloseNavMenu()}}>
                  <Typography textAlign="center">
                    <span style={{color: location.pathname === page.path ? "var(--main)": "black"}}>
                      {page.Title}
                    </span>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {SideData.map((page) => (
              <>
                <MenuItem
                  onClick={() => navigate(`${page.path}`) }
                  sx={{ my: 2, color: '#18191F', display: 'block' }}
                >
                  <span style={{color: location.pathname === page.path ? "var(--main)": "black"}}>
                  {page.Title}
                  </span>
                </MenuItem>
              </>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings"> */}
              <>
              <Avatar {...stringAvatar(Local_storage().get('_na_ma'))} />
              <span style={{color:'#333333', fontSize:'12px', marginLeft:'5px', fontWeight:'600'}}>{Local_storage().get('_na_ma')}</span>
              </>
            {/* </Tooltip>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
    // </ThemeProvider>
  );
};
export default SignedInNavbar;
