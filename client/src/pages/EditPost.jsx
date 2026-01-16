import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError } from "../general";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "../css/index.css"

export default function EditPost() {
  //Variables 
  const { id } = useParams();
  const navigate = useNavigate();
  const { postDetails, cities, editPost, cars, setPage } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    mark: "",
    model: "",
    year: "",
    km: "",
    motor: "manual",
    fuel: "Diesel",
    bodywork: "Berlina",
    color: "Red",
    location: "",
    doors: 2,
    description: "",
  });

  //In load get the post
  useEffect(() => {
    const getPost = async () => {
      let response = await postDetails(id);

      if (!response.ok) {
        if (response.status == 401) {
          showError("Token expires");
          return;
        }
        if (response.status === 404) {
          showError("No exists post");
          return;
        }
        showError("No se pudo cargar el post");
        return;
      }
      let post = response.post;
      setFormData({
        title: post.title,
        price: post.price,
        mark: post.mark,
        model: post.model,
        year: post.year,
        km: post.km,
        motor: post.motor,
        fuel: post.fuel,
        bodywork: post.bodywork,
        color: post.color,
        location: post.location,
        doors: post.doors,
        description: post.description,
      });
      setImages(post.images || []);
      setLoading(false);
    };
    getPost();
  }, [id]);


  //if is loading whe show it, if we dont get the post yet, we will show that is loading
  if (loading) return <p>{t("loading")}...</p>


  /**
   * Function  to remove existing img
   */
  const handleRemoveExistingImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /**
   * Function to manage new files images
   * @param {event} e Event of the form with the inputs 
   */
  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length + newImages.length > 4) {
      showError("you can have up to 4 images in total");
      e.target.value = null;
      return;
    }

    setNewImages([...newImages, ...files]);
  };

  /**
   * Function to remove  the new images 
   */
  const handleRemoveNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  /**
   * Function to send edited post
   * @param {event} e Event of the form with inputs 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    newImages.forEach((file) => {
      form.append("new_images[]", file);
    });

    form.append("existing_images", JSON.stringify(images.map(img => img.id)));

    let response = await editPost(id, form);

    if (!response.ok) {
      if (response.status == 401) {
        showError("Token expired");
        return;
      }
      showError(response.status);
      return;
    }

    toast.success(response.message, {
      toastId: "success-singin",
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });


    await cars(1);
    setPage(1);

    navigate("/");

  }
  return (
    <div className="container mx-auto my-10 flex justify-center px-4">
      <title>Edit Post</title>
      <form
        className="bg-white text-black w-full max-w-4xl p-8 rounded-xl shadow-md space-y-6"
        onSubmit={handleSubmit}
          aria-labelledby="Edit post"
      >
        <h2 className="text-2xl font-bold text-center mb-6">{t("editPost")}</h2>

        {/* Row 1: Title & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 font-medium">
              {t("title")}
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              maxLength={255}
              pattern=".{3,}"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 font-medium">
              {t("price")} (€)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              min="0"
              max="99999999"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Row 2: Mark & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="mark" className="mb-1 font-medium">
              {t("mark")}
            </label>
            <input
              type="text"
              name="mark"
              id="mark"
              required
              maxLength={100}
              pattern="[A-Za-z0-9\s\-]{2,}"
              value={formData.mark}
              onChange={(e) =>
                setFormData({ ...formData, mark: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="model" className="mb-1 font-medium">
              {t("model")}
            </label>
            <input
              type="text"
              name="model"
              id="model"
              required
              maxLength={100}
              pattern="[A-Za-z0-9\s\-]{1,}"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Row 3: Year & KM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="year" className="mb-1 font-medium">
              {t("year")}
            </label>
            <input
              type="number"
              name="year"
              id="year"
              required
              min="1900"
              max={new Date().getFullYear()}
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="km" className="mb-1 font-medium">
              {t("km")}
            </label>
            <input
              type="number"
              name="km"
              id="km"
              required
              min="0"
              max="999999"
              maxLength="6"
              value={formData.km}
              onChange={(e) =>
                setFormData({ ...formData, km: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Row 4: Transmission & Fuel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="motor" className="mb-1 font-medium">
              {t("motor")}
            </label>
            <select
              name="motor"
              id="motor"
              required
              value={formData.motor}
              onChange={(e) =>
                setFormData({ ...formData, motor: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="manual"> {t("manual")}</option>
              <option value="automatic"> {t("automatic")}</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="fuel" className="mb-1 font-medium">
              {t("fuel")}
            </label>
            <select
              name="fuel"
              id="fuel"
              required
              value={formData.fuel}
              onChange={(e) =>
                setFormData({ ...formData, fuel: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Diesel"> {t("disel")}</option>
              <option value="Gasoline"> {t("gasoline")}</option>
              <option value="Electric"> {t("electric")}</option>
              <option value="Hybrid"> {t("hybrid")}</option>
            </select>
          </div>
        </div>

        {/* Row 5: Bodywork & Color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="bodywork" className="mb-1 font-medium">
              {t("bodywork")}
            </label>
            <select
              name="bodywork"
              id="bodywork"
              required
              value={formData.bodywork}
              onChange={(e) =>
                setFormData({ ...formData, bodywork: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Berlina">Berlina</option>
              <option value="Familiar">Familiar</option>
              <option value="Coupe">Coupe</option>
              <option value="Monovolume">Monovolume</option>
              <option value="SUV">SUV</option>
              <option value="Cabrio">Cabrio</option>
              <option value="PickUp">Pick Up</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="color" className="mb-1 font-medium">
              {t("color")}
            </label>
            <select
              name="color"
              id="color"
              required
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Red">{t("red")}</option>
              <option value="Blue">{t("blue")}</option>
              <option value="White">{t("white")}</option>
              <option value="Black">{t("black")}</option>
              <option value="Orange">{t("orange")}</option>
              <option value="Pink">{t("pink")}</option>
              <option value="Yellow">{t("yellow")}</option>
              <option value="Purple">{t("purple")}</option>
              <option value="Gray">{t("gray")}</option>
              <option value="Brown">{t("brown")}</option>
            </select>
          </div>
        </div>

        {/* Row 6: Location & Doors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="location" className="mb-1 font-medium">
              {t("location")}
            </label>
            <select
              name="location"
              id="location"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="doors" className="mb-1 font-medium">
              {t("numDoors")}
            </label>
            <input
              type="number"
              name="doors"
              id="doors"
              min="1"
              max="5"
              value={formData.doors}
              onChange={(e) =>
                setFormData({ ...formData, doors: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Imágenes existentes */}
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={"http://localhost/storage/" + img.path}
                alt={`Existing ${index}`}
                className="w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                X
              </button>
            </div>
          ))}

          {/* Imágenes nuevas */}
          {newImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`New ${index}`}
                className="w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveNewImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleNewImagesChange}
          className="mt-2"
        />
        {/* Row 8: Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-medium">
            {t("description")}
          </label>
          <textarea
            name="description"
            id="description"
            rows="6"
            maxLength="255"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition"
        >
          {t("send")}
        </button>
      </form>
    </div>
  );
}
