"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "next-themes";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { React, useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import Main from "./Main";
import Mapping from "./Mapping";
import Booking from "./Booking";
import Footer from "./Footer";
import Request from "./request";
import UserTable from "./UserTable";

const Login2 = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [user, setUser] = useState("");

  const googleAuth = new GoogleAuthProvider();
  const auth = getAuth();
  const signIn = () => {
    signInWithPopup(auth, googleAuth).then(
      (data) => {
        setUser(data.user.displayName);
        setEmail(data.user.email);
        setImage(data.user.photoURL);
        localStorage.setItem("user", data.user.displayName);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("image", data.user.photoURL);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
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
  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Main />
          <UserTable />
          <Booking />
          <Request />
          <Mapping />
          <Footer />
        </>
      ) : (
        <>
          <div id="home" className="dark:bg-[#282a36]">
            <div className="w-full h-screen text-center">
              <div className="max-w-[100%] w-full h-full mx-auto p-2 flex flex-row justify-center items-center ">
                <div className="mt-0 flex flex-col sm:flex-row">
                  <div className="m-2 flex justify-center items-center flex-col">
                    <p className=" uppercase text-lg tracking-widest font-semibold text-[#263238]  dark:text-[#fcfcfc]">
                      WELCOME TO{" "}
                    </p>
                    <h1 className="my-1 text-4xl md:text-6xl font-bold text-[#B30000]">
                      ENGINEER LIBRARY
                    </h1>
                    <p className=" py-4 text-md tracking-widest font-semibold text-[#263238] max-w-[100%] m-3  dark:text-[#fcfcfc]">
                      <span className="text-[#2c2b2b] text-lg dark:text-[#51a4c0] hover:scale-105 ease-in duration-300">
                        Enjoy
                      </span>{" "}
                      access to a wide selection conference room. <br />
                      <span className="text-[#2c2b2b] text-lg dark:text-[#51a4c0] hover:scale-105 ease-in duration-300">
                        Easy{" "}
                      </span>
                      communication with your friends.
                    </p>
                    <div>
                      <div className=" flex items-center justify-between">
                        {renderThemeChanger()}
                        <Link href="">
                          <button
                            onClick={signIn}
                            className="flex btn-grad hover:bg-right bg-[#B30000] text-white mt-3 py-4 px-7 rounded-50 uppercase cursor-pointer hover:scale-105 ease-in duration-300 text-sm tracking-widest font-semibold ml-10 mr-10"
                          >
                            Login with Google
                            <FcGoogle className="ml-2 mr-1 items-center" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <Image
                      src="../../assets/animatedfirst.svg"
                      width={780}
                      height={200}
                      style={{ inset: "10px" }}
                      alt="/"
                    ></Image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login2;
