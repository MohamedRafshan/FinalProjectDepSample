"use client";

import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full mt-24  bg-gray-200 text-slate-900 py-12">
      {/* Curved top edge */}

      <div className="w-full max-w-screen-xl mx-auto flex flex-wrap justify-between px-4 md:px-8 relative z-10">
        {/* Left Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">AgroMart</h2>

          <p className="text-gray-600 mb-4">
            At AgroMart, we provide smart agronomy solutions to help farmers
            increase productivity and reduce crop wastage. Whether you need
            support, have a partnership inquiry, or are interested in becoming a
            vendor, we are here to assist you.
          </p>
          <p className="text-gray-600">Copyright © 2024 AgroMart</p>
        </div>

        {/* Middle Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">CONTACT US</h3>
          <div className="text-gray-600 mb-4">
            <p>AgroMart (Pvt) Ltd,</p>
            <p>New Agriculture Complex,</p>
            <p>Colombo, Sri Lanka.</p>
            <p>Moratuwa</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 text-right">
          <img
            src="/logo.png"
            alt="AgroMart Logo"
            className="w-80 md:ml-auto md:mr-7-1 ml-auto"
          />

          <div className="relative">
            <p className="absolute top-10 right-12 text-gray-600">
              <a
                href="mailto:contact@agromart.com"
                className="flex text-gray-600 underline"
              >
                contact@agromart.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-6 flex justify-center space-x-8">
        <a href="https://www.github.com" className="hover:text-gray-500">
          <FaGithub size={24} />
        </a>
        <a href="https://www.facebook.com" className="hover:text-gray-500">
          <FaFacebook size={24} />
        </a>
        <a href="https://www.instagram.com" className="hover:text-gray-500">
          <FaInstagram size={24} />
        </a>
        <a href="https://www.twitter.com" className="hover:text-gray-500">
          <FaTwitter size={24} />
        </a>
        <a href="https://www.twitch.com" className="hover:text-gray-500">
          <FaTwitch size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
