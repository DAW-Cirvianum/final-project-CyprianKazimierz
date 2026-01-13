import { useTranslation } from "react-i18next";
export default function Footer(){
     const { t, i18n } = useTranslation();
    return (
        <footer className="text-center"><small><p> &copy; {t("footer")}</p></small></footer>
    )
}