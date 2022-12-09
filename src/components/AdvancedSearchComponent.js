import "../styles/AdvancedSearchComponentStyle.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  Paper,
  Slider,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
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
const fontStyle = {color: '#F8F8F8', borderColor: 'black'};
const radioSize = {'& .MuiSvgIcon-root': {fontSize: 10}, textAlign: "left"};
const cltField = {backgroundColor: '#F8F8F8', borderRadius: '4px', textAlign: "left"};
const minDistance = 1;

function AdvancedSearchComponent() {

  const navigate = useNavigate();

  const [carsList, setCarsList] = useState([]);
  const [carCompany, setCarCompany] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carReleaseYear, setCarReleaseYear] = useState([1980, 1985]);
  const [carMileage, setCarMileage] = useState([0, 10000]);
  const [carPrice, setCarPrice] = useState([0, 100000]);
  const [carType, setCarType] = useState({sedan : true, suv : true, coupe : true, other : true});
  const {sedan, suv, coupe, other} = carType;
  const [engineType, setEngineType] = useState({electric : true, diesel : true, gas : true});
  const {electric, diesel, gas} = engineType;
  const [crushed, setCrushed] = useState({yes : true, no : true});
  const {yes, no} = crushed;
  const [validationError, setValidationError] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");

  const changeCarReleaseYear = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setCarReleaseYear([Math.min(newValue[0], carReleaseYear[1] - minDistance), carReleaseYear[1]]);
    } else {
      setCarReleaseYear([carReleaseYear[0], Math.max(newValue[1], carReleaseYear[0] + minDistance)]);
    }
  };

  const changeCarMileage = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setCarMileage([Math.min(newValue[0], carMileage[1] - minDistance), carMileage[1]]);
    } else {
      setCarMileage([carMileage[0], Math.max(newValue[1], carMileage[0] + minDistance)]);
    }
  };

  const changeCarPrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setCarPrice([Math.min(newValue[0], carPrice[1] - minDistance), carPrice[1]]);
    } else {
      setCarPrice([carPrice[0], Math.max(newValue[1], carPrice[0] + minDistance)]);
    }
  };

  const chooseCarType = (event) => {
    setCarType({...carType, [event.target.name]: event.target.checked});
  };

  const chooseCarEngine = (event) => {
    setEngineType({...engineType, [event.target.name]: event.target.checked});
  };

  const chooseCarCrushed = (event) => {
    setCrushed({...crushed, [event.target.name]: event.target.checked});
  };

  const findSearchedCars = () => {
    const data = {
      carCompany: carCompany,
      carModel: carModel,
      carReleaseYearRange: carReleaseYear,
      carMileageRange: carMileage,
      carPriceRange: carPrice,
      carTypeArray: carType,
      engineTypeArray: engineType,
      crushedArray: crushed
    };

    console.log(data);

    if(carCompany === "" || carModel === "") {
      setModalHeader("Provide all parameters");
      setModalBody("If you want to find cars you need to provide company and car model first.")
      openModal();
    } else {
      axios.put(BASE_URL + "/get-advanced-search-cars", data)
        .then((response) => {
          if(response.status === 200) {
            setCarsList(response.data);
            console.log(response.data);
            if(response.data.length === 0) {
              setModalHeader("No car found");
              setModalBody("No one car fit to chosen parameters.")
              openModal();
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const showCarDetails = (car) => {
    navigate(`/show-car-details/${car.carId}`);
  };

  const openModal = () => {
    setValidationError(true);
  };

  const closeModal = () => {
    setValidationError(false);
  };

  return (
    <div className="advanced-search-outer-div">
      <h1 className="advanced-search-header">Advanced search</h1>
      <div className="advanced-search-inner-left-div">
        <div className="car-component-input-div">
          <div className="car-inline-input-div">
            <CssTextField className="car-company" label="Company" variant="outlined" size="small" placeholder="E.g. Ford"
                          style={cltField} onChange={(e) => setCarCompany(e.target.value)}/>
          </div>
          <div className="car-inline-input-div">
            <CssTextField className="car-company" label="Model" variant="outlined" size="small" placeholder="E.g. Escort"
                          style={cltField} onChange={(e) => setCarModel(e.target.value)}/>
          </div>
        </div>
        <div className="car-component-release-year-div">
          <div className="car-inline-release-year-div">
            <Typography id="non-linear-slider" variant="subtitle1" gutterBottom>
              <h3>Release year:</h3>
            </Typography>
          </div>
          <div className="car-inline-release-year-div">
            <Box sx={{ width: 320 }}>
              <Slider value={carReleaseYear} min={1980} max={2022} valueLabelDisplay="auto"
                      color="success" disableSwap onChange={changeCarReleaseYear}/>
            </Box>
          </div>
        </div>
        <div className="car-component-mileage-div">
          <div className="car-inline-mileage-div">
            <Typography id="non-linear-slider" variant="subtitle1" gutterBottom>
              <h3>Mileage:</h3>
            </Typography>
          </div>
          <div className="car-inline-mileage-div">
            <Box sx={{ width: 320 }}>
              <Slider value={carMileage} min={0} max={100000} valueLabelDisplay="auto"
                      color="success" disableSwap onChange={changeCarMileage}/>
            </Box>
          </div>
        </div>
        <div className="car-component-price-div">
          <div className="car-inline-price-div">
            <Typography id="non-linear-slider" variant="subtitle1" gutterBottom>
              <h3>Price:</h3>
            </Typography>
          </div>
          <div className="car-inline-price-div">
            <Box sx={{ width: 320 }}>
              <Slider value={carPrice} min={0} max={1000000} valueLabelDisplay="auto"
                      color="success" disableSwap onChange={changeCarPrice}/>
            </Box>
          </div>
        </div>
        <div className="accordions-group-div">
          <div className="car-component-car-type-div">
            <Accordion style={cltField}>
              <AccordionSummary expandIcon={<ArrowDownwardIcon/>} aria-controls="panel1a-content" id="car-type-accordion">
                <Typography>Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel control={
                      <Checkbox checked={sedan} onChange={chooseCarType} name="sedan" sx={radioSize} color="success"/>
                    } label="Sedan"/>
                    <FormControlLabel control={
                      <Checkbox checked={suv} onChange={chooseCarType} name="suv" sx={radioSize} color="success"/>
                    } label="Suv"/>
                    <FormControlLabel control={
                      <Checkbox checked={coupe} onChange={chooseCarType} name="coupe" sx={radioSize} color="success"/>
                    } label="Coupe"/>
                    <FormControlLabel control={
                      <Checkbox checked={other} onChange={chooseCarType} name="other" sx={radioSize} color="success"/>
                    } label="Other"/>
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="car-component-engine-type-div">
            <Accordion style={cltField}>
              <AccordionSummary expandIcon={<ArrowDownwardIcon/>} aria-controls="panel1a-content" id="engine-type-accordion">
                <Typography>Engine Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel control={
                      <Checkbox checked={electric} onChange={chooseCarEngine} name="electric" sx={radioSize} color="success"/>
                    } label="Electric"/>
                    <FormControlLabel control={
                      <Checkbox checked={diesel} onChange={chooseCarEngine} name="diesel" sx={radioSize} color="success"/>
                    } label="Diesel"/>
                    <FormControlLabel control={
                      <Checkbox checked={gas} onChange={chooseCarEngine} name="gas" sx={radioSize} color="success"/>
                    } label="Gas"/>
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="car-component-crushed-div">
            <Accordion style={cltField}>
              <AccordionSummary expandIcon={<ArrowDownwardIcon/>} aria-controls="panel1a-content" id="crushed-accordion">
                <Typography>Crushed</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel control={
                      <Checkbox checked={yes} onChange={chooseCarCrushed} name="yes" sx={radioSize} color="success"/>
                    } label="Yes"/>
                    <FormControlLabel control={
                      <Checkbox checked={no} onChange={chooseCarCrushed} name="no" sx={radioSize} color="success"/>
                    } label="No"/>
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="advanced-search-inner-right-div">
        <div className="short-search-table-div-inner">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" style={fontStyle}>
                    <h3>Company</h3>
                  </StyledTableCell>
                  <StyledTableCell align="center" style={fontStyle}>
                    <h3>Model</h3>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carsList.map((car, index) => (
                  <TableRow className="table-row-link" key={index} onClick={() => {showCarDetails(car)}}>
                    <StyledTableCell align="center"><h4>{car.carCompany}</h4></StyledTableCell>
                    <StyledTableCell align="center"><h4>{car.carModel}</h4></StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="submit-search-button-div">
        <Button color="success" variant="contained" onClick={() => {findSearchedCars()}} style={{marginTop: "1.5rem"}}>Find cars</Button>
      </div>
      {validationError &&
        <Modal open={() => {openModal()}} onClose={() => {closeModal()}}
               aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalHeader}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalBody}
            </Typography>
          </Box>
        </Modal>}
    </div>
  );
}

export default AdvancedSearchComponent;