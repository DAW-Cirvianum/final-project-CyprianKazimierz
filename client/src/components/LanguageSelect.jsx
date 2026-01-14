import { useTranslation } from "react-i18next";
export default function LanguageSelect(){
    const { i18n } = useTranslation();

    /**
     * Function to change the language
     * @param {evet} e Event of the select 
     */
    const handleChange = (e)=>{
        i18n.changeLanguage(e.target.value);
    }
    return(
        <select name="lang" id="lang" value={i18n.language} onChange={handleChange} className="rounded-xl w-20 text-center text-black">
            <option value="en">en</option>
            <option value="ca">ca</option>
            <option value="es">es</option>
        </select>
    )
}