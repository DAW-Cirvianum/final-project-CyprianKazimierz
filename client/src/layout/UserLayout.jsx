import { useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/Footer"; 
import Aside from "../components/Aside";
import "../css/index.css"


export default function UserLayout() {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
    const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) ?? {};
     const isHome = location.pathname === "/";

  return (
    <div className="layout">
      <header className="headerLayout header">
        <nav className="relative flex items-center gap-4">
          
          <img src={user.avatar} alt="Avatar of user" className="avatar" />
          <p>{user.username}</p>

          {/* Dropdown button */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded px-4 py-2"
          >
            Menu
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-12 z-10 w-44 bg-white border rounded shadow">
              <ul className="text-sm">
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-100" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-400"
                  >
                    Sing out
                  </button>
                </li>
              </ul>
            </div>
          )}

        </nav>
      </header>
      {isHome ? (<Aside className="sidebar"/>): (<header className="sidebar"></header>)}
      <Outlet className="main" />
      <Footer className="footer"/>
    </div>
  );
}
