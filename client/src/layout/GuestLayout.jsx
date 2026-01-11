import { Outlet, Link, useLocation } from "react-router-dom";
import "../css/index.css"
import Footer from "../components/Footer";
import Aside from "../components/Aside";
import Main from "../components/Main"
import { useTranslation } from "react-i18next";
import LanguageSelect from "../components/LanguageSelect";

export default function GuestLayout() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isLogin = location.pathname === "/home/login";
  const isRegister = location.pathname === "/home/register";
  const isHome = location.pathname === "/home";

  if(localStorage.getItem("token")) localStorage.removeItem("token");
  if(JSON.parse(localStorage.getItem("user"))) localStorage.removeItem("user");

  return (
    <>
    <div className="layout">
      <header className="headerLayout header">
        <nav>
          <LanguageSelect/>
          <Link to="/home/login">{t("sing in")}</Link>
          <Link to="/home/register">{t("sing up")}</Link>
        </nav>
      </header>
        {isLogin || isRegister || !isHome ? <header></header> : <Aside className="sidebar"/>}
        <Outlet className="main" element={ <Main/>}/>
      <Footer className="footer"/>
      </div>
    </>
  );
}
