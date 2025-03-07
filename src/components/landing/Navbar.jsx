import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-slate-900/95 backdrop-blur-sm shadow-lg" : "bg-slate-900"
    }`}>
      <div className="h-16 flex justify-between text-white lg:py-5 px-4 md:px-8 lg:px-20 py-4">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
            StyleMate
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <ul className="flex gap-8 mr-16 text-[18px]">
            {["Home", "Features", "About", "Contact"].map((section) => (
              <Link
                key={section}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to={section}
              >
                <li className="hover:text-fuchsia-500 transition-all duration-300 border-b-2 border-transparent hover:border-fuchsia-500 cursor-pointer">
                  {section}
                </li>
              </Link>
            ))}
          </ul>
          <button 
            onClick={handleLogin}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button 
            className="transition-all duration-300 p-2 hover:bg-slate-800 rounded-lg" 
            onClick={handleClick}
          >
            {click ? <FaTimes size={24} /> : <CiMenuFries size={24} />}
          </button>
          {click && (
            <div className="absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-sm shadow-lg transition-all duration-300">
              <ul className="text-center text-xl p-6">
                {["Home", "Features", "About", "Contact"].map((section) => (
                  <Link
                    key={section}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    to={section}
                    onClick={handleClick}
                  >
                    <li className="my-3 py-3 border-b border-slate-800 hover:bg-slate-800 hover:rounded-lg transition-all duration-300">
                      {section}
                    </li>
                  </Link>
                ))}
                <button 
                  onClick={handleLogin}
                  className="w-full mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Login
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
