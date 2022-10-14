import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Typography from "@mui/material/Typography";
import FooterComponent from "./components/FooterComponent";
import BuyCarComponent from "./components/BuyCarComponent";
import SellCarComponent from "./components/SellCarComponent";
import ArticlesCarComponent from "./components/ArticlesCarComponent";

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
          </Routes>
        </div>
        {/*<FooterComponent/>*/}
      </Router>
    </div>
  );
}

export default App;
