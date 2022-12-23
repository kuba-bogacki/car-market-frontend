import {useNavigate, useParams} from "react-router-dom";
import {CircularProgress, List, ListItemButton, ListItemIcon, ListItemText, Modal} from "@mui/material";
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DangerousIcon from '@mui/icons-material/Dangerous';
import SellIcon from '@mui/icons-material/Sell';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import authHeader from "../service/AuthHeader";
import "../styles/CarDetailsComponentStyle.css"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeysService from "../service/KeysService";
import Stripe from "react-stripe-checkout";
import CAR_LOGO from "../page-images/Car-logo.png";

const BASE_URL = "http://localhost:8080";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CarDetailsComponent() {

  const paddingStyle = {paddingTop: '4px', opacity: "100%"};

  const {carId} = useParams();
  const customer = authHeader();
  const navigate = useNavigate();

  const [carDetails, setCarDetails] = useState("");
  const [formattedCarMileage, setFormattedCarMileage] = useState("");
  const [formattedCarType, setFormattedCarType] = useState("");
  const [formattedEngineType, setFormattedEngineType] = useState("");
  const [formattedCarPrice, setFormattedCarPrice] = useState("");
  const [carLoaded, setCarLoaded] = useState(false);
  const [carImage, setCarImage] = useState(null);
  const [addedToFavourite, setAddedToFavourite] = useState(false);
  const [modalWindowForAddedToFavourite, setModalWindowForAddedToFavourite] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [lockForLoading, setLockForLoading] = useState(false);

  useEffect(() => {
    if(carLoaded === false) {
      getCarDetails();
    }
    if(carDetails !== "") {
      formatCarDetails(carDetails.carMileage, carDetails.carType, carDetails.engineType, carDetails.carPrice);
      getCarImage(carDetails.carImage);
    }
    if(customerDetails === "") {
      getCurrentCustomer();
    }
  });

  const getCarDetails = () => {
    axios.get(BASE_URL + `/get-car/${carId}`, {
      headers: customer
    })
      .then((response) => {
        if(response.status === 200) {
          setCarDetails(response.data);
          setCarLoaded(true);
        }
      });
  };

  const getCarImage = (imageName) => {
    axios.get(BASE_URL + `/get-car-image/${imageName}`, {
      headers: customer
    })
      .then((response) => {
        if(response.status === 200) {
          setCarImage(response.data);
        }
      });
  };

  const getCurrentCustomer = () => {
    if (customer !== null) {
      axios.get(BASE_URL + `/get-current-customer`, {
        headers: customer
      })
        .then((response) => {
          if (response.status === 200) {
            setCustomerDetails(response.data);
            checkCustomerCarsList(response.data.customerLikes);
          }
        });
    }
  };

  const addCarToFavourite = () => {
    if (customer !== null) {
      axios.put(BASE_URL + `/add-car-to-favourite`, carDetails, {
        headers: customer
      })
        .then((response) => {
          if (response.status === 200) {
            setModalTitle("Car saved");
            setModalBody("You add this announcement to your favourite.");
            openModal();
            setAddedToFavourite(true);
          }
        });
    } else {
      setModalTitle("You are not logged in");
      setModalBody("If you want to follow this ad, you need to login first.");
      openModal();
    }
  };

  const removeCarFromFavourite = () => {
    axios.put(BASE_URL + `/remove-car-from-favourite`, carDetails, {
      headers: customer
    })
      .then((response) => {
        if(response.status === 200) {
          setModalTitle("Car removed");
          setModalBody("You removed this announcement successfully from your favourite.");
          openModal();
          setAddedToFavourite(false);
        }
      });
  };

  const handleToken = (token) => {
    setPaymentInProgress(true);
    setLockForLoading(true);
    let data = {
      paymentAmount : carDetails.carPrice,
      paymentToken : token.id,
      carId : carDetails.carId
    };
    axios.post(BASE_URL + "/charge-customer", data, {
      headers: customer
    })
      .then((response) => {
        if(response.status === 200) {
          setPaymentInProgress(false);
          setLockForLoading(false);
          setModalTitle("Payment success");
          setModalBody("Your payment is successfully done.");
          openModal();
        }
      })
      .catch(() => {
        setPaymentInProgress(false);
        setLockForLoading(false);
        setModalTitle("Payment success");
        setModalBody("Something went wrong, please contact with support.");
        openModal();
      });
  };

  const checkCustomerCarsList = (customerLikedCarsSet) => {
    for (let i = 0; i < customerLikedCarsSet.length; i++) {
      if (customerLikedCarsSet[i].carId === carDetails.carId) {
        setAddedToFavourite(true);
        break;
      }
    }
  };

  const openModal = () => {
    setModalWindowForAddedToFavourite(true);
  };

  const closeModal = () => {
    setModalWindowForAddedToFavourite(false);
    if (modalTitle === "You are not logged in") {
      navigate("/login");
    } else if (modalTitle === "Payment success") {
      navigate("/buy-car");
    }
  };

  const formatCarDetails = (carMileage, carType, engineType, carPrice) => {
    setFormattedCarMileage(carMileage.toLocaleString() + " M");
    setFormattedCarType(carType.slice(0, 1) + carType.slice(1).toLowerCase());
    setFormattedEngineType(engineType.slice(0, 1) + engineType.slice(1).toLowerCase());
    setFormattedCarPrice(carPrice.toLocaleString() + " $");
  };

  return (
    <div className="car-details-div">
      <h1 className="car-details-header">Car details</h1>
      <div className="details-inner-div">
        <div className="car-info-left">
          <div className="car-icons-details">
            <List dense sx={{width: '100%'}}>
              <ListItemButton disabled={true} style={{opacity: "100%"}}>
                <ListItemIcon>
                  <EmojiTransportationIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Company"/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: "100%"}}>
                <ListItemIcon>
                  <DirectionsCarIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Model"/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: "100%"}}>
                <ListItemIcon>
                  <CalendarMonthIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Release year"/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: "100%"}}>
                <ListItemIcon>
                  <SpeedIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Mileage"/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: "100%"}}>
                <ListItemIcon>
                  <LocalShippingIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Type"/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: "100%"}}>
                <ListItemIcon>
                  <LocalGasStationIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Engine"/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: "100%"}}>
                <ListItemIcon>
                  <DangerousIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Crushed"/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: "100%"}}>
                <ListItemIcon>
                  <SellIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Price"/>
              </ListItemButton>
            </List>
          </div>
          <div className="car-icon-parameters">
            <List dense sx={{width: '100%'}}>
              <ListItemButton disabled={true} style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={carDetails.carCompany}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={carDetails.carModel}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={carDetails.carReleaseYear}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={formattedCarMileage}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={formattedCarType}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={formattedEngineType}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={(carDetails.carCrushed === false) ? "No" : "Yes"}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={formattedCarPrice}/>
              </ListItemButton>
            </List>
          </div>
        </div>
        <div className="car-info-right">
          <div className="car-photo">
            <img src={"data:image/png;base64," + carImage} className="car-photo-inner" alt="car"/>
          </div>
          <div className="submit-button-div">
            {addedToFavourite ? (
              <Button color="error" variant="contained" style={{marginRight: "15px"}}
                      disabled={lockForLoading} onClick={removeCarFromFavourite}>
                Remove from favourite
              </Button>
            ) : (
              <Button color="primary" variant="contained" style={{marginRight: "15px"}}
                      disabled={lockForLoading} onClick={addCarToFavourite}>
                Add to favourite
              </Button>
            )}
            {carDetails.carSold === true ? (
              <Button className="stripe-payment" color="success" variant="contained" disabled={true}>Car sold</Button>
            ) : (
              <Stripe
                className="stripe-payment" label="Pay Now" name="Car Market" billingAddress shippingAddress
                image={CAR_LOGO} description={`Your total is ${formattedCarPrice}`} panelLabel="Pay Now" currency="USD"
                amount={parseInt(carDetails.carPrice + "00")} stripeKey={KeysService.getPublishStripeKey()} token={handleToken}
                >
              <Button className="stripe-payment" color="success" variant="contained" disabled={lockForLoading}>Buy now</Button>
            </Stripe>)}
          </div>
        </div>
      </div>
      {modalWindowForAddedToFavourite &&
        <Modal open={() => {openModal()}} onClose={() => {closeModal()}} aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalTitle}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalBody}
            </Typography>
          </Box>
        </Modal>}
      {paymentInProgress && <CircularProgress color="inherit"/>}
    </div>
  );
}

export default CarDetailsComponent