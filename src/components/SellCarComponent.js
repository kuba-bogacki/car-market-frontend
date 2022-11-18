import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  styled,
  TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import * as PropTypes from "prop-types";
import {useState} from "react";
import DEFAULT_CAR from "../page-images/Default_car.png";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import authHeader from "../service/AuthHeader";
import "../styles/SellCarComponentStyle.css";
import {useNavigate} from "react-router-dom";

const BASE_URL = "http://localhost:8080";

function MyFormControlLabel(props) {
  return null;
}

MyFormControlLabel.propTypes = {
  control: PropTypes.element,
  label: PropTypes.string,
  value: PropTypes.string
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

const radioSize = {'& .MuiSvgIcon-root': {fontSize: 10}, textAlign: "left"};
const cltField = {backgroundColor: '#F8F8F8', borderRadius: '4px', textAlign: "left"};
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

function SellCarComponent() {

  const customer = authHeader();
  const navigate = useNavigate();

  const [modalWindow, setModalWindow] = useState(false);
  const [carCompany, setCarCompany] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carReleaseYear, setCarReleaseYear] = useState("");
  const [carMileage, setCarMileage] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carType, setCarType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [crushed, setCrushed] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [carPhoto, setCarPhoto] = useState(DEFAULT_CAR);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const fileSelectedHandler = (e) => {
    setCarPhoto(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (selectedFile) => {
    let formData = new FormData();

    formData.append('loadedImage', selectedFile);
    formData.append('carCompany', carCompany);
    formData.append('carModel', carModel);
    formData.append('carReleaseYear', carReleaseYear);
    formData.append('carMileage', carMileage);
    formData.append('carPrice', carPrice);
    formData.append('carType', carType);
    formData.append('engineType', engineType);
    formData.append('crushed', crushed);

    if(customer === null) {
      setModalTitle("You are not logged in");
      setModalBody("If you want to sell a car, you need to login first.");
      openModal();
    } else {
      axios.post(BASE_URL + "/add-new-car", formData, {
        headers: customer
      })
        .then((response) => {
          setModalTitle("Ad successfully saved");
          setModalBody("Your car was successfully added to list");
          openModal();
        });
    }
  }

  const openModal = () => {
    setModalWindow(true);
  }

  const closeModal = () => {
    setModalWindow(false);
    if (modalTitle === "You are not logged in") {
      navigate("/login");
    } else if (modalTitle === "Ad successfully saved") {
      navigate("/buy-car");
    }
  }

  return (
    <div className="sell-car-div">
      <h1 className="sell-car-header">Sell your car</h1>
      <div className="sell-car-inner-div">
        <div className="sell-car-info-left">
          <div className="sell-car-first-details">
            <CssTextField id="car-company" label="Company" variant="outlined" size="small" placeholder="E.g. Ford"
                       style={cltField} onChange={(e) => setCarCompany(e.target.value)}/>
            <CssTextField id="car-release-year" label="Release Year" variant="outlined" size="small" placeholder="YYYY"
                       style={cltField} onChange={(e) => setCarReleaseYear(e.target.value)}/>
            <CssTextField id="car-price" label="Price" variant="outlined" placeholder="$" size="small"
                       style={cltField} onChange={(e) => setCarPrice(e.target.value)}/>
          </div>
          <div className="sell-car-second-details">
            <CssTextField id="car-model" label="Model" variant="outlined" size="small" placeholder="E.g. Mustang"
                       style={cltField} onChange={(e) => setCarModel(e.target.value)}/>
            <CssTextField id="car-mileage" label="Mileage" variant="outlined" size="small" placeholder="Miles"
                       style={cltField} onChange={(e) => setCarMileage(e.target.value)}/>
          </div>
          <div className="sell-car-third-details">
            <Accordion style={cltField}>
              <AccordionSummary expandIcon={<ArrowDownwardIcon/>} aria-controls="panel1a-content" id="car-type-accordion">
                <Typography>Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <RadioGroup aria-labelledby="car-type-radio-group" name="car-type-radio-group"
                              onChange={(e) => setCarType(e.target.value)}>
                    <FormControlLabel value="sedan" control={<Radio sx={radioSize} color="success"/>} label="Sedan"/>
                    <FormControlLabel value="suv" control={<Radio sx={radioSize} color="success"/>} label="Suv"/>
                    <FormControlLabel value="coupe" control={<Radio sx={radioSize} color="success"/>} label="Coupe"/>
                    <FormControlLabel value="other" control={<Radio sx={radioSize} color="success"/>} label="Other"/>
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion><hr/>
            <Accordion style={cltField}>
              <AccordionSummary expandIcon={<ArrowDownwardIcon/>} aria-controls="panel1a-content" id="engine-type-accordion">
                <Typography>Engine Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <RadioGroup aria-labelledby="engine-type-radio-group" name="engine-type-radio-group"
                              onChange={(e) => setEngineType(e.target.value)}>
                    <FormControlLabel value="electric" control={<Radio sx={radioSize} color="success"/>} label="Electric" />
                    <FormControlLabel value="diesel" control={<Radio sx={radioSize} color="success"/>} label="Diesel" />
                    <FormControlLabel value="gas" control={<Radio sx={radioSize} color="success"/>} label="Gas" />
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion><hr/>
            <Accordion style={cltField}>
              <AccordionSummary expandIcon={<ArrowDownwardIcon/>} aria-controls="panel1a-content" id="crushed-accordion">
                <Typography>Crushed</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <RadioGroup aria-labelledby="crushed-radio-group" name="crushed-radio-group"
                              onChange={(e) => setCrushed(e.target.value)}>
                    <FormControlLabel value="true" control={<Radio sx={radioSize} color="success"/>} label="Yes" />
                    <FormControlLabel value="false" control={<Radio sx={radioSize} color="success"/>} label="No" />
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="sell-car-info-right">
          <div className="sell-car-photo">
            <img src={carPhoto} className="car-photo-inner" alt="default-car"/><br/><br/>
            <input id="input-file" type="file" name="file" placeholder="Upload an image"
                   onChange={(e) => fileSelectedHandler(e)}/>
            <Button variant="outlined" color="success" size="small">
              <label htmlFor="input-file">Choose car photo</label>
            </Button>
          </div>
          <div className="publish-button-div">
            <Button variant="contained" color="success" onClick={() => uploadFile(selectedFile)}>Publish add</Button>
          </div>
        </div>
      </div>
      {modalWindow &&
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

export default SellCarComponent