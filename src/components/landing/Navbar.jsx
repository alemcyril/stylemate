import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-slate-900">
      <div className="h-16 flex justify-between text-white lg:py-5 px-20 py-4">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">StyleMate</span>
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
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  {section}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button className="transition" onClick={handleClick}>
            {click ? <FaTimes /> : <CiMenuFries />}
          </button>
          {click && (
            <div className="absolute top-16 left-0 right-0 bg-slate-900 transition">
              <ul className="text-center text-xl p-10">
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
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                      {section}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
