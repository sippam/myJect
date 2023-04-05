import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("white");
  const [textColor, setTextColor] = useState("#CC4F39");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#FFFFFF");
        setTextColor("#CC4F39");
      } else {
        setColor("transparent");
        setTextColor("#CC4F39");
      }
    };
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1480px] m-auto flex justify-between items-center p-4 text-white">
        <Link href="/#aboutLibrary">
          <div className="flex items-center">
            <h1
              style={{ color: `${textColor}` }}
              className="font-bold text-2xl sm:text-3xl mr-2 sm:mr-4"
            >
              ENGINEER
            </h1>
            <img
              src="LoGo.png"
              style={{
                height: "50px",
                cursor: "pointer",
                margin: "30px 0",
                maxHeight: "5vh",
              }}
            />
            <h1
              style={{ color: `${textColor}` }}
              className="font-bold text-2xl sm:text-3xl mr-2 sm:mr-4"
            >
              LIBRARY
            </h1>
          </div>
          <style jsx>{`
            @media (min-width: 1001px) {
              h1 {
                font-size: 3vw;
              }
            }

            @media (max-width: 1000px) {
              h1 {
                font-size: 4vw;
              }
            }
          `}</style>
        </Link>
        <ul style={{ color: `${textColor}` }} className="hidden md:flex">
          <li
            className="p-5 text-2xl hover:text-blue-500"
            style={{
              fontWeight: "bold",
              fontSize: "2vw",
              transition: "color 0.2s ease",
            }}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className="p-5 text-2xl hover:text-blue-500"
            style={{
              fontWeight: "bold",
              fontSize: "2vw",
              transition: "color 0.2s ease",
            }}
          >
            <Link href="/#formpage">Booking</Link>
          </li>
          <li
            className="p-5 text-2xl hover:text-blue-500"
            style={{
              fontWeight: "bold",
              fontSize: "2vw",
              transition: "color 0.2s ease",
            }}
          >
            <Link href="/#kud">Mapping</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block md:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={25} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "md:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-slate-400 text-center ease-in duration-300"
              : "md:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-slate-400 text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-5 text-2xl hover:text-gray-500"
              style={{ fontWeight: "bold" }}
            >
              <Link href="/">Home</Link>
            </li>

            <li
              onClick={handleNav}
              className="p-5 text-2xl hover:text-gray-500"
              style={{ fontWeight: "bold" }}
            >
              <Link href="/work">Booking</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-5 text-2xl hover:text-gray-500"
              style={{ fontWeight: "bold" }}
            >
              <Link href="/mapping">Mapping</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;