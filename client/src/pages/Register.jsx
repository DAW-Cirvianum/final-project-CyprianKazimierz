import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Register(){
      const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
        "login":username,
        "password":password
    }
    const ok = await register(user);

    if (!ok) {
      setError("Credencials incorrectes");
      return;
    }

    navigate("/"); // Si l'usuari s'ha identificat correctament redirigim a l'arrel
  };
    return(
          <div className="bg-red-500">
		<form onSubmit={handleSubmit}>
        	<h2>Register</h2>
		  	{error && <div style={{color: "red"}}>{error}</div>}
		  	<input type="text" placeholder="Username" value={username}
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
    )
}