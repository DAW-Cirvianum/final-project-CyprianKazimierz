import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError } from "../general";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiLike,BiSolidLike } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import Carousel from "../components/Carousel";
export default function FavoritePosts(){
    let {favorites,favoritePosts,isLogged,isFavorite,isLikes,toggleLikes, setPosts,toggleFavorite} = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem("user"));
    const { t, i18n } = useTranslation();
    const [posts, setPost] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const getFavorites = async () =>{
            let response = await favoritePosts();
            if(!response.ok){
                showError("Expired Token");
                return;
            }
            setPost(response.favoritePosts);
        }
        getFavorites();
    },[]);

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
  setPost(prev =>
    prev.map(post =>
      post.id === postId
        ? { ...post, liked_count: result.likes_count }
        : post
    )
  );
   setPosts(prev =>
    prev.map(post =>
      post.id === postId
        ? { ...post, liked_count: result.likes_count }
        : post
    )
  );
};

    if(posts.length == 0) return (<p className="flex justify-center mt-20">{t("noFavoritePosts")}</p>);
    return (
        <div className="container mx-auto my-10">
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
           </div> 
    )
}