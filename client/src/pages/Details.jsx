import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError } from "../general";

export default function Details() {
  const { id } = useParams();
  const { postDetails } = useContext(AuthContext);

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const result = await postDetails(id);

      if (!result.ok) {
        showError("No se pudo cargar el post");
        return;
      }

      setDetails(result.post);
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!details) return <p>No existe el post</p>;

  return (
    <div className="container mx-auto my-auto flex justify-center flex-col items-center">
      
      <img src={details.image_url} alt={details.title} width={800} height={800} />
      <div className="bg-white text-black p-4 mt-5">
      <h1 className="text-3xl font-bold">{details.title}</h1>
      <p className="text-red-500 text-xl">{details.price} €</p>
      <p>{details.description}</p>
      </div>
    </div>
  );
}
