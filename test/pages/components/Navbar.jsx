import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsFillTelephoneFill, BsFillMoonFill, BsSun } from "react-icons/bs";
import { TbLocationFilled } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Axios from "axios";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [navColor, setNavColor] = useState("#2c2b2b");
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ===============================================================
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [adminList, setAdminList] = useState([]);

  const admin = async () => {
    await Axios.get("http://localhost:3001/adminlist").then((response) => {
      setAdminList(response.data);
    });
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
}

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setEmail(localStorage.getItem("email"));
    setImage(localStorage.getItem("image"));
    admin();
  }, []);
  // ===============================================================

  {
    /* =======> dark mode set-up  <======== */
  }
  useEffect(() => {
    setMounted(true);
  }, []);
  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme == "dark") {
      return (
        <BsSun
          className="w-7 h-7 dark:text-[white]"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <BsFillMoonFill
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  {
    /* ====================================== */
  }
  const handleNav = () => {
    setNav(!nav);
  };

  function handleCopy() {
    navigator.clipboard.writeText("043-009700");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      className={
        shadow
          ? "fixed w-full h-100 shadow-xl bg-[white] z-[9999]"
          : "fixed w-full h-100 bg-[white] z-[9999]"
      }
    >
      <div
        className="flex justify-between items-center w-full h-full px-2 2xl:px-16 dark:bg-[#202020]
"
      >
        <div className=" p-4 ">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/">
              <Image
                className="hover:scale-105 ease-in duration-200"
                src="../../assets/LogoKKU.svg"
                width={50}
                height={120}
                style={{ inset: "10px" }}
                alt="/"
              />
            </Link>
            <span
              style={{ marginLeft: "20px" }}
              className="lg:text-xl md:text-l  dark:text-[#fcfcfc]"
            >
              ENGINEER LIBRARY
            </span>
          </div>
        </div>

        <div className="ml-auto">
          <ul className="hidden md:flex p-10">
            {/* //////////////////////// */}
            {adminList.map((item) => {
              if (item.Name == email) {
                return (
                  <Link href="../components/admin">
                    <li className="ml-12 font-semibold text-md tracking-widest uppercase hover:border-b hover:scale-105 ease-in duration-200 hover:text-[#f9a826] dark:text-[#fcfcfc]">
                      {" "}
                      Admin{" "}
                    </li>
                  </Link>
                );
              }
            })}
            {/* //////////////////////// */}
            <Link href="/#home">
              <li className="ml-12 font-semibold text-md tracking-widest uppercase hover:border-b hover:scale-105 ease-in duration-200 hover:text-[#f9a826] dark:text-[#fcfcfc]">
                {" "}
                HOME{" "}
              </li>
            </Link>

            <ul className="ml-12 font-semibold text-md tracking-widest hover:border-b hover:scale-105 ease-in duration-200">
              <li>
                <Link legacyBehavior href="/#book">
                  <a className="hover:text-[#f9a826] flex items-center hover:scale-105 ease-in duration-200 dark:text-[#fcfcfc]">
                    BOOK <IoMdArrowDropdown />
                  </a>
                </Link>
                <ul className="dropdown p-4">
                  <li>
                    <a href="/#list">Booking List</a>
                  </li>
                </ul>
              </li>
            </ul>

            <Link href="/#map">
              <li className="ml-12 font-semibold text-md tracking-widest uppercase hover:border-b hover:scale-105 ease-in duration-200 hover:text-[#f9a826] dark:text-[#fcfcfc]">
                {" "}
                Map{" "}
              </li>
            </Link>

            <div className=""></div>
          </ul>
          <div onClick={handleNav} className="md:hidden p-6">
            <AiOutlineMenu size={25} className="dark:text-white" />
          </div>
        </div>
        {/*============ DARKMODE BUTTON ADDED HERE!! ============= */}
        <div className="hidden md:flex pr-10">{renderThemeChanger()}</div>
        {/*============ DARKMODE ADDED HERE!! ============= */}

        {/*============ M ADD ICON HERE !! ============= */}
        <ul className="ml-1 font-semibold text-md tracking-widest hover:border-b hover:scale-105 ease-in duration-200">
          <li>
            <img
              src={image}
              alt="/"
              referrerPolicy="no-referrer"
              width={50}
              height={50}
              className="dropdown p-0.5 rounded-full shadow-lg shadow-[#707172] cursor-pointer hidden md:flex  "
              style={{ width: "70px", height: "70px" }}
            />
            <ul className="dropdown p-1 rounded-full my-0 uppercase">
              <li>
                <a href="#" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/60 ease-in duration-500 z-999999999"
            : ""
        }
      >
        {/* ***************** Navbar for MOBILE ***************** */}
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45] h-screen bg-[white] p-10 ease-in duration-500 dark:bg-[#1d1d24]"
              : "fixed left-[-100%] top-0 w-[75%] sm:w-[60%] md:w-[45] h-screen bg-[white] p-10 ease-in duration-500 dark:bg-gray-900"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Image src="assets/LogoKKU.svg" width={50} height={120} alt="/" />
              <div className="">{renderThemeChanger()}</div>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-300 p-2 cursor-pointer bg-[#efefef]"
              >
                <AiOutlineClose size={20} />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4 dark:text-[#efefef]">
              <p className="w-[85%] md:w-[90%] py-4 uppercase text-lg">
                Let&apos;s Book a room !
              </p>
            </div>
          </div>
          <div>
            <ul className="uppercase">
              <Link href="/#book">
                <li
                  onClick={() => setNav(false)}
                  className="text-md py-4 hover:text-[#f9a826] dark:text-[#efefef] "
                >
                  Book here
                </li>
              </Link>
              <Link href="/#list">
                <li
                  onClick={() => setNav(false)}
                  className="text-md py-4 hover:text-[#f9a826] dark:text-[#efefef]"
                >
                  Booking list
                </li>
              </Link>
              <Link href="/#map">
                <li
                  onClick={() => setNav(false)}
                  className="text-md py-4 hover:text-[#f9a826] dark:text-[#efefef] "
                >
                  Map
                </li>
              </Link>
              <li
                onClick={() => {
                  setNav(false);
                  logout();
                }}
                className="text-md py-4 hover:text-[red] dark:text-[#efefef]"
              >
                logout
              </li>
            </ul>
          </div>
          <div className="pt-80 my-1">
            <p className="uppercase tracking-widest text-[black] dark:text-[#efefef]">
              Our Contacts
            </p>
            <div className="flex items-center justify-between my-3 w-full sm:w-[100%] dark:text-white">
              <a href="https://www.facebook.com/kkuenglib" target="_blank">
                {" "}
                <div
                  className="rounded-full shadow-lg shadow-[#325380] p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                  title="Facebook Page"
                >
                  <FaFacebook />
                </div>
              </a>
              {/* <a href="043-009700"> */}
              <div
                className={`rounded-full shadow-lg shadow-[#325380] p-3 cursor-pointer hover:scale-105 ease-in duration-300 ${
                  isCopied ? "flex justify-center items-center" : ""
                }`}
                title="Phone Number"
                onClick={handleCopy}
              >
                <BsFillTelephoneFill />
                {isCopied && (
                  <div className="text-xs text-[#218a21] ml-4 dark:text-white">
                    Number copied
                  </div>
                )}
              </div>

              {/* </a> */}
              <a href="https://kku.world/wp7md" target="_blank">
                {" "}
                <div
                  className="rounded-full shadow-lg shadow-[#325380] p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                  title="Official Website For More Information"
                >
                  <TbLocationFilled />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
