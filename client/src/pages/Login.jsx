import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
        "login":username,
        "password":password
    }
    const ok = await login(user);

    if (!ok) {
      setError("Credencials incorrectes");
      return;
    }

    navigate("/"); // Si l'usuari s'ha identificat correctament redirigim a l'arrel
  };

  return (
    <div className="container mx-auto ">
		<form className="userForm" onSubmit={handleSubmit}>
        	<h2>Login</h2>
		  	{error && <div style={{color: "red"}}>{error}</div>}
		  	<input type="text" placeholder="User name" value={username}
        		onChange={(e) => setUsername(e.target.value)}
      		/>
			<br />
			<input type="password" placeholder="Password" value={password}
        		onChange={(e) => setPassword(e.target.value)}
      		/>
			<br/>
			<button type="submit">Entrar</button>
		</form>
    </div>
  );
}