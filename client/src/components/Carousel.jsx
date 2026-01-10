import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ images }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    arrows: false,
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <Slider ref={sliderRef} {...settings} className="absolute top-0 left-0 w-full h-full">
        {images.map((img, index) => (
          <div key={index} className="w-full h-full">
            <img
              src={"http://localhost/storage/" + img.path}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>

      {/* Botones */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 z-10"
      >
        ◀
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 z-10"
      >
        ▶
      </button>
    </div>
  );
}
