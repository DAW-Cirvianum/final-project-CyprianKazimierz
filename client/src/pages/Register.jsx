import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { showError, formatDateDMY, isAdult, isFutureDate } from "../general";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation_password, setPas] = useState("");
  const [born_date, setBornDate] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFutureDate(born_date)) {
      showError("The date cannot be in the future");
      return;
    } else if (!isAdult(born_date)) {
      showError("You must be at least 18 years old");
      return;
    }

    let user = {
      name,
      surname,
      username,
      email,
      password,
      password_confirmation: confirmation_password,
      born_date,
      avatar,
      role: "user",
    };

    const response = await register(user);

    if (!response.ok) {
      if (response.status === 422) {
        const errors = Object.values(response.error.error);
        errors.forEach((messages, index) => {
          messages.forEach((msg) => {
            showError(msg, index);
          });
        });
        return;
      }
    }

    toast.success("User has been created", {
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
        <h2 className="text-color">{t("sing up")}</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}

        <div className="mb-4 flex flex-col">
          <label htmlFor="name" className="text-color">{t("name")}:</label>
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            pattern="^[a-zA-Z ]{3,25}$"
            maxLength="25"
            title="Only maj and min letters, min 3 chars"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="surname" className="text-color">{t("surname")}:</label>
          <input
            type="text"
            name="surname"
            value={surname}
            id="surname"
            pattern="^[a-zA-Z]{3,25}$"
            maxLength="25"
            title="Only maj and min letters, min 3 chars"
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="username" className="text-color">{t("username")}:</label>
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            pattern="^[a-zA-Z0-9._]{3,20}$"
            title="Please introduce the username(Maj Min and Numbers, min 3 chars)"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="text-color">{t("email")}:</label>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            pattern="^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$"
            maxLength="50"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="password" className="text-color">{t("password")}:</label>
          <input
            type="password"
            id="password"
            name="password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min 6 chars and max 20)"
            maxLength="20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="confirmation_password" className="text-color">{t("repeatPassword")}:</label>
          <input
            type="password"
            id="confirmation_password"
            name="confirmation_password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min 6 chars and max 20)"
            maxLength="20"
            value={confirmation_password}
            onChange={(e) => setPas(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="born_date" className="text-color">{t("borndate")}:</label>
          <input
            type="date"
            id="born_date"
            name="born_date"
            title="Introduce your born date"
            onChange={(e) => setBornDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="avatar" className="text-color">{t("avatar")}:</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        <button type="submit" className="text-color">{t("send")}</button>
      </form>
      <ToastContainer />
    </div>
  );
}
