import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import "../css/index.css"
import Footer from "../components/Footer";
import Aside from "../components/Aside";
export default function UserLayout(){

  const { logout } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem("user"));
return(
<div className="layout">
    <header className="headerLayout header">
        <nav>
           <p>{user.username}</p>
            <Link to="/logout" onClick={logout}>Logout</Link>
        </nav>
    </header>
     <Aside className="sidebar"/>
    <Outlet className="main"/>
    <Footer className="footer"/>
</div>
    )
}

