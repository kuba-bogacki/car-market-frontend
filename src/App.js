import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import {Elements,} from "@stripe/react-stripe-js";
import KeysService from "./service/KeysService";
import CustomerService from "./service/CustomerService";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import BuyCarComponent from "./components/BuyCarComponent";
import SellCarComponent from "./components/SellCarComponent";
import ArticlesCarComponent from "./components/ArticlesCarComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import CarDetailsComponent from "./components/CarDetailsComponent";
import CustomerProfileComponent from "./components/CustomerProfileComponent";
import StartingPageComponent from "./components/StartingPageComponent";
import AddNewArticleComponent from "./components/AddNewArticleComponent";
import ArticleDetailsComponent from "./components/ArticleDetailsComponent";
import AdvancedSearchComponent from "./components/AdvancedSearchComponent";
import AdminPageComponent from "./components/AdminPageComponent";
import MediaSidebarComponent from "./components/MediaSidebarComponent";
import RouteProtector from "./service/RouteProtector";

function App() {

  const customer = CustomerService.getCustomerProfile();

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [previousScrollPosition, setPreviousScrollPosition] = useState(window.scrollY);
  const [stripePromise, setStripePromise] = useState(() => loadStripe(KeysService.getPublishStripeKey()))

  useEffect(() => {
    updateKeys();
    if (currentCustomer === null) {
      getCustomerInfo(customer);
    }
  }, []);

  const updateKeys = () => {
    KeysService.setPublishStripeKey();
  };

  const getCustomerInfo = (data) => {
    data.then((result) => {
      setCurrentCustomer(result);
    });
  };

  window.onscroll = () => {
    let currentScrollPosition = window.scrollY;
    let navbar = document.getElementsByClassName("navbar-items")[0];
    if (previousScrollPosition > currentScrollPosition) {
      navbar.style.top = "0.6rem";
    } else {
      navbar.style.top = "-6rem";
    }
    setPreviousScrollPosition(currentScrollPosition);
  };

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Router>
          <NavbarComponent/>
          <MediaSidebarComponent/>
          <div className="page-route-container">
            <Routes>
              <Route path="/" element={<StartingPageComponent/>}></Route>
              <Route path="/buy-car" element={<BuyCarComponent/>}></Route>
              <Route path="/sell-car" element={<SellCarComponent/>}></Route>
              <Route path="/advanced-search" element={<AdvancedSearchComponent/>}></Route>
              <Route path="/articles" element={<ArticlesCarComponent/>}></Route>
              <Route path="/article-details/:articleId" element={<ArticleDetailsComponent/>}></Route>
              <Route path="/add-new-article" element={<AddNewArticleComponent/>}></Route>
              <Route path="/login" element={<LoginComponent/>}></Route>
              <Route path="/registration" element={<RegisterComponent/>}></Route>
              <Route path="/profile" element={<CustomerProfileComponent/>}></Route>
              <Route path="/show-car-details/:carId" element={<CarDetailsComponent/>}></Route>
              <Route path="/admin-page" element={
                <RouteProtector redirectPath="/"
                      isAllowed={!!currentCustomer && currentCustomer.authorities[0].authority.includes('ROLE_ADMIN')}>
                  <AdminPageComponent/>
                </RouteProtector>}>
              </Route>
            </Routes>
          </div>
          <FooterComponent/>
        </Router>
      </Elements>
    </div>
  );
}

export default App;
