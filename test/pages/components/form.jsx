"use client";

import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from "react-uuid";
import Axios from "axios";
import Logout from "./Logout";
import { ExamContext } from "../context/ExamContext";
import { addDays } from "date-fns";

const form = () => {
  const valueExam = useContext(ExamContext);

  const deleteBooking = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setDataShow(
        dataShow.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  // User name email image
  const name = localStorage.getItem("user");
  const email = localStorage.getItem("email");
  const image = localStorage.getItem("image");

  // Set type room for select
  const typeRoom = [
    { value: "Conference", text: "Conference Room" },
    { value: "Meeting", text: "Meeting Room" },
  ];

  // Set number of room in Conference room
  const numberInRoomConferece = [
    { value: 1, text: 1 },
    { value: 2, text: 2 },
    { value: 3, text: 3 },
  ];
  // Set number of room in Meeting room
  const numberInRoomMeeting = [
    { value: 1, text: 1 },
    { value: 2, text: 2 },
    { value: 3, text: 3 },
    { value: 4, text: 4 },
  ];

  // Set min max time
  const [minTime, setMinTime] = useState(new Date("1/1/1111 10:00 AM"));
  const [maxTime, setMaxTime] = useState(new Date("1/1/1111 4:00 PM"));

  // set state of room name
  const [roomName, setRoomName] = useState("");
  // set state of type room name, default state is default because will use it in value
  const [roomType, setRoomType] = useState("default");
  // set state of room name, default state is default because will use it in value
  const [roomNumber, setRoomNumber] = useState("default");
  // set state of timeFrom null to not show anything in select and use lectTime to show
  const [timeFrom, setTimeFrom] = useState(0);
  const [getTimeFrom, setGetTimeFrom] = useState(0);
  // same above
  const [timeTo, setTimeTo] = useState(0);
  const [getTimeTo, setGetTimeTo] = useState(0);
  // set default number of room to select in form
  const [numberRoom, setNumberRoom] = useState(numberInRoomConferece);
  // Let user select type of room and will select numbet of name
  const [selectRoom, setSelectRoom] = useState(false);
  // Check time hours between 1-3 hours
  const checkTime = getTimeTo - getTimeFrom;
  // Check all value that filled
  const [checkValid, setCheckValid] = useState(false);
  // If useer select room of number then user can select date and time to booking
  const [canSelectDateTime, setCanSelectDateTime] = useState(false);

  // Collect day from user submit form
  const [day, setDay] = useState(null);
  const [getDay, setGetDay] = useState(null);
  // Check that user already select day
  const [checkSelectDay, setCheckSelectDay] = useState(false);
  // Collect dd/mm/yyyy from user submit form
  const [collectday, setCollectDay] = useState(new Date());

  // Get day of today, tomorrow, day after tomorrow to booking

  const [BookingDay, setBookingDay] = useState(new Date());
  const [startBookingDay, setStartBookingDay] = useState(new Date().getDate());
  const [endBookingDay, setEndBookingDay] = useState(new Date().getDate() +2);
  const period = endBookingDay - startBookingDay;
  const today = new Date();
  // const [test, setTest] = useState(true);

  // Show only 3 days select except weekend
  // const weekend = (event) => {
  //   if (valueExam.enableOrdisable) {
  //     // setStartBookingDay(valueExam.startDay);
  //     // setEndBookingDay(valueExam.endDay);
  //     // setBookingDay(valueExam.startDay);
  //     // setTest(false);
  //     return (
  //       event.getDate() >= valueExam.startDay.getDate() &&
  //       event.getDate() <= valueExam.endDay.getDate()
  //     );
  //   } else {
  //     // if (today.getDate() !== BookingDay.getDate()) {
  //     //   setStartBookingDay(new Date().getDate());
  //     //   setEndBookingDay(new Date().getDate() + 2);
  //     //   setBookingDay(new Date());
  //     //   setTest(true);
  //     // }
  //     return !(event.getDay() == 6 || event.getDay() == 0);
  //   }
  // };

  const weekend = (event) => {
    if (localStorage.getItem("prevBTN") == "true") {
      // setStartBookingDay(valueExam.startDay);
      // setEndBookingDay(valueExam.endDay);
      // setBookingDay(valueExam.startDay);
      // setTest(false);
      return (
        event.getDate() >= new Date(localStorage.getItem("startExamDay")).getDate() &&
        event.getDate() <= new Date(localStorage.getItem("endExamDay")).getDate()
      );
    } else {
      // if (today.getDate() !== BookingDay.getDate()) {
      //   setStartBookingDay(new Date().getDate());
      //   setEndBookingDay(new Date().getDate() + 2);
      //   setBookingDay(new Date());
      //   setTest(true);
      // }
      return !(event.getDay() == 6 || event.getDay() == 0);
    }
  };

  // const weekend = (event) => {
  //   if (
  //     valueExam.enableOrdisable &&
  //     event.getDate() >= valueExam.startDay &&
  //     event.getDate() <= valueExam.endDay
  //   ) {
  //   } else {
  //     return !(event.getDay() == 6 || event.getDay() == 0);
  //   }

  // Collect data user type roomName
  const setNameOfRoom = (event) => {
    setRoomName(event.target.value);
  };

  // Collect data user select roomType
  const setTypeOfRoom = (event) => {
    setRoomType(event.target.value);
    setSelectRoom(true);
    if (event.target.value === "Conference") {
      setNumberRoom(numberInRoomConferece);
    } else {
      setNumberRoom(numberInRoomMeeting);
    }
  };

  // Collect data user select roomNumber
  const setRoomofNumber = (event) => {
    setRoomNumber(event.target.value);
    setCanSelectDateTime(true);
  };

  // Collect data user select timeFrom
  const changeTimeFrom = (valueTime) => {
    setGetTimeFrom(valueTime.getHours());
    setTimeFrom(valueTime);
  };

  // Collect data user select timeTo
  const changeTimeTo = (valueTime) => {
    setGetTimeTo(valueTime.getHours());
    setTimeTo(valueTime);
  };

  const checkDay = (valueDay) => {
    setCheckSelectDay(true);
    setCollectDay(
      `${valueDay.getFullYear()}/${
        valueDay.getMonth() + 1
      }/${valueDay.getDate()}`
    );
    setDay(valueDay);
    setGetDay(valueDay.getDate());
  };
  // Save data from user
  const saveData = (event) => {
    event.preventDefault();

    // Only log show data in form ======= ( can delete) =======
    const collectData = {
      collectday: collectday,
      day: getDay,
      roomName: roomName,
      roomType: roomType,
      roomNumber: roomNumber,
      timeFrom: getTimeFrom,
      timeTo: getTimeTo,
    };
    console.log(collectData);
    // set to default value
    setCollectDay(new Date());
    setDay(null);
    setRoomName("");
    setRoomType("default");
    setRoomNumber("default");
    setTimeFrom(null);
    setTimeTo(null);
    setSelectRoom(false);
  };

  // Server
  const [dataShow, setDataShow] = useState([]);

  // Get data to show
  const getData = async () => {
    await Axios.get("http://localhost:3001/customer").then((response) => {
      setDataShow(response.data);
    });
  };

  // Post datat into myphpadmin
  const addData = () => {
    Axios.post("http://localhost:3001/create", {
      collectday: collectday,
      getDay: getDay,
      name: name,
      email: email,
      roomName: roomName,
      roomType: roomType,
      roomNumber: roomNumber,
      getTimeFrom: getTimeFrom,
      getTimeTo: getTimeTo,
    }).then(() => {
      setDataShow([
        ...dataShow,
        {
          collectday: collectday,
          getDay: getDay,
          name: name,
          email: email,
          roomName: roomName,
          roomType: roomType,
          roomNumber: roomNumber,
          getTimeFrom: getTimeFrom,
          getTimeTo: getTimeTo,
        },
      ]);
    });
  };

  // Check room booking if have booking can't submit form
  const mapItem = dataShow.map(async(data) => {
    
    const calRoomNumberDay =
      String(data.roomType) == roomType &&
      String(data.roomNumber) == roomNumber &&
      Number(data.day) == getDay;
    const calTomeFrom =
      getTimeFrom >= Number(data.timeFrom) && getTimeFrom < Number(data.timeTo);
    const calTimeTo =
      getTimeTo > Number(data.timeFrom) && getTimeTo <= Number(data.timeTo);
    if (calRoomNumberDay) {
      if (calTomeFrom || calTimeTo) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  });

  // Check user fill all value form
  // useEffect(() => {
  //   // console.log(valueExam);
  //   if (valueExam.enableOrdisable) {
  //     setStartBookingDay(valueExam.startDay);
  //     setEndBookingDay(valueExam.endDay);
  //     // setBookingDay(new Date(valueExam.startDay));
  //   } else {
  //     if (today.getDate() !== BookingDay.getDate()) {
  //       setStartBookingDay(new Date().getDate());
  //       setEndBookingDay(new Date().getDate() + 2);
  //       setBookingDay(new Date());
  //       setTest(true);
  //     }
  //   }

  // useEffect(() => {
  //   setBookingDay(new Date(localStorage.getItem("startExamDay")));
  // },[])

  useEffect(() => {
    // console.log(valueExam);
    if (localStorage.getItem("prevBTN") == "true") {
      setStartBookingDay(new Date(localStorage.getItem("startExamDay")).getDate());
      setEndBookingDay(new Date(localStorage.getItem("endExamDay")).getDate());
      setMinTime(new Date("1/1/1111 12:00 AM"))
      setMaxTime(new Date("1/1/1111 11:00 PM"))
      // setBookingDay(new Date(valueExam.startDay));
    } else {
      if (today.getDate() !== BookingDay.getDate()) {
        setStartBookingDay(new Date().getDate());
        setEndBookingDay(new Date().getDate() + 2);
        setBookingDay(new Date());
        setTest(true);
        setMinTime(new Date("1/1/1111 10:00 AM"))
        setMaxTime(new Date("1/1/1111 4:00 PM"))
      }
    }


    // Use below code to always display code
    getData();
    const check =
      roomName.trim().length > 0 &&
      roomType !== "default" &&
      roomNumber !== "default" &&
      getTimeFrom !== 0 &&
      getTimeTo !== 0 &&
      checkTime >= 1 &&
      checkTime <= 3 &&
      checkSelectDay === true &&
      mapItem.indexOf(false) === -1;
    setCheckValid(check);
  }, [
    roomName,
    roomType,
    roomNumber,
    timeFrom,
    getTimeFrom,
    getTimeTo,
    timeTo,
    checkTime,
    checkSelectDay,
    valueExam,
  ]);

  // HTML Form
  return (
    <div className="container">
      <div className="start-0">
        <span>
          {name} | {email} | <img src={image} referrerPolicy="no-referrer" />{" "}
        </span>
      </div>
      <div className="top-0 start-50 ">
        <Logout />
      </div>
      <div className="top-50">
        {/* <div className="top-50 start-50 translate-middle"> */}
        <form onSubmit={saveData}>
          <div className="mb-3">
            <label>Room Name</label>
            <input
              type="text"
              placeholder="Enter Room Name"
              onChange={setNameOfRoom}
              value={roomName}
            />
          </div>
          <div className="mb-3">
            <label>Room Type</label>
            <select
              className="form-select-sm"
              onChange={setTypeOfRoom}
              value={roomType}
            >
              <option value="default" hidden>
                Select Room Type
              </option>
              {/* loop typeRoom to get value into option tag */}
              {/* If have () it call function not have return */}
              {typeRoom.map((type) => (
                <option value={type.value} key={uuid()}>
                  {type.text}
                </option>
              ))}
            </select>
            <label>No.</label>
            <select
              className="form-select-sm"
              onChange={setRoomofNumber}
              value={roomNumber}
              disabled={!selectRoom}
            >
              <option value="default" hidden>
                Select Room Number
              </option>
              {/* loop numberRoom to get value into option tag */}
              {/* If have () it call function not have return */}
              {numberRoom.map((number) => (
                <option value={number.value} key={uuid()}>
                  {number.text}
                </option>
              ))}
            </select>
          </div>
          <label>Select date</label>
          <div className="mb-3">
            {/* <DatePickerComponent
              // availableDates={{ thisDay, tomorrow, dayAfterTomorrow }}
              id="datepicker"
              placeholder="Enter date"
              renderDayCell={weekend}
              onChange={checkDay}
              allowEdit={false}
              enabled={canSelectDateTime}
            /> */}
            <DatePicker
              placeholderText="Select Date"
              selected={day}
              onChange={checkDay}
              minDate={BookingDay}
              maxDate={addDays(BookingDay, period)}
              filterDate={weekend}
              disabled={!canSelectDateTime}
              // minDate={new Date()}
              // maxDate={addDays(new Date(), 2)}
            />
          </div>
          <div className="mb-3">
            <label>Time From</label>
            <DatePicker
              placeholderText="Select time"
              selected={timeFrom}
              onChange={changeTimeFrom}
              showTimeSelect
              showTimeSelectOnly
              minTime={minTime}
              maxTime={maxTime}
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
              disabled={!canSelectDateTime}
            />
            {/* <TimePickerComponent
              id="timepicker"
              placeholder="Select a Time"
              onChange={changeTimeFrom}
              step={60}
              min={minTime}
              max={maxTime}
              allowEdit={false}
              enabled={canSelectDateTime}
            /> */}
            <label>Time To</label>
            <DatePicker
              placeholderText="Select time"
              selected={timeTo}
              onChange={changeTimeTo}
              showTimeSelect
              showTimeSelectOnly
              minTime={minTime}
              maxTime={maxTime}
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
              disabled={!canSelectDateTime}
            />
            {/* <TimePickerComponent
              id="timepicker"
              placeholder="Select a Time"
              onChange={changeTimeTo}
              step={60}
              min={minTime}
              max={maxTime}
              allowEdit={false}
              enabled={canSelectDateTime}
            /> */}
          </div>
          <button type="submit" onClick={addData} disabled={!checkValid}>
            submit
          </button>
        </form>
        <hr />
        {/* If have {} it call callback function must have return */}
        <div className="container">
          {dataShow.map((val) => {
            if (val.email == email) {
              return (
                <div key={uuid()} className="card">
                  <div className="card-body">
                    <h4>Room name : {val.roomName}</h4>
                    <p>Room type : {val.roomType}</p>
                    <p>Room number : {val.roomNumber}</p>
                    <p>Time from : {val.timeFrom}</p>
                    <p>Time to : {val.timeTo}</p>
                    <p>Day : {val.day}</p>
                    <button className="delete-btn"
                      onClick={() => {
                        deleteBooking(val.id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default form;