import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function GoogleCallback() {
  //Variables
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setTokenFromGoogle } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  //on load gets the param token
  useEffect(() => {
    const token = params.get("token");

    localStorage.setItem("token",token);

    if (!token) {
      navigate("/home/login");
      return;
    }
  
    // Save token and gets the user
    setTokenFromGoogle(token)
      .then((user) => {

        if (!user.born_date || !user.surname) {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/home/login");
      });
  }, []);

  return <p>{t("singGoogle")}...</p>;



}
