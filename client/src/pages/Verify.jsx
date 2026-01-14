import { useTranslation } from "react-i18next";
export default function Verify() {
    //variable
    const { t, i18n } = useTranslation();
    
    return (
        <p className="text-center my-4">{t("verifyEmail")}</p>
    );
}