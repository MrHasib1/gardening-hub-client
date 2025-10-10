import React from "react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-200 p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-4">
          🌱 Register Now!
        </h1>
        <p className="text-center text-green-600 mb-6 text-sm ">
          🌿 Join our Gardening Community and share plants 🌿
        </p>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Photo URL
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Paste your profile photo URL"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Create a strong password"
            />

            <a className="link text-green-600 hover:text-green-800 text-sm ">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-green-500 hover:bg-green-600 text-white border-none transition-all duration-200 shadow-md "
          >
            🌼 Register 🌼
          </button>

          {/* Login Redirect */}
          <p className="text-center mt-1 text-green-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-bold text-secondary hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
