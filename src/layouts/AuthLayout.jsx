import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div>
      <header className="w-11/12 mx-auto">
        <Navbar></Navbar>
      </header>
      <main className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default AuthLayout;
