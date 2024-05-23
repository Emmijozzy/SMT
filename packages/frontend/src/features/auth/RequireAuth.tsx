import { Outlet } from "react-router-dom";
// import { UseSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";

/*
 * if  there is accesstoken
 * get the present access token
 * decode the access token to get user date
 * save the user data to the user profile data
 
 */

function RequireAuth() {
  return <Outlet />;
}
export default RequireAuth;
