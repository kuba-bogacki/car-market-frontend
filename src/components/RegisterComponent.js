import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

function RegisterComponent() {

  const inputStyle = {backgroundColor: '#F8F8F8', borderColor: 'black', textAlign: 'center'};

  return (
    <div>
      <div>
        <fieldset style={{ width: 460, height: 440, borderStyle: 'inset', textAlign: 'center' }} className="fieldset-login">
          <h1 style={{color: '#F8F8F8', borderColor: 'black'}} className="text-shadow">Registration</h1><hr/>
          <div style={{textAlign: 'center', paddingTop: '30px'}}>
            <TextField
              required
              id="outlined-first-name-input"
              label="First name"
              type="text"
              autoComplete="current-first-name"
              size="small"
              style={inputStyle}
              className="login-input"
            /><br/><br/>
            <TextField
              required
              id="outlined-last-name-input"
              label="Last name"
              type="text"
              autoComplete="current-last-name"
              size="small"
              style={inputStyle}
              className="login-input"
            /><br/><br/>
            <TextField
              required
              id="outlined-email-input"
              label="E-mail"
              type="email"
              autoComplete="current-email"
              size="small"
              style={inputStyle}
              className="login-input"
            /><br/><br/>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="password"
              size="small"
              style={inputStyle}
              className="login-input"
            /><br/><br/>
          </div><br/>
          <Button variant="contained">Register me</Button>
        </fieldset>
      </div>
    </div>
  );
}

export default RegisterComponent