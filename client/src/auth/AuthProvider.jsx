import { useState, useEffect } from "react";
import {AuthContext} from "../context/AuthContext";
import { url } from "../general";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
        async function fetchUser() {
          const stored = localStorage.getItem("user");
          if (stored) setUser(JSON.parse(stored)); 
        }
        fetchUser();
    
  }, []);

  const login = async (userData) => {
    try{
        let response = await fetch(`${url}/login`,{
            method:"POST",
            headers:{
                 "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });

        if(!response.ok){
            if(response.status === 400){
                console.log('Password incorrect');
                return false;
            }else if(response.status===401){
                console.log("Invalid credentials no user found");
                return false;
            }else if(response.status === 422){
                console.log("NO pass the validation");
                return false;
            }
            return false;
        }
        let data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token",data.token);
        return true;
    }catch(error){
        console.log(error);
    }
  };

  const logout = async () => {
	/*
	 En aquest exemple senzillament esborrem del localStorage
	 En un entorn real s'hauria de fer la crida al servidor 
	 */
    setUser(null);
    localStorage.removeItem("user");
    try {

    let token = localStorage.getItem("token");
    let response = await fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        console.log("a");
      }
    }

    let data = await response.json();
    localStorage.removeItem("token");
    return data;
  } catch (error) {
    console.log(error);
  }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

