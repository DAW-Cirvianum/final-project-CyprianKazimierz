import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import "../css/index.css"
export default function UserLayout(){

  const { logout } = useContext(AuthContext);
return(<>
    <header>
        <nav>
            <Link to="/logout" onClick={logout}>Logout</Link>
        </nav>
    </header>
    <Outlet/>
</>)
}

