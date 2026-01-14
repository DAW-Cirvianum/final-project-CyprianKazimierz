import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute() {
  const { isLogged } = useContext(AuthContext);

  /*If user is not logged redirect to /home "guset view" */
  if (!isLogged()) {
    return <Navigate to="/home" replace />;
  }

  //else return a outlet
  return <Outlet />;
}
