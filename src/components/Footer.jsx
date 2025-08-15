import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-green-300 text-base-content p-10">
      <nav>
        <h6 className="footer-title">Terms</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Contact info</h6>
        <a className="link link-hover flex gap-1 items-center justify-center"><IoMdMail />
gardening@hub.com</a>
        <a className="link link-hover flex gap-1 items-center justify-center">
          <IoCall /> 01856638698
        </a>
        <a className="link link-hover flex gap-1 items-center justify-center">
          <MdLocationOn className="text-base" />
          <h2>Khagan, Savar, Dhaka</h2>
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Social Links</h6>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <a>
            <Link to="https://x.com/home">
              <FaTwitter />
            </Link>
          </a>
          <a>
            <Link to="https://www.youtube.com/">
              <FaYoutube />
            </Link>
          </a>

          <a>
            <Link to="https://www.facebook.com/">
              <FaFacebook />
            </Link>
          </a>

          <a>
            <Link to="https://web.whatsapp.com/">
              <FaWhatsapp />
            </Link>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
