import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function SpeedDial() {
  const [open, setOpen] = useState(false);
  let {isLogged} = useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <>
    {isLogged() && (<div className="fixed right-6 bottom-6 flex flex-col items-center z-50" >
      {/* Second button to add post */}
     {open && (
      <>
        <div className="mb-4 space-y-2"  role="menu" aria-hidden={!open}>
          <button className="flex items-center justify-center w-[52px] h-[52px] bg-blue-200 rounded-full shadow-lg" onClick={()=>navigate("/addPost")}  role="menuitem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                strokeWidth="2"
                d="M3.75 4.5L4.5 3.75H10.5L11.25 4.5V10.5L10.5 11.25H4.5L3.75 10.5V4.5ZM5.25 5.25V9.75H9.75V5.25H5.25ZM13.5 3.75L12.75 4.5V10.5L13.5 11.25H19.5L20.25 10.5V4.5L19.5 3.75H13.5ZM14.25 9.75V5.25H18.75V9.75H14.25ZM17.25 20.25H15.75V17.25H12.75V15.75H15.75V12.75H17.25V15.75H20.25V17.25H17.25V20.25ZM4.5 12.75L3.75 13.5V19.5L4.5 20.25H10.5L11.25 19.5V13.5L10.5 12.75H4.5ZM5.25 18.75V14.25H9.75V18.75H5.25Z"
                fill="#080341"
              />
            </svg>
          </button>
        </div>
         <div className="mb-4 space-y-2 md:hidden">
          <button className="flex items-center justify-center w-[52px] h-[52px] bg-blue-200 rounded-full shadow-lg" onClick={()=>navigate("/favoritePosts")}  role="menuitem">
           <FaHeart className="text-red-500"/>
          </button>
        </div>
        </>
      )}
      {/* Button to Show all options */}
      <button
        onClick={() => setOpen(!open)}
          aria-expanded={open}
    aria-haspopup="true"
    aria-label={open ? t("closeMenu") : t("openMenu")}
        className="flex items-center justify-center text-white bg-blue-600 rounded-full w-14 h-14 shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        +
      </button>
    </div>)}
    </>
  );
}
