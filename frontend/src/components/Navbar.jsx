import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";


const Navbar = () => {
  const [isMenuopen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  console.log(location);
  let navLinks = [
    { label: "Home", path: "/" },
    { label: "Book Catalog", path: "/book-catalog" },
    { label: "About Us", path: "/about-us" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaBookOpen className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">
              Mike's Book Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((navLink) => (
              <NavLink
                to={navLink.path}
                currentPath={location.pathname}
                key={navLink.label}
              >
                {navLink.label}
              </NavLink>
            ))}

            {/* Search and User Icons */}
            <div className="flex items-center space-x-4 ml-4">
              <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          {isMenuopen ? (
            <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-start pt-20 px-6 md:hidden transition-all duration-300 shadow-lg">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <IoMdClose className="text-2xl" />
              </button>

              {/* Nav Links */}
              <div className="flex flex-col space-y-6 text-center w-full">
                {navLinks.map((navLink) => (
                  <NavLink
                    to={navLink.path}
                    key={navLink.label}
                    onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
                    className={({ isActive }) =>
                      `text-lg font-medium ${
                        isActive ? "text-indigo-600" : "text-gray-700"
                      } hover:text-indigo-500 transition-colors`
                    }
                  >
                    {navLink.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component for active state styling
const NavLink = ({ to, currentPath, children, onClick }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-1 py-2 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? "border-indigo-600 text-indigo-600"
          : "border-transparent text-gray-500 hover:text-indigo-500 hover:border-indigo-300"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
