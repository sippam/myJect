"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "next-themes";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { React, useState, useEffect } from "react";
<<<<<<< HEAD
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
=======
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)
import Main from "./Main";
import Mapping from "./Mapping";
import Booking from "./Booking";
import Footer from "./Footer";
import Request from "./request";
import UserTable from "./UserTable";
<<<<<<< HEAD
=======
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)

const Login2 = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
<<<<<<< HEAD
  const [user, setUser] = useState("");

  const googleAuth = new GoogleAuthProvider();
  const auth = getAuth();
  const signIn = () => {
    signInWithPopup(auth, googleAuth).then(
      (data) => {
        setUser(data.user.displayName);
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

=======

  const session = useSession();
  const supabase = useSupabaseClient();

  async function signIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setMounted(true);
    getLocation();
    checkLocationLibrary(latitude, longitude);
  }, []);

  useEffect(() => {
    if (session) {
      localStorage.setItem("user", session.user.user_metadata.full_name);
      localStorage.setItem("email", session.user.user_metadata.email);
      localStorage.setItem("image", session.user.user_metadata.avatar_url);
      localStorage.setItem("providerToken", session.provider_token);
    }
  });

>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)
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
<<<<<<< HEAD
  return (
    <>
      {user ? (
=======

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getLocation = () => navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
    // console.log("Latitude is :", position.coords.latitude);
    // console.log("Longitude is :", position.coords.longitude);
  })
// 16.47349855612493, 102.82311902727989
// 16.472855441332136, 102.82367524081515
  function checkLocationLibrary(x,y) {
    if ((x >= 16.47349855612493 && x <= 16.472855441332136) && (y>=102.82311902727989 && y<= 102.82367524081515)) {
      // console.log("in library");
    } else {
      // console.log("Bruh");
    }
  }

  return (
    <>
      {session ? (
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)
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

<<<<<<< HEAD
export default Login2;
=======
export default Login2;
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)
