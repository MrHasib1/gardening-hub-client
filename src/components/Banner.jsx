import React from "react";
import slide1 from "../assets/slide1.avif";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slidee4.jpg";
import { Typewriter } from "react-simple-typewriter";

const slides = [
  {
    img: slide1,
    title: "Welcome to GardeningHub 🌱",
    desc: "Discover the true joy of gardening — where every leaf tells a story, every seed brings hope, and every moment spent nurturing plants connects you to nature in the most beautiful way.",
    btn: "Explore Now",
  },
  {
    img: slide2,
    title: "Grow Together ",
    desc: "Become part of a warm, supportive community of plant lovers who share tips, experiences, and inspiration to help you grow your garden — and your passion — with confidence and joy.",
    btn: "Join Community",
  },
  {
    img: slide3,
    title: "Plant. Care. Share. 🌸",
    desc: "Every seed you plant is a promise to the future — a small act that brings beauty, life, and positivity. Care for your plants, share your journey, and inspire others to create their own green space.",
    btn: "Get Started",
  },
  {
    img: slide4,
    title: "Your Garden, Your Story 🌻",
    desc: "Your garden reflects your passion, creativity, and love for nature. Capture its beauty, share your story with others, and inspire a world where everyone grows a little greener every day.",
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
            <p className="text-green-600 text-base md:text-lg">
              <Typewriter
                words={[slide.desc]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={20}
                delaySpeed={2000}
              ></Typewriter>
            </p>
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
