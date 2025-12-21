import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
