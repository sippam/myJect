"use client";

import { React, useState, useEffect } from "react";
import { auth, provider } from "./FirebaseLogin";
import { signInWithPopup } from "firebase/auth";
import Form from "./form";
import { ExamContext } from "../context/ExamContext";
import Axios from "axios";
import Link from "next/link";
import uuid from "react-uuid";
import { useRouter } from "next/router";

const login = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user.displayName);
      setEmail(data.user.email);
      setImage(data.user.photoURL);
      localStorage.setItem("user", data.user.displayName);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("image", data.user.photoURL);
    });
  };

  const router = useRouter();
  const dataExam = router.query.dataExam ? JSON.parse(router.query.dataExam) : {};

  // const [startDay, setStartDay] = useState(new Date().getDate());
  // const [endDay, setEndDay] = useState(new Date().getDate() + 2);
  const formatEndDate = new Date();
  formatEndDate.setDate(formatEndDate.getDate() +2);
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(formatEndDate);
  const [enableOrdisable, setEnableOrdisable] = useState(false);
  const [once, setOnce] = useState(true);
  const today = new Date();

  const valueExamDay = () => {
    if (dataExam.enableOrdisable == true) {
      setStartDay(new Date(dataExam.startDay));
      setEndDay(new Date(dataExam.endDay));
      setEnableOrdisable(dataExam.enableOrdisable);
      setOnce(true);
    } else {
      setStartDay(new Date());
      setEndDay(formatEndDate);
      setEnableOrdisable(dataExam.enableOrdisable);
    }
  };

  // const valueExamDay = () => {
  //   if (dataExam.enableOrdisable == true) {
  //     setStartDay(new Date(dataExam.startDay));
  //     setEndDay(new Date(dataExam.endDay));
  //     // setEndDay(dataExam.endDay);
  //     setEnableOrdisable(dataExam.enableOrdisable);
  //     setOnce(true);
  //     // console.log(transStartDay.getDate());
  //     // console.log(dataExam.startDay);
  //   } else {
  //     setStartDay(new Date());
  //     setEndDay(new Date());
  //     setEnableOrdisable(dataExam.enableOrdisable);
  //   }
  // };
  // const valueExamDay = (item) => {
  //   if (item.enableOrdisable == true) {
  //     setStartDay(item.startDay);
  //     setEndDay(item.endDay);
  //     setEnableOrdisable(item.enableOrdisable);
  //   } else {
  //     setStartDay(new Date().getDate());
  //     setEndDay(new Date().getDate() + 2);
  //     setEnableOrdisable(item.enableOrdisable);
  //   }
  // };


  const [adminList, setAdminList] = useState([]);

  const admin =  () => {
     Axios.get("http://localhost:3001/adminlist").then((response) => {
      setAdminList(response.data);
    });
  };

  const [dataShow, setDataShow] = useState([]);

  const getData = () => {
     Axios.get("http://localhost:3001/customer").then((response) => {
      setDataShow(response.data);
    });
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setEmail(localStorage.getItem("email"));
    setImage(localStorage.getItem("image"));
    if (today.getDate() === endDay) {
      setStartDay(new Date());
      setEndDay(formatEndDate);
    }
    getData();
    admin();
    valueExamDay();
    if (once) {
      valueExamDay();
      setOnce(false);
    }
  }, []);

  return (
    <div>
      {/* <DataContext.Provider value={[...dataShow]}> */}
        {user ? (
          <>
            {/* <Link href="../components/admin" legacyBehavior>
            <a>Admin</a>
          </Link> */}
            {adminList.map((item) => {
              if (item.Name == email) {
                return (
                  <Link key={uuid()} href={{pathname: "../components/admin", query:{ dataShow : JSON.stringify(dataShow)}}} legacyBehavior>
                    <a>Admin</a>
                  </Link>
                );
                // return <Admin ExamDay={valueExamDay} />;
              }
            })}
            <Link href="../components/request" legacyBehavior>
              <a>Request</a>
            </Link>
            <ExamContext.Provider value={{ startDay, endDay, enableOrdisable }}>
              <Form />
            </ExamContext.Provider>
          </>
        ) : (
          <div className="position-absolute top-50 start-50 translate-middle">
            <button className="testttt" onClick={handleClick}>
              Sign in with KKU mail
            </button>
          </div>
        )}
      {/* </DataContext.Provider> */}
    </div>
  );
};

export default login;