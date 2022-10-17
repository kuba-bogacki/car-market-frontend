import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Typography from "@mui/material/Typography";
import FooterComponent from "./components/FooterComponent";
import BuyCarComponent from "./components/BuyCarComponent";
import SellCarComponent from "./components/SellCarComponent";
import ArticlesCarComponent from "./components/ArticlesCarComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import CarDetailsComponent from "./components/CarDetailsComponent";

function App() {
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <div className="container">
          <Routes>
            <Route path="/buy-car" element={<BuyCarComponent/>}></Route>
            <Route path="/sell-car" element={<SellCarComponent/>}></Route>
            <Route path="/articles" element={<ArticlesCarComponent/>}></Route>
            <Route path="/login" element={<LoginComponent/>}></Route>
            <Route path="/registration" element={<RegisterComponent/>}></Route>
            <Route path="/show-car-details/:carId" element={<CarDetailsComponent/>}></Route>
          </Routes>
        </div>
        {/*<FooterComponent/>*/}
      </Router>
    </div>
  );
}

export default App;
