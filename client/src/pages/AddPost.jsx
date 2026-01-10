import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError } from "../general";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function AddPost() {
  const [doors, setDoors] = useState(2);
  const [images, setImages] = useState([]);
  

  const {cities,createPost} = useContext(AuthContext);
   const navigate = useNavigate();

    const handleImagesChange = (e) => {
  const files = Array.from(e.target.files);

  if (files.length > 4) {
    alert("You can upload up to 4 images only");
    e.target.value = null;
    return;
  }

  setImages(files);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);


  let response = await createPost(formData);

  if(!response.ok){
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
    
      setTimeout(()=>{
        navigate("/");
      },3200)
  };

  return (
    <div className="container mx-auto my-10 flex justify-center px-4">
      <form
        className="bg-white text-black w-full max-w-4xl p-8 rounded-xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create a Post</h2>

        {/* Row 1: Title & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              id="title"
           
              placeholder="Enter title"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 font-medium">Price (€)</label>
            <input
              type="number"
              name="price"
              id="price"
              
              placeholder="Enter price"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Row 2: Mark & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="mark" className="mb-1 font-medium">Mark</label>
            <input
              type="text"
              name="mark"
              id="mark"
          
              placeholder="Enter mark"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="model" className="mb-1 font-medium">Model</label>
            <input
              type="text"
              name="model"
              id="model"
           
              placeholder="Enter model"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Row 3: Year & KM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="year" className="mb-1 font-medium">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              
              placeholder="Enter year"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="km" className="mb-1 font-medium">KM</label>
            <input
              type="number"
              name="km"
              id="km"
               
              placeholder="Enter kilometers"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Row 4: Transmission & Fuel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="motor" className="mb-1 font-medium">Transmission</label>
            <select
              name="motor"
              id="motor"
             
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="fuel" className="mb-1 font-medium">Fuel Type</label>
            <select
              name="fuel"
              id="fuel"
          
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Diesel">Diesel</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Row 5: Bodywork & Color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="bodywork" className="mb-1 font-medium">Bodywork</label>
            <select
              name="bodywork"
              id="bodywork"
              
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
            <label htmlFor="color" className="mb-1 font-medium">Color</label>
            <select
              name="color"
              id="color"
          
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Orange">Orange</option>
              <option value="Pink">Pink</option>
              <option value="Yellow">Yellow</option>
              <option value="Purple">Purple</option>
              <option value="Gray">Gray</option>
              <option value="Brown">Brown</option>
            </select>
          </div>
        </div>

        {/* Row 6: Location & Doors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="location" className="mb-1 font-medium">City</label>
            <select
              name="location"
              id="location"
               
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((city,index)=>(<option key={index} value={city.city}>{city.city}</option>))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="doors" className="mb-1 font-medium">Number of Doors</label>
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
  <label className="mb-1 font-medium">Images (max 4)</label>

  <input
    type="file"
    multiple
    accept="image/*"
     name="images[]"
    onChange={handleImagesChange}
    className="border border-gray-300 rounded-md p-2"
  />

  {images.length > 0 && (
    <p className="text-sm text-gray-600 mt-1">
      {images.length} image(s) selected
    </p>
  )}
</div>
        {/* Row 8: Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-medium">Description</label>
          <textarea
            name="description"
            id="description"
            rows="6"
            maxLength="250"
            placeholder="Write a description..."
          
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
