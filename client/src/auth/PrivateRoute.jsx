import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute() {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged()) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
