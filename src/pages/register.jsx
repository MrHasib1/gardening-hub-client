import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, setUser } = use(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    console.log(name, email, password, photo);

    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const specialChar = /[!@#%^&*(),.?":<>|{}]/.test(password);
    const LongPassword = password.length >= 8;
    if (!upperCase || !lowerCase || !specialChar || !LongPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The password should be at least 8 characters and include 1 uppercase, 1 lowercase, and a special character.!",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "🎉 Account Register Successfully",
          color: "#065f46",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "mt-6 rounded-2xl shadow-lg border border-green-200",
          },
        });
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Registration Failed 😢",
          text: errorMessage,
          background: "#fef2f2",
          color: "#991b1b",
          confirmButtonColor: "#dc2626",
          confirmButtonText: "Try Again",
        });
        // ..
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-200 p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-4">
          🌱 Register Now! 🌱
        </h1>
        <p className="text-center text-green-600 mb-6 text-sm ">
          🌿 Join our Gardening Community and share plants 🌿
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Photo URL
            </label>
            <input
              name="photo"
              type="text"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Paste your profile photo URL"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label-text text-green-700 font-semibold">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full focus:border-green-500 focus:ring-green-400"
              placeholder="Create a strong password"
              required
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
