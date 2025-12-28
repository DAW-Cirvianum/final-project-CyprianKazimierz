import { useState, useEffect } from "react";
import {AuthContext} from "../context/AuthContext";
import { url } from "../general";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //       async function fetchUser() {
  //         const stored = localStorage.getItem("user");
  //         if (stored) setUser(JSON.parse(stored)); 
  //       }
  //       fetchUser();
  // }, []);


  const register = async (userData) => {
    try{
    setUser(null);
    
      let response = await fetch(`${url}/register`,{
        method:"POST",
        body: formData(userData),
      });

      if(!response.ok){
        let errorReturn = await response.json();
        return {
          ok: false,
          status: response.status,
          error: errorReturn
        }
      }
      return {ok:true}

    }catch(error){
      return;
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
             return {
        ok: false,
        status: response.status,
      };
        }

        //if all is ok, we get the info, we save the user and storage the user and token
        let data = await response.json();
        
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        localStorage.setItem("token",data.token);
        return {ok:true};
    }catch(error){
        return;
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
    let response = await fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        console.log(response.error);
      }
    }

    let data = await response.json();
    localStorage.removeItem("token");
    return data;
  } catch (error) {
    console.log(error);
  }
  };

  const profile = async (userData) => {
    console.log(userData);
    try{
      let response = await fetch(`${url}/profile`,{
        method:"PUT",
        headers:{
          Authorization: `Bearer ${getToken()}`
        },
        body: formData(userData)
      });

      if(!response.ok){
        let errorReturn = await response.json();
        return {
          ok: false,
          status: response.status,
          error: errorReturn
        }
      }

      let returnData = await response.json();
      setUser(returnData.user);
      localStorage.setItem("token", returnData.token);

      return {ok:true}

    }catch(error){
      return {
    ok: false,
    status: response.status,
  };
    }
  }


  /* private functions */

  const formData = (userData) =>{
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
    return formData;
  }

  const getToken = () =>{
    return localStorage.getItem("token");
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, register, profile }}>
      {children}
    </AuthContext.Provider>
  );
}

