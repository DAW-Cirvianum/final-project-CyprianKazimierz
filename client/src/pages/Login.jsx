import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../general";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  
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
      } else if(response.status == 403){
        showError("Your account is not verified, please go to your email inbox and verify your account");
        return;
      }else if (response.status == 500) {
        showError("Server error, please try agian later");
        return;
      }
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
      <form className="userForm w-96 h-auto p-14" onSubmit={handleSubmit}>
        <h2>Sing In</h2>
        <div className="mb-4 flex flex-col">
          <label htmlFor="login">Username/Email:</label>
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
          <label htmlFor="password">Password:</label>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
