import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Link from "next/link";
// import uuid from "react-uuid";
import Axios from "axios";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/router";
import Table from "./table";
import AdminSetting from "./AdminSetting";
import Navbar from "./Navbar";

const admin = () => {
  const router = useRouter();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [dataShow, setDataShow] = useState([]);

  const [startExam, setStartExam] = useState(new Date());
  const [endExam, setEndExam] = useState(new Date());
  const minDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

  function idk() {
    if (startDate !== null && endDate !== null) {
      setStartExam(startDate);
      setEndExam(endDate);
      localStorage.setItem("startExamDay", startDate);
      localStorage.setItem("endExamDay", endDate);
    }
  }

  useEffect(() => {
    idk();
  }, [startDate, endDate]);
  const [checkSwitch, setCheckSwitch] = useState();

  useEffect(() => {
    prevData();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  function prevData() {
    if (
      localStorage.getItem("prevBTN") == "true" &&
      localStorage.getItem("startExamDay") !== "null" &&
      localStorage.getItem("endExamDay") !== "null"
    ) {
      setCheckSwitch(true);
      setStartDate(new Date(localStorage.getItem("startExamDay")));
      setEndDate(new Date(localStorage.getItem("endExamDay")));
    } else {
      setCheckSwitch(false);
      setStartDate(null);
      setEndDate(null);
      localStorage.removeItem("startExamDay");
      localStorage.removeItem("endExamDay");
    }
  }
  // const [checkSwitch, setCheckSwitch] = useState(false);
  const [dataExam, setDataExam] = useState({});

  // let dataExam = {};

  const switchOnOff = () => {
    localStorage.setItem("prevBTN", JSON.stringify(!checkSwitch));
    setCheckSwitch(!checkSwitch);
    if (checkSwitch === true) {
      setDataExam({
        startDay: startExam,
        endDay: endExam,
        enableOrdisable: checkSwitch,
      });
      router.reload(window.location.pathname);
    } else {
      setDataExam({
        startDay: startExam,
        endDay: endExam,
        enableOrdisable: checkSwitch,
      });
    }
  };

  const getData = () => {
    Axios.get("http://localhost:3001/customer").then((response) => {
      setDataShow(response.data);
    });
  };

  return (
    <div className="w-full lg:h-screen dark:bg-[#282a36]">
      <Navbar />
      <div id="book" className="max-w-[90%] m-auto px-2 py-40 w-full">
        <Table />
      </div>
    </div>
  );
};

export default admin;