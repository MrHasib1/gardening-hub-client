import React from "react";
import slide1 from "../assets/slide1.avif";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slidee4.jpg";

const slides = [
  {
    img: slide1,
    title: "Welcome to GardeningHub 🌱",
    desc: "Discover the joy of gardening — from growing your own plants to sharing them with the world.",
    btn: "Explore Now",
  },
  {
    img: slide2,
    title: "Grow Together ",
    desc: "Join a vibrant community of nature lovers and plant enthusiasts.",
    btn: "Join Community",
  },
  {
    img: slide3,
    title: "Plant. Care. Share. 🌸",
    desc: "Every seed you plant is a step towards a greener tomorrow.",
    btn: "Get Started",
  },
  {
    img: slide4,
    title: "Your Garden, Your Story 🌻",
    desc: "Showcase your green space and inspire others to grow with you.",
    btn: "Share Now",
  },
];

const Banner = () => {
  return (
    <div className="carousel w-full h-[450px] md:h-[550px] rounded-b-2xl overflow-hidden relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          id={`slide${index + 1}`}
          className="carousel-item relative w-full flex flex-row items-center bg-green-50"
        >
          {/* Left: Image */}
          <div className="w-[60%]  h-full">
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full "
            />
          </div>

          {/* Right: Text Section */}
          <div className="w-[40%] flex flex-col justify-center items-center text-center p-6 md:p-12 space-y-4">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-green-700">
              {slide.title}
            </h2>
            <p className="text-green-600 text-base md:text-lg">{slide.desc}</p>
            <button className="btn bg-green-500 hover:bg-green-600 text-white border-none shadow-md mt-2">
              {slide.btn}
            </button>
          </div>

          {/* Navigation Buttons */}
          <a
            href={`#slide${index === 0 ? slides.length : index}`}
            className="btn btn-circle absolute top-1/2 left-4  bg-white text-green-700 border-none shadow-md "
          >
            ❮
          </a>
          <a
            href={`#slide${index === slides.length - 1 ? 1 : index + 2}`}
            className="btn btn-circle absolute top-1/2 right-4  bg-white text-green-700 border-none shadow-md "
          >
            ❯
          </a>
        </div>
      ))}
    </div>
  );
};

export default Banner;
