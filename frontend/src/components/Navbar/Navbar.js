import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {

  const styles = {
    home : {
      flexGrow: 1,
      textAlign: 'left'
    },
    title : {
      textDecoration: 'none',
      color: 'white',
      boxShadow: 'none',
      textAlign: 'right'
    },
    appBar : {
      backgroundColor : "#139A43"
    }
  }

    let pathname = "/users/" + localStorage.getItem("currentUser");

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon /> 
          </IconButton>*/}
          <Typography style={styles.home} variant="h6" component="div">
            <Link style={styles.title} to="/">Home</Link>
          </Typography>
          <Typography variant="h6" component="div">
            {localStorage.getItem("currentUser") != null ?
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <LogoutIcon style={{cursor: 'pointer'}} onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("currentUser");
                localStorage.removeItem("userName");
                window.location.reload();
              }}/>
              <Link style={styles.title} to={pathname}>Profile</Link>
              </div>
              :
              <Link style={styles.title} to="/auth">Login/Register</Link>
            }
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

  );
}

export default Navbar;