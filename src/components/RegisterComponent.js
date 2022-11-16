import {LinearProgress, Modal, styled, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import AuthService from "../service/AuthenticationService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import "../styles/RegisterComponentStyle.css"

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

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'green',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

function RegisterComponent() {

  const navigate = useNavigate();
  const inputStyle = {backgroundColor: '#F8F8F8', borderColor: 'black', textAlign: 'center'};

  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerExist, setCustomerExist] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    let customer = {customerFirstName, customerLastName, customerEmail, customerPassword};
    AuthService.register(customer)
      .then(() => {
        setLoading(false);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        openModal();
        setLoading(false);
        setCustomerEmail("");
      })
  };

  const openModal = () => {
    setCustomerExist(true);
  }

  const closeModal = () => {
    setCustomerExist(false);
  }

  return (
    <div className="register-page-div-class">
      <div className="column">
        <div className="register-header">
          <h1>Register</h1>
        </div>
        <div className="register-body">
          <CssTextField required onChange={(e) => {setCustomerFirstName(e.target.value)}} id="outlined-first-name-input"
            label="First name" type="text" autoComplete="current-first-name"
            style={inputStyle} className="login-input"/>
          <CssTextField required onChange={(e) => {setCustomerLastName(e.target.value)}} id="outlined-last-name-input"
            label="Last name" type="text" autoComplete="current-last-name"
            style={inputStyle} className="login-input"/>
          <CssTextField required onChange={(e) => {setCustomerEmail(e.target.value)}} id="outlined-email-input"
            label="E-mail" type="email" autoComplete="current-email"
            style={inputStyle} className="login-input"/>
          <CssTextField required onChange={(e) => {setCustomerPassword(e.target.value)}} id="outlined-password-input"
            label="Password" type="password" autoComplete="password"
            style={inputStyle} className="login-input"/>
          {loading ? (
            <Box><LinearProgress color="success"/></Box>) : (<Button color="success" variant="contained" onClick={handleRegister}>Register me</Button>
          )}
        </div>
      </div>
      {customerExist &&
        <Modal open={() => {openModal()}} onClose={() => {closeModal()}}
          aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Customer exist
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Customer with this e-mail address already exist in our service.
            </Typography>
          </Box>
        </Modal>}
    </div>
  );
}

export default RegisterComponent