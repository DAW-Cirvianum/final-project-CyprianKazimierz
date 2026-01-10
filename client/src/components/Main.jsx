import { useState, useContext } from "react";
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

import "../css/index.css";
export default function Main() {
  const { posts, setPosts, page, lastPage, setPage, isLogged, favorites, toggleFavorite, isFavorite, isLikes, toggleLikes, likes, deletePost } = useContext(AuthContext);
  let user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
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

  return (
    <div className="container mx-auto my-10">
     <SpeedDial/>

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

              <p className="text-red-400 text-3xl font-semibold">
                {post.price} €
              </p>

           
              <div className="mt-4 text-lg text-gray-500 flex flex-row justify-between items-center" onClick={(e) => e.stopPropagation()}>
                <span>{`${post.location} - ${post.year} - ${post.km}km - ${post.fuel}`}</span>
                { (isLogged()) && (<div className="gap-2 flex flex-row">
                  <div>
                      <button onClick={() => toggleFavorite(post.id)} className="bg-white border-0 outline-none focus:outline-none">
                        {isFavorite(post.id) ? (
                          <FaHeart className="text-red-500 text-2xl" />
                        ) : (
                          <FaRegHeart className="text-gray-400 text-2xl" />
                        )}
                      </button>
                  </div>
                  <div><button onClick={() => toggleLikes(post.id)} className="bg-white border-0 outline-none focus:outline-none">
                        {isLikes(post.id) ? (
                          <BiLike className="text-blue-500 text-2xl" />
                        ) : (
                          <BiSolidLike className="text-gray-400 text-2xl" />
                        )}
                      </button></div>
                </div>)}
               
              </div>
              {isLogged() && post.user_id == user.id &&(<div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
              <button className="bg-transparent text-black" onClick={()=>console.log("a")} >
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
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Prev
        </button>
        <p>
          Page {page} from {lastPage}
        </p>
        <button disabled={page === lastPage} onClick={() => setPage(page + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Next
        </button>
      </div>
    </div>
  );
}
