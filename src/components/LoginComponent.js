import {Modal, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

function LoginComponent() {

  const navigate = useNavigate();
  const inputStyle = {backgroundColor: '#F8F8F8', borderColor: 'black', textAlign: 'center'};

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const directToRegistration = () => {
    navigate('/registration');
  }

  const loginUser = (e) => {
    e.preventDefault();
    let userData = {userEmail, userPassword};
    console.log(userData);
    axios.post(BASE_URL + "/login-customer", userData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          navigate('/');
        } else {
          openModal();
        }
      })
  }

  const openModal = () => {
    setWrongCredentials(true);
  }

  const closeModal = () => {
    setWrongCredentials(false);
  }

  return (
    <div>
      <fieldset style={{ width: 460, height: 430, borderStyle: 'inset', textAlign: 'center' }} className="fieldset-login">
        <h1 style={{color: '#F8F8F8', borderColor: 'black'}} className="text-shadow">Login page</h1><hr/>
        <div style={{textAlign: 'center', paddingTop: '30px'}}>
          <TextField
            required onChange={(e) => {setUserEmail(e.target.value)}}
            id="outlined-email-input"
            label="E-mail"
            type="email"
            autoComplete="current-email"
            style={inputStyle}
            className="login-input"
          /><br/><br/>
          <TextField
            required onChange={(e) => {setUserPassword(e.target.value)}}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            style={inputStyle}
            className="login-input"
          />
        </div><br/>
        <Button variant="contained" onClick={loginUser}>Login</Button>
        <h4 className="text-shadow">Don’t have an account?</h4>
        <Button variant="contained" onClick={directToRegistration}>Sign up</Button>
      </fieldset>
      {wrongCredentials &&
        <Modal
          open={() => {openModal()}}
          onClose={() => {closeModal()}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Wrong credentials
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your e-mail or password is incorrect. Please try again.
            </Typography>
          </Box>
        </Modal>}
    </div>
  );
}

export default LoginComponent