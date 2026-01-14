import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../general";
import { useTranslation } from "react-i18next";

export default function Login() {
  //Variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  /**
   * Function to Sing in to the app
   * @param {event} e Event of the form with the inputs 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newUser = {
      login: username,
      password: password,
    };
    const response = await login(newUser);
    if (!response.ok) {
      if (response.status == 400) {
        showError("Incorrect Password");
        return;
      } else if (response.status == 401) {
        showError("INVALID CREDENTIALS, no user found");
        return;
      } else if (response.status == 422) {
        showError("Error Validation data, plese introduce valid data");
        return;
      } else if (response.status == 403) {
        showError(
          "Your account is not verified, please go to your email inbox and verify your account"
        );
        return;
      } else if (response.status == 500) {
        showError("Server error, please try agian later");
        return;
      }
    }
    //if the role of the user is admin, redirect to blade
    if (response.user.role === "admin") {
      window.location.href = 'http://localhost/admin/login-bridge?token=' + response.token;
      return;
    }

    toast.success("Sing in successfully", {
      toastId: "success-singin",
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
    <div className="container mx-auto my-auto flex justify-center ">
      <form className="userForm w-96 h-auto p-14 " onSubmit={handleSubmit}>
        <h2 className="text-color">{t("sing in")}</h2>
        <div className="mb-4 flex flex-col">
          <label htmlFor="login" className="text-color">{t("userEmail")}:</label>
          <input
            type="text"
            placeholder="Username or mail"
            pattern="^([a-zA-Z0-9._]{3,20}|[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,})$"
            id="login"
            name="login"
            title="Please introduce the username or mail, username(Maj Min and Numbers) or a valid email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="password" className="text-color">{t("password")}:</label>
          <input
            type="password"
            placeholder="Password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            id="password"
            name="password"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min og 6 chars and a max of 20)"
            maxLength="20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="mb-5 text-color">
          {t("send")}
        </button>
        <hr />
        <button
          type="button"
          onClick={() => {
            window.location.href =
              "http://localhost/api/auth/google/redirect";
          }}
          className="mt-5 text-color focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-4 py-2.5 text-center inline-flex items-center"
        >
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd" /></svg>
          {t("singGoogle")}
        </button>
      </form>
    </div>
  );
}
