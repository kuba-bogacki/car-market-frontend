import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CAR_LOGO from "../page-images/Car.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function NavbarComponent() {

  const navigate = useNavigate();

  const [shouldRedirectToBuyCar, setShouldRedirectToBuyCar] = useState(false);
  const [shouldRedirectToSellCar, setShouldRedirectToSellCar] = useState(false);
  const [shouldRedirectToShowArticles, setShouldRedirectToShowArticles] = useState(false);

  useEffect(() => {
    if (shouldRedirectToBuyCar) {
      navigate('/buy-car');
    }
    if (shouldRedirectToSellCar) {
      navigate('/sell-car');
    }
    if (shouldRedirectToShowArticles) {
      navigate('/articles')
    }
  });

  const buyCar = () => {
    setShouldRedirectToBuyCar(true);
    setShouldRedirectToSellCar(false);
    setShouldRedirectToShowArticles(false);
  }

  const sellCar = () => {
    setShouldRedirectToBuyCar(false);
    setShouldRedirectToSellCar(true);
    setShouldRedirectToShowArticles(false);
  }

  const showArticles = () => {
    setShouldRedirectToBuyCar(false);
    setShouldRedirectToSellCar(false);
    setShouldRedirectToShowArticles(true);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="navbar-menu">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <a href="/"><img src={CAR_LOGO} width="40px" height="40px" alt="car-icon"/></a>
            </IconButton>
              <Button variant="contained" sx={{ mr: 0.02 }} onClick={buyCar}>Buy</Button>&nbsp;
              <Button variant="contained" sx={{ mr: 0.02 }} onClick={sellCar}>Sell</Button>&nbsp;
              <Button variant="contained" sx={{ mr: 0.02 }} onClick={showArticles}>News</Button>&nbsp;
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavbarComponent