import { useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/Footer"; 
import Aside from "../components/Aside";
import "../css/index.css"
import { useTranslation } from "react-i18next";
import LanguageSelect from "../components/LanguageSelect";
import ThemeToggle from "../components/ThemeToggle";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function UserLayout() {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user")) ?? {};
     const isHome = location.pathname === "/";
  const navigate = useNavigate();
  return (
    <div className="layout">
      <title>User Layout</title>
      <header className="headerLayout header w-full flex flex-wrap justify-between items-center gap-4 px-4" role="banner">
        <button onClick={() => navigate(-1)} className="bg-white text-black"  aria-label="goBack">
                      <IoChevronBack  aria-hidden="true"/>
        </button>
        <nav className="relative flex items-center gap-20 w-auto" aria-label="userNavigation">
          <Link className="hidden md:block text-blue-200" to="/favoritePosts">{t("favoritePosts")}</Link>
          <ThemeToggle/>
          <LanguageSelect/>
          <img src={user.avatar} alt="Avatar of user" className="avatar" />
          <p className="text-white">{user.username}</p>

          {/* Dropdown button */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded px-4 py-2" aria-expanded={open}
          aria-haspopup="true"
          aria-controls="user-dropdown"
          >
            {t("menu")}
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
              <ul className="text-sm"  role="menu">
                <li role="none">
                  <Link className="block px-4 py-2 hover:bg-gray-100" to="/profile"  role="menuitem">
                   {t("profile")}
                  </Link>
                </li>
                <li role="none">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-400 text-color"
                     role="menuitem"
                  >
                    {t("sing out")}
                  </button>
                </li>
              </ul>
            </div>
          )}

        </nav>
      </header>
      {isHome ? (<Aside className="sidebar hidden md:block" role="complementary" />): (<header className="sidebar hidden md:block"></header>)}
      <Outlet className="main" />
      <Footer className="footer"/>
    </div>
  );
}
