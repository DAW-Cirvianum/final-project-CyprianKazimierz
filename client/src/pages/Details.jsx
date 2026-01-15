import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError, formatDateDMY } from "../general";
import { IoChevronBack } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import "../css/index.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Carousel from "../components/Carousel";

export default function Details() {
  //Variables
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { postDetails } = useContext(AuthContext);
  const {
    isLogged,
    favorites,
    toggleFavorite,
    isFavorite,
    isLikes,
    toggleLikes,
    likes,
    getComments,
    saveComment,
    deleteComment
  } = useContext(AuthContext);

  const [details, setDetails] = useState(null);
  const [comments, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputTxt, setInputTxt] = useState(null);
  let user = JSON.parse(localStorage.getItem("user"));

  //In load get the post and save it
  useEffect(() => {
    const fetchDetails = async () => {
      const result = await postDetails(id);

      if (!result.ok) {
        if (response.status == 401) {
          showError("Token expires");
          setTimeout(() => { navigate("/home"); }, 2000);
          return;
        }
        if (result.status === 404) {
          showError("No exists post");
          return;
        }
        showError("No se pudo cargar el post");
        return;
      }

      setDetails(result.post);
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  //comments
  //In load get and save all coments of the post
  useEffect(() => {
    const fetchDetails = async () => {
      const result = await getComments(id);

      if (!result.ok) {
        if (response.status == 401) {
          showError("Token expires");
          setTimeout(() => { navigate("/home"); }, 2000);
          return;
        }
        showError(result.status);
        return;
      }

      setComment(result.comment);
    };
    fetchDetails();
  }, []);

  if (loading)
    return <p className="flex justify-center items-center">Loading...</p>;
  if (!details)
    return (
      <p className="flex justify-center items-center">Do not exists this post</p>
    );

    /**
     * Function to save Comments
     * @param {event} e Event of the form white the inputs
     */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputTxt?.trim()) return;
    let obj = {
      txt: inputTxt,
    };

    let response = await saveComment(obj, id);

    if (!response.ok) {
      if (response.status == 401) {
        showError("Token expires");
        return;
      }
      showError(response.status + "crear commentari");
      return;
    }
    setComment(com => [...com, response.data.comment]);

    setInputTxt("");

    toast.success(response.message, {
      toastId: "success-singin",
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });
  };

  /**
   * Function to delete a comment
   * @param {number} idComment Number id of the comment
   */
  const handleDelete = async (idComment) => {
    const result = await deleteComment(idComment);

    if (!result.ok) {
      showError("Error trying to delte the comment");
      return;
    }

    setComment(prev => prev.filter(c => c.id !== idComment));
  };

  return (
    <div className="container mx-auto my-auto flex justify-center flex-col items-center">
      <title>Details</title>
      <div className="flex flex-row gap-10">
        <div>
          <div className="bg-white text-black flex items-center justify-center gap-20 details p-3 mb-2">
            <button onClick={() => navigate(-1)} className="bg-transparent text-black">
              <IoChevronBack />
            </button>
            <div className="flex gap-4">
              <p className="text-red-800 text-lg">{details.price}€</p>
              <p className="text-lg">{details.title}</p>
            </div>
            {isLogged() && (
              <div>
                <button
                  onClick={() => toggleFavorite(details.id)}
                  className="bg-transparent border-0 outline-none focus:outline-none"
                >
                  {isFavorite(details.id) ? (
                    <FaHeart className="text-red-500 text-2xl" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-2xl" />
                  )}
                </button>
                <button
                  onClick={() => toggleLikes(details.id)}
                  className="bg-transparent border-0 outline-none focus:outline-none"
                >
                  {isLikes(details.id) ? (
                    <BiLike className="text-blue-500 text-2xl" />
                  ) : (
                    <BiSolidLike className="text-gray-400 text-2xl" />
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="detailsIMG">
            <Carousel images={details.images} />
          </div>

          <div className="bg-white text-black p-4 mt-5 details">
            <p className="mb-3">
              {t("postCreatedAt")} {formatDateDMY(details.created_at)}
            </p>
            <h1 className="text-3xl font-bold">{details.title}</h1>
            <div className="detail-item">
              <h3>{t("description")}</h3>
              <p className="description">{details.description}</p>
            </div>

            <p className="text-red-500 text-xl">{details.price} €</p>

            <div className="flex items-center gap-2 p-4">
              <img src={"http://localhost/storage/" + details.user.avatar} alt="Avatar of the user that comment" width={45} height={45} className="rounded-full" />
              <p>{details.user.name}</p>
            </div>
          </div>

          <div className="bg-white text-black p-4 mt-5 details">
            <h2 className="text-2xl font-bold">{t("details")}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("year")}</th>
                  <th>{t("km")}</th>
                  <th>{t("location")}</th>
                  <th>{t("bodywork")}</th>
                  <th>{t("motor")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Year">{details.year}</td>
                  <td data-label="KM">{details.km}</td>
                  <td data-label="Location">{details.location}</td>
                  <td data-label="Bodywork">{details.bodywork}</td>
                  <td data-label="Motor">{details.motor}</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th>{t("mark")}</th>
                  <th>{t("model")}</th>
                  <th>{t("color")}</th>
                  <th>{t("fuel")}</th>
                  <th>{t("numDoors")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Mark">{details.mark}</td>
                  <td data-label="Model">{details.model}</td>
                  <td data-label="Color">{details.color}</td>
                  <td data-label="Fuel">{details.fuel}</td>
                  <td data-label="Doors">{details.doors}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* */}
        <div className="bg-white text-black p-5 comments">
          <h1 className="flex justify-center font-bold-500">{t("comments")}</h1>
          {isLogged() && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="comment">{t("pComment")}:</label>
                <textarea
                  name="comment"
                  id="comment"
                  maxLength="250"
                  rows="4"
                  wrap="hard"
                  pattern="^[a-zA-Z,.!?' ]+$"
                  value={inputTxt || ""}
                  onChange={(e) => setInputTxt(e.target.value)}
                  className="bg-gray-300 border rounded-md border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                ></textarea>
                <button
                  type="submit"
                  className="mt-3 text-white bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none w-full"
                >
                  {t("send")}
                </button>
              </div>
            </form>
          )}
          <hr className="bg-black border-3 mt-2 mb-4" />
          {comments.map((comment) => (
            <div className="mb-3 border rounded text-black" key={comment.id}>
              {isLogged() && comment.user.id == user.id && (<p className="flex justify-end mt-3 me-3"><FaRegTrashCan onClick={() => handleDelete(comment.id)} /></p>)}
              <p className="mt-3 ms-4">{comment.txt}</p>
              <div className="flex items-center gap-2 justify-between p-4">
                {comment.user.avatar.includes("avatars") ? (<img src={"http://localhost/storage/" + comment.user.avatar} alt="Avatar of the user that comment" width={45} height={45} className="rounded-full" />) : (<img src={comment.user.avatar} alt="Avatar of the user that comment" width={45} height={45} className="rounded-full" />)}
                <p>{comment.user.name}</p>
                <p>{formatDateDMY(comment.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
