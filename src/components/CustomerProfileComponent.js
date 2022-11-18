import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../service/AuthHeader";
import "../styles/CustomerProfileComponentStyle.css"
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmailIcon from '@mui/icons-material/Email';
import {useNavigate} from "react-router-dom";

const BASE_URL = "http://localhost:8080";

function CustomerProfileComponent() {

  const navigate = useNavigate();
  const customer = authHeader();

  const [currentCustomer, setCurrentCustomer] = useState("");
  const [watchedCarList, setWatchedCarList] = useState([]);

  useEffect(() => {
    if (currentCustomer === "") {
      getCustomerInfo();
    }
  });

  const addCustomerResponse = (customerData) => {
    setCurrentCustomer(customerData);
    setWatchedCarList(customerData.customerLikes);
  }

  const getCustomerInfo = () => {
    axios.get(BASE_URL + "/get-current-customer", {
      headers: customer
    })
      .then((response) => {
        addCustomerResponse(response.data);
      })
  }

  const showCarDetails = (carId) => {
    navigate(`/show-car-details/${carId}`);
  }

  return (
    <div className="customer-profile-container">
      <h1 className="customer-profile-header">Customer profile</h1>
      <div className="customer-profile-inner-div">
        <div className="customer-profile-info-left">
          <h2 className="personal-info-header">Personal info</h2>
          <div className="customer-profile-info-details-list">
            <List dense sx={{width: '100%'}}>
              <ListItemButton disabled={true} style={{opacity: '100%'}}>
                <ListItemIcon>
                  <PersonIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={<h4>{currentCustomer.customerFirstName}</h4>}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: '100%'}}>
                <ListItemIcon>
                  <PeopleAltIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={<h4>{currentCustomer.customerLastName}</h4>}/>
              </ListItemButton>
              <ListItemButton disabled={true} style={{opacity: '100%'}}>
                <ListItemIcon>
                  <EmailIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText align="left" primary={<h4>{currentCustomer.customerEmail}</h4>}/>
              </ListItemButton>
            </List>
          </div>
        </div>
        <div className="customer-profile-info-right">
          <h2 className="cars-adds-header">Watched ads</h2>
          <div className="customer-profile-car-list-div">
            <List dense sx={{width: '100%'}}>
              {watchedCarList && watchedCarList.map((car, index) => (
                <ListItemButton key={index} onClick={() => {showCarDetails(car.carId)}}>
                  <ListItemIcon>
                    <DoubleArrowIcon fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText align="left" primary={<h4>{car.carCompany + " " + car.carModel}</h4>}/>
                </ListItemButton>
                ))}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfileComponent