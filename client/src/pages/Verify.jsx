import { useTranslation } from "react-i18next";
export default function Verify() {
    //variable
    const { t, i18n } = useTranslation();
    
    return (
        <>
        <title>Verify Mail</title>
        <p className="text-center my-4" aria-labelledby="Verification Mail message">{t("verifyEmail")}</p>
        </>
    );
}