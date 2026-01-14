import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function PublicRoute() {
  const { isLogged } = useContext(AuthContext);
  //If user is logged redirect to user view
  if (isLogged()) {
    return <Navigate to="/" replace />;
  }
  //else show content
  return <Outlet />;
}
