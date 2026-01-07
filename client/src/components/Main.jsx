import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../general";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiLike,BiSolidLike } from "react-icons/bi";
import "../css/index.css";
export default function Main() {
  const { posts, page, lastPage, setPage, isLogged, favorites, toggleFavorite, isFavorite, isLikes, toggleLikes, likes } = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full" onClick={() => isLogged()? navigate(`/details/${post.id}`):navigate(`/home/details/${post.id}`)}
          >
            <img
              src={post.image_url}
              alt={post.title}
              className="w-90 h-49 object-cover"
            />

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
            </div>
          </div>
        ))}
      </div>
      {/*Buttons */}
      <div className="flex flex-row items-center justify-center gap-3 mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <span>
          Page {page} from {lastPage}
        </span>
        <button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
