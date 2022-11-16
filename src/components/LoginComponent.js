import {LinearProgress, Modal, styled, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AuthService from "../service/AuthenticationService";
import "../styles/LoginComponentStyle.css"

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

function LoginComponent() {

  const navigate = useNavigate();
  const inputStyle = {backgroundColor: '#F8F8F8', borderColor: 'black', textAlign: 'center'};

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [loading, setLoading] = useState(false);

  const directToRegistration = () => {
    navigate('/registration');
  }

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);

    AuthService.login(userEmail, userPassword)
      .then(() => {
        setLoading(false);
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        openModal();
        setLoading(false);
      })
  }

  const openModal = () => {
    setWrongCredentials(true);
  }

  const closeModal = () => {
    setWrongCredentials(false);
  }

  return (
    <div className="login-page-div-class">
      <div className="column">
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <div className="login-body">
          <CssTextField required onChange={(e) => {setUserEmail(e.target.value)}} id="outlined-email-input" label="E-mail"
            type="email" autoComplete="current-email" style={inputStyle} className="login-input"/>
          <CssTextField required onChange={(e) => {setUserPassword(e.target.value)}} id="outlined-password-input" label="Password"
            type="password" autoComplete="password" style={inputStyle} className="login-input"/>
          {loading ? (
            <Box><LinearProgress color="success"/></Box>) : (<Button color="success" variant="contained" onClick={loginUser}>Login</Button>
          )}
          <h4>Don’t have an account?</h4>
          <Button color="success" variant="contained" onClick={directToRegistration}>Sign up</Button>
        </div>
      </div>
      {wrongCredentials &&
        <Modal open={() => {openModal()}} onClose={() => {closeModal()}}
          aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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