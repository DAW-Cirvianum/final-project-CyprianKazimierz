import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function GoogleCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setTokenFromGoogle } = useContext(AuthContext);

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      navigate("/home/login");
      return;
    }
    console.log(token);
    // Guarda token + carga usuario
    setTokenFromGoogle(token)
      .then((user) => {
        
        if (!user.born_date) {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/home/login");
      });
  }, []);

  return <p>Signing in with Google...</p>;



}
