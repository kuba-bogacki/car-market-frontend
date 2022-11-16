import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import authHeader from "../service/AuthHeader";
import "../styles/BuyCarComponentStyle.css"

const BASE_URL = "http://localhost:8080";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const fontStyle = {color: '#F8F8F8', borderColor: 'black'};

function BuyCarComponent() {

  const navigate = useNavigate();
  const customer = authHeader();

  const [carsList, setCarsList] = useState([]);
  const [carsLoaded, setCarsLoaded] = useState(false);

  useEffect(() => {
    if (carsLoaded === false) {
      getAllCars();
    }
  })

  const getAllCars = () => {
    axios.get(BASE_URL + "/cars", {
      headers: customer
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setCarsList(response.data);
          setCarsLoaded(true);
        } else {
          alert("Can't load a cars!");
        }
      })
  }

  const showCarDetails = (car) => {
    navigate(`/show-car-details/${car.carId}`);
  }

  return (
    <div className="buy-car-div-component">
      <h1 className="buy-car-header">Cars for sale</h1><br/>
      <div className="table-div-inner">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" style={fontStyle}><h3>Number</h3></StyledTableCell>
                <StyledTableCell align="center" style={fontStyle}><h3>Company</h3></StyledTableCell>
                <StyledTableCell align="center" style={fontStyle}><h3>Model</h3></StyledTableCell>
                <StyledTableCell align="center" style={fontStyle}><h3>Price</h3></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carsList.map((car, index) => (
                <TableRow className="table-row-link" key={index} onClick={() => {showCarDetails(car)}}>
                  <StyledTableCell align="center"><h4>{index + 1}</h4></StyledTableCell>
                  <StyledTableCell align="center"><h4>{car.carCompany}</h4></StyledTableCell>
                  <StyledTableCell align="center"><h4>{car.carModel}</h4></StyledTableCell>
                  <StyledTableCell align="center"><h4>{car.carPrice + " $"}</h4></StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default BuyCarComponent
