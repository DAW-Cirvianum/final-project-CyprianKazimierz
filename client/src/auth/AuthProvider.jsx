import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { url } from "../general";
import { showError } from "../general";
import { resolvePath, useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  //Local variables
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [cities, setCity] = useState([]);
  const navigate = useNavigate();

  /**
   * Register function
   * @param {object} userData Object of a user from form 
   * @returns ok: true if all goes good or if ok:false with status and error.
   */
  const register = async (userData) => {
    try {
      setUser(null);

      let response = await fetch(`${url}/register`, {
        method: "POST",
        body: formData(userData),
      });

      if (!response.ok) {
        let errorReturn = await response.json();
        return {
          ok: false,
          status: response.status,
          error: errorReturn,
        };
      }
      return { ok: true };
    } catch (error) {
      return;
    }
  };

  /**
   * 
   * @param {object} userData userData Object of a user from form 
   * @returns object if all good {ok:true,user,token} or {ok:false,status}
   */
  const login = async (userData) => {
    try {
      let response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        log(
          {
            status: response.status,
            message: "Sing in",
          },
          getToken()
        );
        return {
          ok: false,
          status: response.status,
        };
      }

      let data = await response.json();

      //if user is admin we do not save him in localStorage
      if (data.user.role !== "admin") {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        localStorage.setItem("token", data.token);
        await loadFavorites();
        await loadLikes();
      }
      log(
        {
          status: response.status,
          message: "Sign In ",
        },
        data.token
      );

      return {
        ok: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return;
    }
  };

  /**
   * 
   * @returns Returns data with status and information.
   */
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    try {
      let response = await fetch(`${url}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      let data = await response.json();

      return data;
    } catch (error) {
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/home");
    }
  };

  /**
   * 
   * @param {object} userData Object that we send with information of the form
   * @returns Return ok:true if all goes good or {ok:false,status,error} if not
   */
  const profile = async (userData) => {
    try {
      let response = await fetch(`${url}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData(userData),
      });

      if (!response.ok) {
        log(
          {
            status: response.status,
            message: "Edit profile: ",
          },
          getToken()
        );
        let errorReturn = await response.json();
        return {
          ok: false,
          status: response.status,
          error: errorReturn,
        };
      }

      let returnData = await response.json();

      let token = returnData.token;
      setUser(returnData.user);
      log(
        {
          status: response.status,
          message: "user has update the profile, ",
        },
        token
      );
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
      };
    }
  };

  /**
   * 
   * @param {string} token String of token sactum
   * @returns if all good return the user if not {ok:false}
   */
  const setTokenFromGoogle = async (token) => {
    localStorage.setItem("token", token);

    const res = await fetch("http://localhost/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return {
        ok: false,
      };
    }

    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    log(
      {
        status: res.status,
        message: data.error ?? "User has update profile (google sing in)",
      },
      token
    );
    setUser(data.user);
    await loadFavorites();
    await loadLikes();
    return data.user;
  };

  /**
   * Google method to complete the profile if google do not provide all data
   * @param {object} userData  Object with data from the form
   * @returns if all good {ok:true,returnData:returnData} if not {ok:false,status,error} 
   */
  const completProfile = async (userData) => {
    try {
      let response = await fetch(`${url}/completProfile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData(userData),
      });

      if (!response.ok) {
        log(
          {
            status: response.status,
            message: "Complete profile",
          },
          getToken()
        );
        let errorReturn = await response.json();
        return {
          ok: false,
          status: response.status,
          error: errorReturn,
        };
      }

      let returnData = await response.json();
      setUser(returnData.user);
      localStorage.setItem("token", returnData.token);
      log(
        {
          status: response.status,
          message: "Complete profile user Google Sing In ",
        },
        returnData.token
      );
      return { ok: true, returnData: returnData };
    } catch (error) {
      return {
        ok: false,
      };
    }
  };

  /**
   * 
   * @param {object} data Object with the status and message of an action
   * @param {string} token String of sactum token
   * @returns if fails return {ok:false,stauts}
   */
  const log = async (data, token = null) => {
    try {
      let response = await fetch(`${url}/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token ?? getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return { ok: false, status: response.status };
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 
   * @param {number} page Number of the page tho search
   * @returns Returns {ok:false,status} if fails
   */
  const cars = async (page = 1) => {
    try {
      let response = await fetch(`${url}/posts?page=${page}`);

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
        };
      }
      let data = await response.json();

      setPosts(data.data);
      setPage(data.current_page);
      setLastPage(data.last_page);
    } catch (error) {
      return {
        ok: false,
        error: error
      };
    }
  };

  /**
   * 
   * @param {object} formData Object with data of the form 
   * @returns Returns {ok:true,message,data} if no have error, if not returns {ok:false,status,error}
   */
  const createPost = async (formData) => {
    try {
      let response = await fetch(`${url}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/json",
        },
        body: formData
      });

      let data = await response.json();
      if (!response.ok) {
        log(
          {
            status: response.status,
            message: "Add post",
          },
          getToken()
        );
        return {
          ok: false,
          status: response.status,
          error: data
        }
      }
      log(
        {
          status: response.status,
          message: "Create Post",
        },
        getToken()
      );

      return { ok: true, message: "Post has been created!", post: data.post }
    } catch (error) {
      return { ok: false }
    }
  }

  /* Favorites */
  const [favorites, setFavorites] = useState(new Set());
  /**
   * 
   * @returns Returns if fails {}
   */
  const loadFavorites = async () => {
    const response = await fetch(`${url}/favorites`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      if (response.status == 401) {
        showError("Token expired");
        return;
      }
    }
    const data = await response.json();
    setFavorites(new Set(data));
  };

  /**
   * 
   * @param {number} postId Number id of a post 
   * @returns if fails show error and go back
   */
  const toggleFavorite = async (postId) => {
    const response = await fetch(`${url}/toggle/${postId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      if (response.status == 401) {
        showError("Token expired");
        return;
      }
    }
    const data = await response.json();

    setFavorites((prev) => {
      const copy = new Set(prev);
      data.favorited ? copy.add(postId) : copy.delete(postId);
      return copy;
    });
  };
  /**
   * 
   * @returns Returns all posts that are favorite of the user logged
   */
  const favoritePosts = async () =>{
    try{
      let response = await fetch(`${url}/favorites/posts`,{
        method:"GET",
        headers:{
          Authorization: `Bearer ${getToken()}`
        }
      });

      if(!response.ok){
        return {
          ok:false,
          status: response.status
        }
      }

      let data = await response.json();

      return{ok:true,favoritePosts: data.favoritePosts}
    }catch(error){

    }
  }
  /**
   * 
   * @param {number} postId Number id of a post  
   * @returns true is id post is there, false if not
   */
  const isFavorite = (postId) => favorites.has(postId);

  /* Like */
  const [likes, setLikes] = useState(new Set());
  /**
   * 
   * @returns No return nothing only go back if fails and show error.
   */
  const loadLikes = async () => {
    const response = await fetch(`${url}/likes`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      if (response.status == 401) {
        showError("Token expired");
        return;
      }
    }
    const data = await response.json();
    setLikes(new Set(data));
  };

  /**
   * 
   * @param {number} postId Number id of a post 
   * @returns No returns data, is used for go back and show error
   */
  const toggleLikes = async (postId) => {
    const response = await fetch(`${url}/toggleLikes/${postId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      if (response.status == 401) {
        showError("Token expired");
        return;
      }
    }
    const data = await response.json();

    setLikes((prev) => {
      const copy = new Set(prev);
      data.liked ? copy.add(postId) : copy.delete(postId);
      return copy;
    });

    return data;
  };
/**
 * 
 * @param {number} postId Number id of a post 
 * @returns Returns true if id exists else false
 */
  const isLikes = (postId) => likes.has(postId);

  /**
   * 
   * @param {number} idPost Number id of a post 
   * @returns if fails return {ok:false,status} or {ok:true,post} if is good
   */
  const postDetails = async (idPost) => {
    try {
      let response = await fetch(`${url}/details/${idPost}`);

      if (!response.ok) return { ok: false, status: response.status };

      let data = await response.json();

      return { ok: true, post: data };
    } catch (error) {
      return {
        ok: false,
        status: response.status,
      };
    }
  };

  /**
   * 
   * @param {number} idPost Number id of a post
   * @returns If is good {ok:true} else {ok:false,status}
   */
  const deletePost = async (idPost) => {
    try {
      let response = await fetch(`${url}/posts/delete/${idPost}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        log(
          {
            status: response.status,
            message: "Delete post, idPost: " + idPost,
          },
          getToken()
        );
        return {
          ok: false,
          status: response.status
        }
      }
      log(
        {
          status: response.status,
          message: "Delete post ",
        },
        getToken()
      );
      return { ok: true }
    } catch (error) {
      return {
        ok: false
      }
    }
  }
/**
 * 
 * @param {number} idPost Number id of a post
 * @param {object} form Object of form data 
 * @returns Return if fails {ok:false,status} else {ok:true,message}
 */
  const editPost = async (idPost, form) => {
    try {
      let response = await fetch(`${url}/editPost/${idPost}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/json"
        },
        body: form
      });

      if (!response.ok) {
        log(
          {
            status: response.status,
            message: "edit post , idPost: " + idPost,
          },
          getToken()
        );
        return {
          ok: false,
          status: response.status
        }
      }

      let data = await response.json();

      log(
        {
          status: response.status,
          message: "Edit Post, id: " + idPost,
        },
        getToken()
      );
      return {
        ok: true,
        message: data.message
      }
    } catch (error) {
      return { ok: false, error: error };
    }
  }
  /**
   * 
   * @param {URLSearchParams} params UrlSearchParams with all params to search
   * @returns returns Returns {ok:false,status} if fails else {ok:true}
   */
  const filterPosts = async (params) => {
    try {
      let response = await fetch(`${url}/filterPosts?${params.toString()}`);

      if (!response.ok) {
        return { ok: false, status: response.status }
      }

      let data = await response.json();

      setPosts(data.data);
      setPage(data.current_page);
      setLastPage(data.last_page);
      return { ok: true }
    } catch (error) {

    }
  }



  /*Comments*/

  /**
   * 
   * @param {number} postID Number id of post 
   * @returns Return {ok:false,status} if fails else {ok:true,comment:data}
   */
  const getComments = async (postID) => {
    try {
      let response = await fetch(`${url}/posts/${postID}/comments`);

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
        };
      }

      let data = await response.json();

      return {
        ok: true,
        comment: data,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  };
  /**
   * Crate and save comment to post
   * @param {object} comment Object with data of the form 
   * @param {number} postID Number id of a post
   * @returns Returns {ok:false,status} if fails else {ok:true,message,data}
   */
  const saveComment = async (comment, postID) => {
    try {
      let response = await fetch(`${url}/posts/${postID}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(comment)
      });

      if (!response.ok) {
        log(
          {
            status: response.status,
            message: "Create comment, idPost: " + postID,
          },
          getToken()
        );
        return {
          ok: false,
          status: response.status,
        }
      }

      let data = await response.json();
      log(
        {
          status: response.status,
          message: "Add comment in post, id: " + postID,
        },
        getToken()
      );
      return {
        ok: true,
        message: data.message,
        data: data
      }

    } catch (error) {
      return {
        ok: false,
        status: response.status
      }
    }

  }

  /**
   * 
   * @param {number} idComment Number id of a comment 
   * @returns Returns {ok:false,status} if fails else {ok:true}
   */
  const deleteComment = async (idComment) => {
    try {
      let response = await fetch(`${url}/comments/${idComment}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        log(
          {
            status: response.status,
            message: "Delete comment, idComent: " + idComment,
          },
          getToken()
        );
        return {
          ok: false,
          status: response.status
        }
      }
      log(
        {
          status: response.status,
          message: "Delete comment",
        },
        getToken()
      );

      return { ok: true }
    } catch (error) {
      return {
        ok: false
      }
    }
  }


  /* private functions */
  /**
   * 
   * @param {object} userData Object with form data 
   * @returns Returns an FormData
   */
  const formData = (userData) => {
    const formData = new FormData();
    if (userData.name) formData.append("name", userData.name);
    if (userData.surname) formData.append("surname", userData.surname);
    if (userData.username) formData.append("username", userData.username);
    if (userData.email) formData.append("email", userData.email);
    if (userData.password) formData.append("password", userData.password);
    if (userData.password_confirmation)
      formData.append("password_confirmation", userData.password_confirmation);
    if (userData.born_date) formData.append("born_date", userData.born_date);
    if (userData.role) formData.append("role", userData.role);
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }
    return formData;
  };

  /**
   * 
   * @returns Saved token in localStorage
   */
  const getToken = () => {
    return localStorage.getItem("token");
  };

  /**
   * 
   * @returns Returns true if user is saved in localeStorage else false
   */
  const isLogged = () => {
    return JSON.parse(localStorage.getItem("user")) ? true : false;
  };


  /*Load posts */
  useEffect(() => {
    cars(page);
  }, [page]);

/*Load citys data api */
  useEffect(() => {
    const citys = async () => {
      try {
        await fetch("https://countriesnow.space/api/v0.1/countries/population/cities/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "order": "asc",
            "orderBy": "name", country: "Spain"
          })
        })
          .then(res => res.json())
          .then(data => {
            setCity(data.data);
          })
          .catch(err => {
            console.error("Error:", err);
          });
      } catch (error) {
        console.log(error);
      }
    }
    citys();
  }, []);

  /*return all functions and data to the provider */
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isLogged,
        logout,
        register,
        profile,
        setTokenFromGoogle,
        completProfile,
        log,
        posts,
        setPosts,
        page,
        lastPage,
        setPage,
        getToken,
        toggleFavorite,
        isFavorite,
        favorites,
        likes,
        toggleLikes,
        isLikes,
        postDetails,
        getComments,
        saveComment,
        deleteComment,
        deletePost,
        cities,
        createPost,
        cars,
        editPost,
        filterPosts,
        favoritePosts
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
