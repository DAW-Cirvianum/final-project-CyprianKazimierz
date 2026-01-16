import { Outlet, Link, useLocation } from "react-router-dom";
import "../css/index.css"
import Footer from "../components/Footer";
import Aside from "../components/Aside";
import Main from "../components/Main"
import { useTranslation } from "react-i18next";
import LanguageSelect from "../components/LanguageSelect";
import ThemeToggle from "../components/ThemeToggle";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export default function GuestLayout() {
  //Variables
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const navigate=useNavigate();
  const isLogin = location.pathname === "/home/login";
  const isRegister = location.pathname === "/home/register";
  const isHome = location.pathname === "/home";

  //if localstorage user and token exists we remove it
  if(localStorage.getItem("token")) localStorage.removeItem("token");
  if(JSON.parse(localStorage.getItem("user"))) localStorage.removeItem("user");

  return (
    <>
    <title>Guest Layout</title>
    <div className="layout">
      {/*HEADER */}
      <header className="headerLayout header flex items-center justify-between " role="banner">
          <button onClick={() => navigate(-1)} className="bg-white text-black"  aria-label="back">
                      <IoChevronBack />
                    </button>
        <nav className="w-full" aria-label="mainNavigation">
          <ThemeToggle/>
          <LanguageSelect/>
          <Link to="/home/login" className="text-xl text-blue-200"   >{t("sing in")}</Link>
          <Link to="/home/register" className="text-xl text-blue-200">{t("sing up")}</Link>
        </nav>
      </header>
      {/*SideBar */}
        {isLogin || isRegister || !isHome ? <header className="sidebar hidden md:block" aria-hidden="true"></header> : <Aside className="sidebar hidden md:block" role="complementary" aria-label="filters" />}
        {/* Main */}
        <Outlet className="main" element={ <Main/>}/>
        {/* Footer */}
      <Footer className="footer hidden md:block"/>
      </div>
    </>
  );
}
