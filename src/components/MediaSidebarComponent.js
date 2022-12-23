import "../styles/MediaSidebarComponentStyle.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const FACEBOOK_LANDING_PAGE = "https://www.facebook.com/wynajemautolawet/";
const TWITTER_LANDING_PAGE = "https://www.instagram.com/carmarket.pl/";
const INSTAGRAM_LANDING_PAGE = "https://twitter.com/carmarketfr";

function MediaSidebarComponent() {

  return (
    <nav className="sidebar-nav">
      <div className="media-sidebar-nav">
        <a href={FACEBOOK_LANDING_PAGE} target="_blank" id="facebook"><FacebookIcon fontSize="large"/></a>
      </div>
      <div className="media-sidebar-nav">
        <a href={TWITTER_LANDING_PAGE} target="_blank" id="twitter"><TwitterIcon fontSize="large"/></a>
      </div>
      <div className="media-sidebar-nav">
        <a href={INSTAGRAM_LANDING_PAGE} target="_blank" id="instagram"><InstagramIcon fontSize="large"/></a>
      </div>
    </nav>
  );
}

export default MediaSidebarComponent;