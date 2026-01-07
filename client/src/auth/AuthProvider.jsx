import { useState, useEffect, useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import { url } from "../general";

export function AuthProvider({ children }) {
  //login
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
const [page, setPage] = useState(1);
const [lastPage, setLastPage] = useState(1);
  
  //posts


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
        await loadFavorites();
        await loadLikes();
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
      let token = returnData.token;
      setUser(returnData.user);
      log({
        status: response.status,
        message: "user has update the profile, ",
        
      },token);
      return {ok:true}

    }catch(error){
      return {
    ok: false,
  };
    }
  }

  const setTokenFromGoogle = async (token) => {
  localStorage.setItem("token", token);

  const res = await fetch("http://localhost/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if(!res.ok){
    return {
      ok:false,
    }
  }
  
  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  log({
        status: res.status,
        message:data.error??"User has update profile (google sing in)",
      },token);
  setUser(data.user);
  await loadFavorites();
  await loadLikes();
  return data.user;
};

const completProfile = async (userData)=>{
  try{
      let response = await fetch(`${url}/completProfile`,{
        method:"PATCH",
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
      localStorage.setItem("token", returnData.token); // no save token..
      return {ok:true,
        returnData: returnData
      }

    }catch(error){
      return {
    ok: false,
  };
    }
}

const log = async (data,token = null) => {
  try{ 
     let response = await fetch(`${url}/log`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
          "Accept": "application/json",
          Authorization: `Bearer ${token ?? getToken()}`
        },
        body: JSON.stringify(data)
      });
      if(!response.ok){
        return {ok:false, status: response.status};
      }
  }catch(error){
    console.log(error);
  }
}

const cars = async(page=1)=>{
  try{
      let response = await fetch(`${url}/cars?page=${page}`);

      if(!response.ok){
        return {
          ok:false,
          status: response.status
        }
      }
      let data = await response.json();

      setPosts(data[0].data);
      setPage(data[0].current_page);
      setLastPage(data[0].last_page);
  }catch(error){
    return {
      ok: false,
      status: response.status
    }
  }
}

/* Favorites */
 const [favorites, setFavorites] = useState(new Set());
const loadFavorites = async () => {
  const response = await fetch(`${url}/favorites`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();
  setFavorites(new Set(data));
};


const toggleFavorite = async (postId) => {
  const response = await fetch(`${url}/toggle/${postId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();

  setFavorites(prev => {
    const copy = new Set(prev);
    data.favorited ? copy.add(postId) : copy.delete(postId);
    return copy;
  });
};

const isFavorite = (postId) => favorites.has(postId);

/* Like */
 const [likes, setLikes] = useState(new Set());
const loadLikes = async () => {
  const response = await fetch(`${url}/likes`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();
  setLikes(new Set(data));
};

const toggleLikes = async (postId) => {
  const response = await fetch(`${url}/toggleLikes/${postId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();

  setLikes(prev => {
    const copy = new Set(prev);
    data.liked ? copy.add(postId) : copy.delete(postId);
    return copy;
  });
};

const isLikes = (postId) => likes.has(postId);

/* */
const postDetails= async (idPost) =>{
  try{
    let response = await fetch(`${url}/details/${idPost}`);

    if(!response.ok) return {ok:false, status: response.status};

    let data = await response.json();

    return {ok: true, post: data};
  }catch(error){
    return {
      ok: false,
      status: response.status
    }
  }
}

  /* private functions */

  const formData = (userData) =>{
    const formData = new FormData();
    if(userData.name) formData.append("name", userData.name);
    if(userData.surname)formData.append("surname", userData.surname);
    if(userData.username)formData.append("username", userData.username);
    if(userData.email)formData.append("email", userData.email);
    if(userData.password)formData.append("password", userData.password);
    if(userData.password_confirmation)formData.append("password_confirmation", userData.password_confirmation);
    if(userData.born_date)formData.append("born_date", userData.born_date);
    if(userData.role)formData.append("role", userData.role);
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }
    return formData;
  }

  const getToken = () =>{
    return localStorage.getItem("token");
  }

  const isLogged = () =>{
    return JSON.parse(localStorage.getItem("user"))? true:false;
  }

  useEffect(() => {
    cars(page);
  }, [page]);

  //afegir funcions de like aqui al provider i al main.jsx
  return (
    <AuthContext.Provider value={{ user, login, isLogged, logout, register, profile, setTokenFromGoogle, completProfile, log, posts, page, lastPage, setPage, getToken, toggleFavorite,isFavorite,favorites, likes, toggleLikes, isLikes, postDetails}}>
      {children}
    </AuthContext.Provider>
  );
}

