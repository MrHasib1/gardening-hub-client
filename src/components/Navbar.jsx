import React, { use } from "react";
import { NavLink } from "react-router";
import gardeningHub from "../assets/logo.jpg";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const links = (
    <>
      <li className="font-bold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="/exploreGarden">Explore Gardeners</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="/browseTips">Browse Tips</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="/shareGardeners">Share a Garden Tip</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="/browseTips">My Tips</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successfully",
          color: "#065f46",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "mt-6 rounded-2xl shadow-lg border border-green-200",
          },
        });
      })
      .catch((error) => {
        // An error happened.
        Swal.fire({
          icon: "error",
          title: "Logout Failed 😢",
          text: "try again logout",
          background: "#fef2f2",
          color: "#991b1b",
          confirmButtonColor: "#dc2626",
          confirmButtonText: "Ok",
        });
      });
  };
  return (
    <div className="navbar shadow-sm  ">
      {/* Left: Logo + Dropdown for mobile */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow flex flex-col gap-3 text-black"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img className="w-20" src={gardeningHub} alt="" />
        </a>
      </div>

      {/* Center: Horizontal Menu for Large Screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex flex-row gap-5">
          {links}
        </ul>
      </div>

      {/* Right: Login Button */}
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
              </div>
            </div>
            <button
              onClick={() => handleLogout()}
              className="btn btn-secondary text-white font-bold btn-sm  "
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline text-white font-bold btn-sm bg-green-400">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
