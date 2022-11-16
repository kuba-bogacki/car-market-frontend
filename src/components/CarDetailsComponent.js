import {useParams} from "react-router-dom";
import {List, ListItemButton, ListItemIcon, ListItemText, Modal} from "@mui/material";
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

  const paddingStyle = {paddingTop: '4px'};

  const {carId} = useParams();
  const customer = authHeader();

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
    } else {
      checkCustomerCarsList();
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
  }

  const getCarImage = (imageName) => {
    axios.get(BASE_URL + `/get-car-image/${imageName}`, {
      headers: customer
    })
      .then((response) => {
        if(response.status === 200) {
          setCarImage(response.data);
        }
      });
  }

  const getCurrentCustomer = () => {
    axios.get(BASE_URL + `/get-current-customer`, {
      headers: customer
    })
      .then((response) => {
        if (response.status === 200) {
          setCustomerDetails(response.data);
        }
      })
  }

  const addCarToFavourite = () => {
    axios.put(BASE_URL + `/add-car-to-favourite`, carDetails, {
      headers: customer
    })
      .then((response) => {
        if(response.status === 200) {
          setModalTitle("Car saved");
          setModalBody("You add this announcement to your favourite.");
          openModal();
          setAddedToFavourite(true);
        }
      })
  }

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
      })
  }

  const checkCustomerCarsList = () => {
    let customerFavouriteCarsSet = customerDetails.customerLikes;
    for (let i = 0; i < customerFavouriteCarsSet.length; i++) {
      if (customerFavouriteCarsSet[i].carId === carDetails.carId) {
        setAddedToFavourite(true);
        break;
      }
    }
  }

  const openModal = () => {
    setModalWindowForAddedToFavourite(true);
  }

  const closeModal = () => {
    setModalWindowForAddedToFavourite(false);
  }

  const formatCarDetails = (carMileage, carType, engineType, carPrice) => {
    setFormattedCarMileage(carMileage.toLocaleString() + " M");
    setFormattedCarType(carType.slice(0, 1) + carType.slice(1).toLowerCase());
    setFormattedEngineType(engineType.slice(0, 1) + engineType.slice(1).toLowerCase());
    setFormattedCarPrice(carPrice.toLocaleString() + " $");
  }

  return (
    <div className="car-details-div">
      <h1 className="car-details-header">Car details</h1>
      <div className="details-inner-div">
        <div className="car-info-left">
          <div className="car-icons-details">
            <List dense sx={{width: '100%'}}>
              <ListItemButton>
                <ListItemIcon>
                  <EmojiTransportationIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Company"/>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <DirectionsCarIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Model"/>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonthIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Release year"/>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <SpeedIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Mileage"/>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <LocalShippingIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Type"/>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <LocalGasStationIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Engine"/>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <DangerousIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Crushed"/>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <SellIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary="Price"/>
              </ListItemButton>
            </List>
          </div>
          <div className="car-icon-parameters">
            <List dense sx={{width: '100%'}}>
              <ListItemButton style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={carDetails.carCompany}/>
              </ListItemButton>
              <ListItemButton style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={carDetails.carModel}/>
              </ListItemButton>
              <ListItemButton style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={carDetails.carReleaseYear}/>
              </ListItemButton>
              <ListItemButton style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={formattedCarMileage}/>
              </ListItemButton>
              <ListItemButton style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={formattedCarType}/>
              </ListItemButton>
              <ListItemButton style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={formattedEngineType}/>
              </ListItemButton>
              <ListItemButton style={paddingStyle}>
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={(carDetails.carCrushed === false) ? "No" : "Yes"}/>
              </ListItemButton>
              <ListItemButton style={paddingStyle}>
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
            <img src={"data:image/png;base64," + carImage} className="car-photo-inner" alt="car-image"/>
          </div>
          <div className="submit-button-div">
            {addedToFavourite ? (
              <Button color="error" variant="contained" style={{marginRight: "15px"}} onClick={removeCarFromFavourite}>
                Remove from favourite
              </Button>
            ) : (
              <Button color="primary" variant="contained" style={{marginRight: "15px"}} onClick={addCarToFavourite}>
                Add to favourite
              </Button>
            )}
            <Button color="success" variant="contained">Buy now</Button>
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
    </div>
  );
}

export default CarDetailsComponent