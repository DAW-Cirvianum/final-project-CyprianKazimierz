import "../css/index.css";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { showError, formatDateDMY, isAdult, isFutureDate, formatDateForInput } from "../general";

export default function Profile() {
  //Variables
  const { profile } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmation_password, setPas] = useState("");
  const [born_date, setBornDate] = useState(user.born_date);
  const [avatar, setAvatar] = useState(null);
  const { t, i18n } = useTranslation();

  /**
   * Function to validate and send the new data of the user and change it
   * @param {event} e Event of the form with inputs 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isFutureDate(born_date)) {
      showError("The date cannot be in the future");
      return;
    } else if (!isAdult(formatDateForInput(born_date))) {
      showError("You must be at least 18 years old");
      return;
    }
    
    let newUser = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
      password_confirmation: confirmation_password,
      born_date: born_date,
      avatar: avatar,
      role: "user",
    };

    const response = await profile(newUser);

    if (!response.ok) {
      if(response.status == 401){
        showError("Token expires");
        setTimeout(()=>{navigate("/home");},2000);
        return;
      }
      if (response.status == 422) {
        console.log(response.error);
        const errors = Object.values(response.error.error);
        errors.forEach((messages, index) => {
          messages.forEach((msg) => {
            showError(msg, index);
          });
        });
        return;
      }
      return;
    }

    toast.success("Profile updated successfully", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });

    setTimeout(() => {
      navigate("/");
    }, 3200);
  };

  return (
    <div className="container mx-auto my-10 flex justify-center">
      <title>Edit Profile</title>
      <form className="userForm w-96 h-auto p-14" onSubmit={handleSubmit}>
        <h2>{t("profile")}</h2>

        <div className="mb-4 flex flex-col">
          <label htmlFor="name">{t("name")}:</label>
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            pattern="^[a-zA-Z ]{3,25}$"
            maxLength="25"
            title="Only maj and min letters, min 3 chars"
            onChange={(e) => setName(e.target.value)}
            className="dark:text-black"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="surname">{t("surname")}:</label>
          <input
            type="text"
            name="surname"
            value={surname}
            id="surname"
            pattern="^[a-zA-Z]{3,25}$"
            maxLength="25"
            title="Only maj and min letters, min 3 chars"
            className="dark:text-black"
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="username">{t("username")}:</label>
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            pattern="^[a-zA-Z0-9._]{3,20}$"
            title="Please introduce the username(Maj Min and Numbers, min 3 chars)"
            onChange={(e) => setUsername(e.target.value)}
            className="dark:text-black"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">{t("email")}:</label>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            pattern="^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$"
            maxLength="50"
            onChange={(e) => setEmail(e.target.value)}
            className="dark:text-black"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">{t("password")} ({t("optional")}):</label>
          <input
            type="password"
            id="password"
            name="password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min og 6 chars and a max of 20)"
            maxLength="20"
            className="dark:text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="confirmation_password">{t("repeatPassword")} ({t("optional")}):</label>
          <input
            type="password"
            id="confirmation_password"
            name="confirmation_password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min og 6 chars and a max of 20)"
            maxLength="20"
            className="dark:text-black"
            onChange={(e) => setPas(e.target.value)}
            
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="born_date">{t("borndate")}:</label>
          <input
            type="date"
            id="born_date"
            name="born_date"
            title="Introduce you born date"
            value={born_date}
            onChange={(e) => {
              setBornDate(e.target.value);
            }}
            className="dark:text-black"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="avatar">{t("avatar")}:</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <button type="submit">{t("send")}</button>
      </form>
    </div>
  );
}
