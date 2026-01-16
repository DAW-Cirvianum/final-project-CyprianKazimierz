import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from "react-i18next";

export default function NotFound() {
  //Variables
  const { isLogged } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  return (
    <div className='container mx-auto my-auto text-center' style={{ width: "50rem", height: "auto" }}   aria-labelledby="Not Found Page">
      <title>Not Found</title>
      <h1>404 - {t("pageNotFound")}</h1>
      <p>{t("textNotFound")}.</p>
      {isLogged() ? (<Link to="/">{t("goBack")}</Link>) : (<Link to="/home">{t("goBack")}</Link>)}
    </div>
  );
}