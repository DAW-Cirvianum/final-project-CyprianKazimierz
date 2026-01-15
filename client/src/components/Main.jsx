import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../general";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiLike,BiSolidLike } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import Carousel from "./Carousel";
import SpeedDial from "./SpeedDial";
import { useTranslation } from "react-i18next";

import "../css/index.css";
export default function Main() {
  //variables
  const { posts, setPosts, page, lastPage, setPage, isLogged, favorites, toggleFavorite, isFavorite, isLikes, toggleLikes, likes, deletePost } = useContext(AuthContext);
  let user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();

  /**
   * Function to delete post
   * @param {number} postID Number id of a post
   * @returns No returns nothing only to go back
   */
  const handleDelete = async (postID)=>{
    let confirmation = confirm("Are you sure?");
    if(!confirmation) return;

    let response = await deletePost(postID);

    if (!response.ok){
      showError(response.status);
      return;
    }

    setPosts(post => post.filter(n=> n.id !== postID));
  }
  /**
   * Function to change the icon, add like and see it in frontend
   * @param {number} postId Number id of a post
   */
  const handleToggleLike = async (postId) => {
  const result = await toggleLikes(postId);
  if (!result.ok) {
      if (result.status == 401) {
        showError("Token expired");
        return;
      }
    }
  setPosts(prev =>
    prev.map(post =>
      post.id === postId
        ? { ...post, liked_count: result.likes_count }
        : post
    )
  );
};

// if there arent posts shows a message
  if(posts.length == 0 || posts === null) return (<div className="flex justify-center mt-20">{t("notFoundPost")}</div>);
 
  return (
    <div className="container mx-auto my-10">
      {/*button that shos options, now only add post */}
     <SpeedDial/>

      {/*Card of Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full" onClick={() => isLogged()? navigate(`/details/${post.id}`):navigate(`/home/details/${post.id}`)}
          >
            <div onClick={(e)=>e.stopPropagation()} > 
             <Carousel images={post.images} />
            </div>
        
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-red-600 text-3xl font-semibold">
                {post.price} €
              </p>

           
              <div className="mt-4 text-lg text-gray-500 flex flex-row justify-between items-center" onClick={(e) => e.stopPropagation()}>
                <span>{`${post.location} - ${post.year} - ${post.km}km - ${post.fuel}`}</span>
                { (isLogged()) ? (<div className="gap-2 flex flex-row">
                  <div>
                      <button onClick={() => toggleFavorite(post.id)} className="bg-white border-0 outline-none focus:outline-none">
                        {isFavorite(post.id) ? (
                          <FaHeart className="text-red-500 text-2xl" />
                        ) : (
                          <FaRegHeart className="text-gray-400 text-2xl" />
                        )}
                         
                      </button>
                  </div>
                  <div className="flex items-center"><button onClick={() => handleToggleLike(post.id)} className="bg-white border-0 outline-none focus:outline-none">
                        {isLikes(post.id) ? (
                          <BiLike className="text-blue-500 text-2xl" />
                          
                        ) : (
                          <BiSolidLike className="text-gray-400 text-2xl" />
                         
                        )}
                        
                      </button> <p>{post.liked_count}</p></div>
                </div>): (<p>Num likes: {post.liked_count}</p>)}
               
              </div>
              {isLogged() && post.user_id == user.id &&(<div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
              <button className="bg-transparent text-black" onClick={()=> navigate(`editPost/${post.id}`)} >
               <MdModeEditOutline/>
               </button>
               <button className="bg-transparent text-black" onClick={()=>handleDelete(post.id)}><FaRegTrashCan/></button>
               </div>)}
            </div>
          </div>
        ))}
      </div>
      {/*Buttons */}
      <div className="flex flex-row items-center justify-center gap-3 mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l text-color">
          {t("prev")}
        </button>
        <p className="text-color">
          {t("page")} {page} {t("from")} {lastPage}
        </p>
        <button disabled={page === lastPage} onClick={() => setPage(page + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l text-color">
          {t("next")}
        </button>
      </div>
    </div>
  );
}
