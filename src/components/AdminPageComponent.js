import "../styles/AdminPageComponentStyle.css";
import {Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {forwardRef, useEffect, useState} from "react";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import authHeader from "../service/AuthHeader";
import axios from "axios";
import Button from "@mui/material/Button";

const BASE_URL = "http://localhost:8080";
const listStyle = {
  width: '100%',
  maxWidth: 850,
  backgroundColor: 'gray',
  borderRadius: "5px",
  marginTop: "1rem",
  maxHeight: "30rem",
  overflow: 'auto'
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AdminPageComponent() {

  const customer = authHeader();

  const [paymentsList, setPaymentsList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState("");
  const [currentPayment, setCurrentPayment] = useState("");
  const [customerDetails, setCustomerDetails] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(false);

  useEffect(() => {
    getAllPayments();
    getAllCustomers();
  }, [currentCustomer]);

  const getAllPayments = () => {
    axios.get(BASE_URL + "/get-all-payments", {
      headers: customer
    })
      .then((response) => {
        setPaymentsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const getAllCustomers = () => {
    axios.get(BASE_URL + "/get-all-customers", {
      headers: customer
    })
      .then((response) => {
        setCustomersList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const showCustomerDetails = (customer) => {
    setCurrentCustomer(customer);
    setCustomerDetails(true);
  };

  const closeCustomerDetails = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCustomerDetails(false);
  };

  const showPaymentDetails = (payment) => {
    setCurrentPayment(payment);
    setPaymentDetails(true);
  };

  const closePaymentDetails = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPaymentDetails(false);
  };

  return (
    <div className="admin-page-outer-div">
      <h1 className="admin-page-header">Admin Configuration Page</h1>
      <div className="admin-page-inner-left-div">
        <div className="admin-page-list-div">
          <h3 className="admin-page-payment-header">Transaction List</h3>
          <List className="admin-page-list" style={listStyle}>
            {paymentsList.length === 0 ? (
              <h5>No saved transactions</h5>
            ) : (
              paymentsList.map((payment) => (
                <ListItemButton key={payment.paymentId} onClick={() => {showPaymentDetails(payment)}}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PointOfSaleIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={payment.paymentEmail + " | " + (payment.paymentAmount.toLocaleString()) + " " + payment.paymentCurrency}
                      secondary={(payment.paymentDateTime).substring(0, 10) + " | " + (payment.paymentDateTime).substring(11, 16)} />
                  </ListItem>
                </ListItemButton>
              ))
            )}
          </List>
          <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={paymentDetails} autoHideDuration={3000} onClose={closePaymentDetails}>
              <Alert onClose={closePaymentDetails} severity="success" sx={{width: '100%'}}>
                {` Payment Token: ${currentPayment.paymentToken}`}
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      </div>
      <div className="admin-page-inner-right-div">
        <div className="admin-page-list-div">
          <h3 className="admin-page-customer-header">Customer List</h3>
            <List className="admin-page-list" style={listStyle}>
              {customersList.length === 0 ? (
                <h5>No saved customers</h5>
              ) : (
                customersList.map((customer) => (
                  <ListItemButton key={customer.customerId} onClick={() => {showCustomerDetails(customer)}}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AccountCircleIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={customer.customerFirstName + " " + customer.customerLastName}
                        secondary={customer.customerEmail}/>
                    </ListItem>
                  </ListItemButton>
                ))
              )}
            </List>
            <Stack spacing={2} sx={{width: '100%'}}>
              <Snackbar open={customerDetails} autoHideDuration={3000} onClose={closeCustomerDetails}>
                <Alert onClose={closeCustomerDetails} severity="success" sx={{width: '100%'}}>
                  {` Customer Id: ${currentCustomer.customerId},`}
                  {` Owner of ${currentCustomer === "" ? ("0") : (currentCustomer.customerCarsList.length)} cars,`}
                  {` Role: ${currentCustomer === "" ? ("User") : ((currentCustomer.authorities[0].authority).substring(5, 6) + 
                      (currentCustomer.authorities[0].authority).substring(6).toLowerCase())}`}
                </Alert>
              </Snackbar>
            </Stack>
        </div>
      </div>
    </div>
  );
}

export default AdminPageComponent;