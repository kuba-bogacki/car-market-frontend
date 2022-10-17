import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import CAR_LOGO from "../page-images/Car.png";
import {useNavigate} from "react-router-dom";

function NavbarComponent() {

  const navigate = useNavigate();

  const buyCar = () => {
    navigate('/buy-car');
  }

  const sellCar = () => {
    navigate('/sell-car');
  }

  const showArticles = () => {
    navigate('/articles');
  }

  const loginPage = () => {
    navigate('/login')
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="navbar-menu">
            <div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <a href="/"><img src={CAR_LOGO} width="40px" height="40px" alt="car-icon" className="logo-rotate"/></a>
              </IconButton>
              <Button variant="contained" sx={{ mr: 0.02 }} onClick={buyCar}>Buy</Button>&nbsp;
              <Button variant="contained" sx={{ mr: 0.02 }} onClick={sellCar}>Sell</Button>&nbsp;
              <Button variant="contained" sx={{ mr: 0.02 }} onClick={showArticles}>News</Button>&nbsp;
            </div>
            <div className="right-margin">
              <LoginIcon className="right-margin" onClick={loginPage}/>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavbarComponent