import { useTranslation } from "react-i18next";
import "../css/index.css"
export default function Footer(){
     const { t, i18n } = useTranslation();
    return (
        <footer className="text-center footer hidden md:block" role="contentinfo"><small><p className="!text-black dark:!text-white"> &copy; {t("footer")}</p></small></footer>
    )
}