import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError } from "../general";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function AddPost() {
  const [doors, setDoors] = useState(2);
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation();
  const { cities, createPost, cars, setPage } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Function to manage File upload
   * @param {event} e  Event of images of post
   * @returns 
   */
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      alert("You can upload up to 4 images only");
      e.target.value = null;
      return;
    }

    setImages(files);
  };

  /**
   * Function to manage the form and send the data to store
   * @param {event} e Event of form 
   * @returns No returns is only to go back if fails
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let response = await createPost(formData);

    if (!response.ok) {
      if (response.status == 401) {
        showError("Token expires");
        setTimeout(() => { navigate("/home"); }, 2000);
        return;
      }
      if (response.status == 422) {
        const errors = Object.values(response.error.errors);
        errors.forEach((messages, index) => {
          messages.forEach((msg) => {
            showError(msg, index);
          });
        });
        return;
      }
      showError("You will have intruduce something wrong, pleas check and try again");
      return;
    }

    toast.success(response.message, {
      toastId: "success-singin",
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });
    // one time is added we get all first 5 posts, because the new will stored at the begining
    await cars(1);
    setPage(1);
    
    navigate("/");
  };

  return (
    <div className="container mx-auto my-10 flex justify-center px-4">
      <form
        className="bg-white text-black w-full max-w-4xl p-8 rounded-xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">{t("createPostTitle")}</h2>

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
              placeholder="Enter title"
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
              placeholder="Enter price"
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
              placeholder="Enter mark"
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
              placeholder="Enter model"
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
              placeholder="Enter year"
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
              placeholder="Enter kilometers"
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
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="manual">{t("manual")}</option>
              <option value="automatic">{t("automatic")}</option>
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
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Disel">{t("disel")}</option>
              <option value="Gasoline">{t("gasoline")}</option>
              <option value="Electric">{t("electric")}</option>
              <option value="Hybrid">{t("hybrid")}</option>
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
              {t("city")}
            </label>
            <select
              name="location"
              id="location"
              required
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
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Row 7: Images */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">{t("images")} (max 4)</label>

          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            name="images[]"
            onChange={handleImagesChange}
            className="border border-gray-300 rounded-md p-2"
          />

          {images.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {images.length} {t("imgSelected")}
            </p>
          )}
        </div>
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
            placeholder="Write a description..."
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition"
        >
          {t("createPost")}
        </button>
      </form>
    </div>
  );
}
