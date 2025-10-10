import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-200 p-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-4">
          🌿 Login Now!
        </h1>
        <p className="text-center text-green-600 mb-6 text-sm md:text-base">
          Welcome back to <span className="font-semibold">GardeningHub</span> — let’s keep growing together 🌱
        </p>

        {/* Form */}
        <form className="space-y-4">
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

          {/* Password */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Enter your password"
            />
            <div className="mt-2">
              <a className="link text-green-600 hover:text-green-800 text-sm">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-green-500 hover:bg-green-600 text-white border-none transition-all duration-200 shadow-md mt-1"
          >
            🌼 Login 🌼
          </button>

          {/* Register Redirect */}
          <p className="text-center mt-2 text-green-700">
            Don’t have an account?{" "}
            <Link
              to="/auth/register"
              className="font-bold text-secondary hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
