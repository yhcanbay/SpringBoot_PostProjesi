import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    navigate("/auth");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '2rem' }}>
      <AppBar 
        position="static" 
        className="navbar-glass"
        elevation={0}
      >
        <Toolbar className="navbar-toolbar">
          <div className="navbar-brand">
            <Link to="/" className="navbar-link">
              <HomeIcon className="navbar-icon" />
              <Typography variant="h6" component="span" className="navbar-title">
                Sohbet App
              </Typography>
            </Link>
          </div>

          <div className="navbar-actions">
            {currentUser ? (
              <>
                <Link to={`/users/${currentUser}`} className="navbar-link profile-link">
                  <PersonIcon className="navbar-icon" />
                  <Typography variant="body1" component="span">
                    {userName}
                  </Typography>
                </Link>
                <IconButton 
                  className="logout-btn"
                  onClick={handleLogout}
                  aria-label="logout"
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <Link to="/auth" className="navbar-link auth-link">
                <Typography variant="body1" component="span">
                  Giriş Yap / Kayıt Ol
                </Typography>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;