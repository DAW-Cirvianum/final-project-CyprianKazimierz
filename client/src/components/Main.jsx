import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../general";
import "../css/index.css"
export default function Main(){
    const { posts, page, lastPage, setPage } = useContext(AuthContext);
    return (
          <div className="container mx-auto my-auto flex justify-center flex-col">
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.price} €</p>
        </div>  
      ))}
      <div className="flex flex-row">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        
      >
        Anterior
      </button>
      <span>Página {page} de {lastPage}</span>
      <button
        disabled={page === lastPage}
        onClick={() => setPage(page + 1)}
      >
        Siguiente
      </button>
      </div>
    </div>
    )
    //mirar com fer el main, si deixar aixins o un outlet i pagina...
}