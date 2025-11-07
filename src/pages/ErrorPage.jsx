import React from "react";
import { Link } from "react-router";
import ErrorImg from "../assets/error_404.gif";

const ErrorPage = ({ message }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-200 text-green-800 p-6">
      {/* Error Image */}
      <img
        className="w-10/12 sm:w-7/12 md:w-5/12 lg:w-4/12 mb-6 "
        src={ErrorImg}
        alt="Error 404"
      />

      {/* Message */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-green-700 mb-4">
        🌿 Page Not Found 🌿
      </h1>
      <p className="text-center text-lg sm:text-xl text-green-600 max-w-lg mb-8">
        {message ||
          "Sorry, the page you’re looking for doesn’t exist or may have been moved.Let’s get you back to your garden home!"}
      </p>

      {/* Back Home Button */}
      <Link to="/">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
          🌱 Go Back Home 🌱
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
