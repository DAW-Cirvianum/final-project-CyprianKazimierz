import { Outlet, Link, useLocation } from "react-router-dom";
import "../css/index.css"
export default function GuestLayout() {
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <>
      <header>
        <nav>
          {!isLogin && <Link to="/home/login">Login</Link>}
          {" | "}
          {!isRegister && <Link to="/home/register">Register</Link>}
        </nav>
      </header>

      <Outlet />
    </>
  );
}
