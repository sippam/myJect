import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/router";

const AdminSetting = () => {
  const router = useRouter();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

  function examPeriod() {
    if (startDate !== null && endDate !== null) {
      setStartExam(startDate);
      setEndExam(endDate);
      localStorage.setItem("startExamDay", startDate);
      localStorage.setItem("endExamDay", endDate);
    }
  }

  useEffect(() => {
    examPeriod();
  }, [startDate, endDate]);

  const [checkSwitch, setCheckSwitch] = useState();

  useEffect(() => {
    prevData();
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

  const switchOnOff = () => {
    localStorage.setItem("prevBTN", JSON.stringify(!checkSwitch));
    setCheckSwitch(!checkSwitch);
    router.reload(window.location.pathname);
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
  );
};

export default AdminSetting;
