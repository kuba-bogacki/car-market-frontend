import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import * as PropTypes from "prop-types";
import {useState} from "react";
import DEFAULT_CAR from "../page-images/Default_car.png";
import axios from "axios";
import Button from "@mui/material/Button";

const BASE_URL = "http://localhost:8080";

function MyFormControlLabel(props) {
  return null;
}

MyFormControlLabel.propTypes = {
  control: PropTypes.element,
  label: PropTypes.string,
  value: PropTypes.string
};

const radioSize = {'& .MuiSvgIcon-root': {fontSize: 10}};
const cltField = {backgroundColor: '#F8F8F8', borderRadius: '4px'};

function SellCarComponent() {

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

  const fileSelectedHandler = (e) => {
    setCarPhoto(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
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
    console.log(formData);
    axios.post(BASE_URL + "/add-new-car", formData)
      .then((response) => {
        alert("File successfully uploaded.");
        console.log(response);
      });
  }

  return (
    <div className="seller-car-form">
      <fieldset style={{ width: 1100, height: 500, borderStyle: 'inset' }} className="fieldset-car-info-outer">
        <CardContent>
          <div className="left">
            <fieldset style={{ width: 460, height: 400, borderStyle: 'inset' }} className="fieldset-car-info-inner">
              <span className="inline-span">
                <TextField id="car-company" label="Company" variant="outlined" size="small" placeholder="E.g. Ford"
                           style={cltField} onChange={(e) => setCarCompany(e.target.value)}/>&nbsp;
                <TextField id="car-model" label="Model" variant="outlined" size="small" placeholder="E.g. Mustang"
                           style={cltField} onChange={(e) => setCarModel(e.target.value)}/>
              </span><hr/>
              <span className="inline-span">
                <TextField id="car-release-year" label="Release Year" variant="outlined" size="small" placeholder="YYYY"
                           style={cltField} onChange={(e) => setCarReleaseYear(e.target.value)}/>&nbsp;
                <TextField id="car-mileage" label="Mileage" variant="outlined" size="small" placeholder="Miles"
                           style={cltField} onChange={(e) => setCarMileage(e.target.value)}/>
              </span><hr/>
              <span className="inline-span">
                <TextField id="car-price" label="Price" variant="outlined" placeholder="$" size="small"
                           style={cltField} onChange={(e) => setCarPrice(e.target.value)}/>&nbsp;
              </span><hr/>
              <Accordion style={cltField}>
                <AccordionSummary expandIcon={<ArrowDownwardIcon/>} aria-controls="panel1a-content" id="car-type-accordion">
                  <Typography>Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <RadioGroup aria-labelledby="car-type-radio-group" name="car-type-radio-group"
                                onChange={(e) => setCarType(e.target.value)}>
                      <FormControlLabel value="sedan" control={<Radio sx={radioSize}/>} label="Sedan"/>
                      <FormControlLabel value="suv" control={<Radio sx={radioSize}/>} label="Suv"/>
                      <FormControlLabel value="pickup" control={<Radio sx={radioSize}/>} label="Pickup"/>
                      <FormControlLabel value="van" control={<Radio sx={radioSize}/>} label="Van"/>
                      <FormControlLabel value="truck" control={<Radio sx={radioSize}/>} label="Truck"/>
                      <FormControlLabel value="coupe" control={<Radio sx={radioSize}/>} label="Coupe"/>
                      <FormControlLabel value="cabriolet" control={<Radio sx={radioSize}/>} label="Cabriolet"/>
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
                      <FormControlLabel value="electric" control={<Radio sx={radioSize}/>} label="Electric" />
                      <FormControlLabel value="diesel" control={<Radio sx={radioSize}/>} label="Diesel" />
                      <FormControlLabel value="gas" control={<Radio sx={radioSize}/>} label="Gas" />
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
                      <FormControlLabel value="true" control={<Radio sx={radioSize}/>} label="Yes" />
                      <FormControlLabel value="false" control={<Radio sx={radioSize}/>} label="No" />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            </fieldset><br/>
          </div>
          <div className="right">
            <fieldset style={{ width: 460, height: 400, borderStyle: 'inset' }} className="fieldset-car-info-inner">
              <div className="upload-new-image" style={{textAlign: 'center', paddingTop: '1px'}}>
                <h2 style={{color: '#F8F8F8', borderColor: 'black'}} className="text-shadow">Car photo</h2>
                <img src={carPhoto} width="400px" height="200px" alt="default-car"
                     style={{borderStyle: 'inset', borderRadius: '10px'}}/><br/><br/>
                <input id="input-file" type="file" name="file" placeholder="Upload an image"
                       onChange={(e) => fileSelectedHandler(e)}/>
                <label htmlFor="input-file">Choose car photo</label>
              </div>
            </fieldset>
          </div>
        </CardContent>
        <Button variant="contained" className="submit-new-car-button" onClick={() => uploadFile(selectedFile)}>Save</Button>
      </fieldset>
    </div>
  );
}

export default SellCarComponent