import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CAR_LOGO from "../page-images/Car-logo.png";
import {useNavigate} from "react-router-dom";
import AuthService from "../service/AuthenticationService";
import '../styles/NavbarComponentStyle.css';

function NavbarComponent() {

  const navigate = useNavigate();
  const [currentLoggedCustomer, setCurrentLoggedCustomer] = useState(null);
  const [buttonClassName, setButtonClassName] = useState("fas fa-bars");
  const [listClassName, setListClassName] = useState("nav-menu");
  const [openMenuIcon, setOpenMenuIcon] = useState(true);

  useEffect(() => {
    setCurrentLoggedCustomer(AuthService.getCurrentUser());
  }, []);

  const changeIconClassName = () => {
    buttonClassName === "fas fa-bars" ?
      setButtonClassName("fas fa-times") : setButtonClassName("fas fa-bars");
    listClassName === "nav-menu active" ?
      setListClassName("nav-menu") : setListClassName("nav-menu active");
    openMenuIcon ? setOpenMenuIcon(false) : setOpenMenuIcon(true);
  }

  const buyCar = () => {
    navigate('/buy-car');
  }

  const sellCar = () => {
    navigate('/sell-car');
  }

  const showArticles = () => {
    navigate('/articles');
  }

  const showCustomerProfile = () => {
    navigate('/profile');
  }

  const loginPage = () => {
    navigate('/login');
  }

  const logoutPage = () => {
    AuthService.logout();
    navigate('/');
    window.location.reload();
  }

  return (
    <nav className="navbar-items">
      <h1 className="car-logo-class">
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <a href="/"><img src={CAR_LOGO} width="50px" height="50px" alt="car-icon" className="logo-rotate"/></a>
        </IconButton>Car Market
      </h1>
      <div className="menu-icons">
        <Button className={buttonClassName} variant="contained" color="success" onClick={changeIconClassName}>
          {openMenuIcon ? <MenuIcon/> : <CloseIcon/>}</Button>
      </div>
      <ul className={listClassName}>
        <li>
          <Button className="nav-links" variant="contained" color="success" onClick={buyCar}>
            <ShoppingCartIcon/>Buy</Button>
        </li>
        <li>
          <Button className="nav-links" variant="contained" color="success" onClick={sellCar}>
            <SellIcon/>Sell</Button>
        </li>
        <li>
          <Button className="nav-links" variant="contained" color="success" onClick={showArticles}>
            <ArticleIcon/>News</Button>
        </li>
      {currentLoggedCustomer &&
        <li>
          <Button className="nav-links" variant="contained" color="success" onClick={showCustomerProfile}>
            <PersonIcon/>Profile</Button>
        </li>}
        <li>
          {currentLoggedCustomer === null ? (
            <Button className="nav-links-mobile" variant="contained" color="error" onClick={loginPage}>
              <LoginIcon/>Login</Button>
          ) : (
            <Button className="nav-links-mobile" variant="contained" color="error" onClick={logoutPage}>
              <LogoutIcon/>Logout</Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent