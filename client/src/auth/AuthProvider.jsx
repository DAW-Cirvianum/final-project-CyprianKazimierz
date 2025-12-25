import { useState, useEffect } from "react";
import {AuthContext} from "../context/AuthContext";
import { url } from "../general";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);
  useEffect(() => {
        async function fetchUser() {
          const stored = localStorage.getItem("user");
          if (stored) setUser(JSON.parse(stored)); 
        }
        fetchUser();
    
  }, []);
  const register = async (userData) => {
    try{
    setUser(null);
    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("surname", userData.surname);
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("password_confirmation", userData.password_confirmation);
    formData.append("born_date", userData.born_date);
    formData.append("role", userData.role);

    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }
    
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    console.log(userData);
      let response = await fetch(`${url}/register`,{
        method:"POST",
        body: formData,
      });

      if(!response.ok){
        console.log(response.status);
        let a = await response.json();
        console.log(a.error);
        return
      }

      let data = await response.json();

      return data.status


    }catch(error){
      console.log(error);
    }
  }
  const login = async (userData) => {
    try{
      //send fetch
        let response = await fetch(`${url}/login`,{
            method:"POST",
            headers:{
                 "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });

        // if fails we send error information
        if(!response.ok){
            if(response.status === 400){
              setErrorLogin(400);
                console.log('Password incorrect');
                return false;
            }else if(response.status===401){
              setErrorLogin(401);
                console.log("Invalid credentials no user found");
                return false;
            }else if(response.status === 422){
              setErrorLogin(422);
                console.log("NO pass the validation");
                return false;
            }
            return false;
        }

        //if all is ok, we get the info, we save the user and storage the user and token
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
    <AuthContext.Provider value={{ user, login, logout,errorLogin,register }}>
      {children}
    </AuthContext.Provider>
  );
}

