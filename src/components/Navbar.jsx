import React, { useContext, useEffect, useState } from "react"; // <-- Added useState
import { Link, NavLink } from "react-router";
import gardeningHub from "../assets/logo.jpg";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeToggle = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

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
        setShowLogout(false); // <-- Hide logout button after logging out
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Logout Failed 😢",
          text: "Try again logout",
          background: "#fef2f2",
          color: "#991b1b",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  //  logout button  
  const showingLogout = () => (
    <button
      onClick={handleLogout}
      className="btn btn-secondary text-white font-bold btn-sm mt-2"
    >
      Logout
    </button>
  );

  // Public links
  const commonLinks = (
    <>
      <li className="font-bold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline text-green-600 font-bold" : "hover:underline"
          }
        >
          Home
        </NavLink>
      </li>

      <li className="font-bold">
        <NavLink
          to="/exploreGarden"
          className={({ isActive }) =>
            isActive ? "underline text-green-600 font-bold" : "hover:underline"
          }
        >
          Explore Gardeners
        </NavLink>
      </li>

      <li className="font-bold">
        <NavLink
          to="/browseTips"
          className={({ isActive }) =>
            isActive ? "underline text-green-600 font-bold" : "hover:underline"
          }
        >
          Browse Tips
        </NavLink>
      </li>
    </>
  );

  // Private links
  const extraLinks = (
    <>
      <li className="font-bold">
        <NavLink
          to="/shareGardeners"
          className={({ isActive }) =>
            isActive ? "underline text-green-600 font-bold" : "hover:underline"
          }
        >
          Share a Garden Tip
        </NavLink>
      </li>

      <li className="font-bold">
        <NavLink
          to="/myTips"
          className={({ isActive }) =>
            isActive ? "underline text-green-600 font-bold" : "hover:underline"
          }
        >
          My Tips
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar shadow-sm px-4 z-15 relative">
      {/* LEFT: Logo + Mobile Menu */}
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

          {/* Mobile Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow flex flex-col gap-3"
          >
            {user ? (
              <>
                {commonLinks}
                {extraLinks}
              </>
            ) : (
              commonLinks
            )}
          </ul>
        </div>

        {/* Logo */}
        <a className="btn btn-ghost text-xl">
          <img className="w-20" src={gardeningHub} alt="Logo" />
        </a>
      </div>

      {/* CENTER: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex flex-row gap-5">
          {user ? (
            <>
              {commonLinks}
              {extraLinks}
            </>
          ) : (
            commonLinks
          )}
        </ul>
      </div>

      <div className={`navbar-end gap-3 ${showLogout ? "pr-15" : ""}`}>
        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={handleThemeToggle} />
          <MdOutlineLightMode className="swap-off fill-current w-6 h-6" />
          <FaRegMoon className="swap-on fill-current w-6 h-6" />
        </label>

        {user ? (
          <div className="relative">
            <div
              onClick={() => setShowLogout(!showLogout)}
              className="avatar cursor-pointer"
            >
              <div className="w-10 rounded-full border-2 border-green-500">
                <img
                  src={user.photoURL}
                  alt="User"
                  referrerPolicy="no-referrer"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName || "User"}
                />
                <Tooltip id="user-tooltip"></Tooltip>
              </div>
            </div>

            {showLogout && (
              <div className="absolute left-11 top-0 mt-0">
                {showingLogout()}
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth/login">
            <button className="btn btn-outline text-white font-bold btn-sm bg-green-400">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
