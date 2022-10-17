import {useParams} from "react-router-dom";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
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

const BASE_URL = "http://localhost:8080";

function CarDetailsComponent() {

  const paddingStyle = {paddingTop: '4px'};

  const {carId} = useParams();
  const [carDetails, setCarDetails] = useState("");
  const [formattedCarMileage, setFormattedCarMileage] = useState("");
  const [formattedCarType, setFormattedCarType] = useState("");
  const [formattedEngineType, setFormattedEngineType] = useState("");
  const [formattedCarPrice, setFormattedCarPrice] = useState("");
  const [carLoaded, setCarLoaded] = useState(false);
  const [carImage, setCarImage] = useState(null);

  useEffect(() => {
    if(carLoaded === false) {
      getCarDetails();
    }
    if(carDetails !== "") {
      formatCarDetails(carDetails.carMileage, carDetails.carType, carDetails.engineType, carDetails.carPrice);
      getCarImage(carDetails.carImage);
    }
  });

  const getCarDetails = () => {
    axios.get(BASE_URL + `/get-car/${carId}`)
      .then((response) => {
        if(response.status === 200) {
          setCarDetails(response.data);
          setCarLoaded(true);
          console.log(carDetails);
        }
      });
  }

  const getCarImage = (imageName) => {
    axios.get(BASE_URL + `/get-car-image/${imageName}`)
      .then((response) => {
        if(response.status === 200) {
          setCarImage(response.data);
          console.log(response.data);
        }
      });
  }

  const formatCarDetails = (carMileage, carType, engineType, carPrice) => {
    setFormattedCarMileage(carMileage.toLocaleString() + " M");
    setFormattedCarType(carType.slice(0, 1) + carType.slice(1).toLowerCase());
    setFormattedEngineType(engineType.slice(0, 1) + engineType.slice(1).toLowerCase());
    setFormattedCarPrice(carPrice.toLocaleString() + " $");
  }

  return (
    <div>
      <fieldset style={{ width: 800, height: 430, borderStyle: 'inset', textAlign: 'center' }} className="fieldset-car-details">
        <h1 className="text-shadow">Car details</h1>
        <fieldset className="left" style={{ borderStyle: 'inset', borderRadius: '15px' }}>
          <span className="car-details-span">
            <List dense sx={{ width: '100%', maxWidth: 360, backgroundColor: 'cornflowerblue', color: 'white' }} component="nav"
              aria-labelledby="nested-list-subheader">
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
          </span>
          <span className="car-details-span"  style={{paddingTop: '2px'}}>
            <List dense sx={{ width: '100%', maxWidth: 360, backgroundColor: 'cornflowerblue', color: 'white' }} component="nav"
                  aria-labelledby="nested-list-subheader">
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
          </span>
        </fieldset>
        <div className="right">
          <fieldset style={{ width: 360, height: 215, borderStyle: 'inset' }} className="fieldset-car-info-inner">
            <img src={"data:image/png;base64," + carImage} width="300px" height="200px" alt="car-image"/>
          </fieldset><br/><br/><br/>
        </div>
        <Button variant="contained">Buy now</Button>
      </fieldset>
    </div>
  );
}

export default CarDetailsComponent