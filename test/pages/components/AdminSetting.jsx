import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Link from "next/link";
// import uuid from "react-uuid";
import Axios from "axios";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/router";

const AdminSetting = () => {

const router = useRouter();
  // const email = localStorage.getItem("email");
  // console.log(email);
  // const router = useRouter();
  // const dataShow = router.query.dataShow ? JSON.parse(router.query.dataShow) : {};
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [dataShow, setDataShow] = useState([]);

  // const [email, getEmail] = useState("");

  const [startExam, setStartExam] = useState(new Date());
  const [endExam, setEndExam] = useState(new Date());
  const minDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   console.log(dates);
  //   setStartExam(start);
  //   setGetStartExam(start.getDate());
  //   setEndExam(end);
  //   setGetEndExam(end.getDate())
  // };
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

  // const [dataShow, setDataShow] = useState([]);
  // console.log(data);

  useEffect(() => {
    idk();
    // setDataShow(dataShow);
    // if (typeof window !== 'undefined') {
    // access localStorage here
    // getEmail(localStorage.getItem("email"));

    // }
    // setDataShow(data);
    // }, [endDate]);
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
      // dataExam = {
      //   startDay: startExam,
      //   endDay: endExam,
      //   enableOrdisable: checkSwitch,
      // };
      // props.ExamDay(dataExam);
      // router.push({
      //   pathname: "../components/login",
      //   query: { dataExam: JSON.stringify(dataExam) },
      // });
    } else {
      setDataExam({
        startDay: startExam,
        endDay: endExam,
        enableOrdisable: checkSwitch,
      });
      // dataExam = {
      //   startDay: startExam,
      //   endDay: endExam,
      //   enableOrdisable: checkSwitch,
      // };
      // props.ExamDay(dataExam);
      // router.push({
      //   pathname: "../components/login",
      //   query: { dataExam: JSON.stringify(dataExam) },
      // });
    }
  };

  // useEffect(() => {
  //   const data = window.localStorage.getItem("examData");
  //   if (data != "undefined") {
  //     setPrevSwitch(JSON.parse(data));
  //   }
  // }, [checkSwitch]);

  // const enableExam = (event) => {
  //   event.preventDefault();
  //   const dataExam = {
  //     startDay: startExam,
  //     endDay: endExam,
  //     enableOrdisable: checkSwitch
  //   };
  //   props.ExamDay(dataExam);
  // };

  const time = [
    { id: "10", text: "10:00" },
    { id: "11", text: "11:00" },
    { id: "12", text: "12:00" },
    { id: "13", text: "13:00" },
    { id: "14", text: "14:00" },
    { id: "15", text: "15:00" },
    { id: "16", text: "16:00" },
  ];

  const getData = () => {
    Axios.get("http://localhost:3001/customer").then((response) => {
      setDataShow(response.data);
    });
  };

  const deleteBooking = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setDataShow(
        dataShow.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <>
    <div className="pt-[150px]">
        <DatePicker
          placeholderText="Exam Start"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={today}
        />
        <DatePicker
          placeholderText="Exam End"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={today}
        />
        {checkSwitch ? (
          <Switch {...label} onClick={switchOnOff} checked={true} />
        ) : (
          <Switch {...label} onClick={switchOnOff} checked={false} />
        )}
      </div>
    </>
  )
}

export default AdminSetting;