import "../styles/StartingPageComponentStyle.css"
import Shop2Icon from '@mui/icons-material/Shop2';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CAR_MARKET_LINE from "../page-images/Cars-market-line.jpg"

const carsImageStyle = {
  borderRadius: "4px",
  marginTop: "0.7%",
  float: "right",
  paddingRight: "6px",
  width: "99.3%",
  height: "95%"
}

function StartingPageComponent() {
  return (
    <div className="home-page-div-class">
      <div className="row-first">
        <div className="column-left">
          <h2>Welcome to our platform</h2><br/>
          <p><b>The first intelligent interactive platform that focuses primarily on providing a pleasant
            and comfortable experience in buying and selling cars. Our platforms are built of many
            intelligent tools that increase the possibility of buying and selling a vehicle.</b></p>
        </div>
        <div className="column-right">
          <img src={CAR_MARKET_LINE} style={carsImageStyle} alt="cars-in-line"/>
        </div>
      </div>
      <div className="row-second">
        <div className="column-bottom"><hr/><br/>
          <h3><em>Find your match faster</em></h3><br/><br/>
          <p><em>Tap into a better car shopping experience with price drops, save features, and more!</em></p><br/>
          <Shop2Icon/><br/><br/><hr/>
        </div>
        <div className="column-bottom"><hr/><br/>
          <h3><em>Cars with the biggest impact</em></h3><br/><br/>
          <p><em>We ranked the top '22 models in our American-Made Index.</em></p><br/>
          <DirectionsCarIcon/><br/><br/><hr/>
        </div>
        <div className="column-bottom"><hr/><br/>
          <h3><em>Get your car's best offer instantly</em></h3><br/><br/>
          <p><em>Receive an instant offer in just a few short steps. Try it!</em></p><br/>
          <LocalOfferIcon/><br/><br/><hr/>
        </div>
      </div>
    </div>
  );
}

export default StartingPageComponent