import {Navigate, Outlet} from "react-router-dom";

function RouteProtector({isAllowed, children}) {
  if (!isAllowed) {
    return <Navigate to="/articles" replace/>;
  }
  return children ? children : <Outlet/>;
};

export default RouteProtector;