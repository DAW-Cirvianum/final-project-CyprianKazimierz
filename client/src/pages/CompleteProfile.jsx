import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError,formatDateDMY,isAdult,isFutureDate } from "../general";
import { useTranslation } from "react-i18next";
export default function CompleteProfile() {

let user = JSON.parse(localStorage.getItem("user"));
  const { t, i18n } = useTranslation();
   const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [born_date, setBornDate] = useState("");
  const [avatar, setAvatar] = useState(null);


  const navigate = useNavigate();
  const { completProfile } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //

    if (isFutureDate(born_date)) {
      showError("The date cannot be in the future");
      return;
    } else if (!isAdult(born_date)) {
      showError("You must be at least 18 years old");
      return;
    }
    //create user
    let newUser = {
      name: name,
      surname: surname,
      username: username,
      born_date: born_date,
      avatar: avatar,
    };

    const response = await completProfile(newUser);

    if (!response.ok) {
      if (response.status == 422) {
        const errors = Object.values(response.error.error);
        errors.forEach((messages,index) => {
          messages.forEach((msg) => {
            showError(msg,index);
          });
        });
        return;
      }
      return;
    }

    toast.success("User has been updated", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });

    setTimeout(() => {
      navigate("/home/verify");
    }, 3200);
  };

  return (
    <div className="container mx-auto my-10 flex justify-center">
      <form className="userForm w-96 h-auto p-14" onSubmit={handleSubmit}>
        <h2>{t("completeProfile")}</h2>

        {(!user?.name || user.name.trim() === "") && (
          <div className="mb-4 flex flex-col">
            <label htmlFor="name">{t("name")}:</label>
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              placeholder={t("pName")}
              pattern="^[a-zA-Z ]{3,25}$"
              maxLength="25"
              title="Only maj and min letters, min 3 chars"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
       { (!user?.surname)&&(<div className="mb-4 flex flex-col">
          <label htmlFor="surname">{t("surname")}:</label>
          <input
            type="text"
            name="surname"
            value={surname}
            id="surname"
            placeholder={t("pSurname")}
            pattern="^[a-zA-Z]{3,25}$"
            maxLength="25"
            title="Only maj and min letters, min 3 chars"
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>)}
       {(!user?.username) && (<div className="mb-4 flex flex-col">
          <label htmlFor="username">{t("username")}:</label>
          <input
            type="text"
            placeholder={t("username")}
            value={username}
            id="username"
            name="username"
            pattern="^[a-zA-Z0-9._]{3,20}$"
            title="Please introduce the username(Maj Min and Numbers, min 3 chars)"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>)}
        {(!user?.born_date)&&(<div className="mb-4 flex flex-col">
          <label htmlFor="born_date">{t("borndate")}:</label>
          <input
            type="date"
            id="born_date"
            name="born_date"
            title={t("pBornDate")}
            onChange={(e) => {
              setBornDate(e.target.value);
            }}
            required
          />
        </div>)}
       {(!user?.avatar)&& (<div className="mb-4 flex flex-col">
          <label htmlFor="avatar">{t("avatar")}:</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>)}
        <button type="submit">{t("send")}</button>
      </form>
    </div>
  );
}
