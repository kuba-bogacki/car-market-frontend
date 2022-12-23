import {useEffect, useState} from "react";
import "../styles/CustomerProfileComponentStyle.css"
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmailIcon from '@mui/icons-material/Email';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import CustomerService from "../service/CustomerService";

function CustomerProfileComponent() {

  const navigate = useNavigate();
  const customer = CustomerService.getCustomerProfile();

  const [currentCustomer, setCurrentCustomer] = useState("");
  const [customerRole, setCustomerRole] = useState("");
  const [watchedCarList, setWatchedCarList] = useState([]);

  useEffect(() => {
    if (currentCustomer === "") {
      getCustomerInfo(customer);
    }
  }, [customer]);

  const getCustomerInfo = (data) => {
    data.then((result) => {
      setCurrentCustomer(result);
      setWatchedCarList(result.customerLikes);
      setCustomerRole(result.authorities[0].authority);
    });
  };

  const showCarDetails = (carId) => {
    navigate(`/show-car-details/${carId}`);
  };

  const showAdminPage = () => {
    navigate("/admin-page");
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
            {customerRole === "ROLE_ADMIN" &&
            <div className="admin-page-button">
              <Button color="success" variant="contained" onClick={showAdminPage}>Show admin page</Button>
            </div>}
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

export default CustomerProfileComponent;