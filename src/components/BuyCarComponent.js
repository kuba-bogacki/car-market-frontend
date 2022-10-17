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

const BASE_URL = "http://localhost:8080";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "cornflowerblue",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const fontStyle = {color: '#F8F8F8', borderColor: 'black'};

function BuyCarComponent() {

  const navigate = useNavigate();

  const [carsList, setCarsList] = useState([]);

  useEffect(() => {
    getAllCars();
  })

  const getAllCars = () => {
    axios.get(BASE_URL + "/cars")
      .then((response) => {
        if (response.status === 200) {
          setCarsList(response.data);
        } else {
          alert("Can't load a cars!");
        }
      })
  }

  const showCarDetails = (car) => {
    navigate(`/show-car-details/${car.carId}`);
  }

  return (
    <div className="car-table">
      <fieldset className="fieldset-car-info-outer" style={{borderStyle: 'inset'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={fontStyle} className="text-shadow"></StyledTableCell>
                <StyledTableCell align="left" style={fontStyle} className="text-shadow"><h3>Company</h3></StyledTableCell>
                <StyledTableCell align="center" style={fontStyle} className="text-shadow"><h3>Model</h3></StyledTableCell>
                <StyledTableCell align="right" style={fontStyle} className="text-shadow"><h3>Price</h3></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carsList.map((car, index) => (
                <StyledTableRow className="table-row-link" key={index} onClick={() => {showCarDetails(car)}}>
                  <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{car.carCompany}</StyledTableCell>
                  <StyledTableCell align="center">{car.carModel}</StyledTableCell>
                  <StyledTableCell align="right">{car.carPrice + " $"}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </fieldset>
    </div>
  );
}

export default BuyCarComponent
