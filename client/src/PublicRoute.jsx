import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function PublicRoute() {
  const { isLogged } = useContext(AuthContext);
  if (isLogged()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
