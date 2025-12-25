import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { errorLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
      login: username,
      password: password,
    };
    const ok = await login(user);

    if (!ok) {
     if(errorLogin == 400){
      setError("Incorrect password");
     }else if(errorLogin == 401){
      setError("Invalid credentials user no found");
     }else if(errorLogin == 422){
      setError("Error Validation data, plese introduce valid data");
     }
      return;
    }

    navigate("/"); // Si l'usuari s'ha identificat correctament redirigim a l'arrel
  };

  return (
    <div className="container mx-auto my-auto flex justify-center ">
      <form className="userForm w-96 h-auto p-14" onSubmit={handleSubmit}>
        <h2>Sing In</h2>
        <div className="mb-4 flex flex-col">
          {error && <div style={{ color: "red" }}>{error}</div>}
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
          <label htmlFor="passwrod">Password:</label>
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
