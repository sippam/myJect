"use client";
import Image from "next/image";

// =============================================================
import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from "react-uuid";
import Axios from "axios";
import { addDays } from "date-fns";
// =============================================================

const Booking = () => {
  // =============================================================

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
  // const name = localStorage.getItem("user");
  // const email = localStorage.getItem("email");
  // const image = localStorage.getItem("image");

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
  const [inputRoom, setInputRoom] = useState(false);
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

  const [BookingDay, setBookingDay] = useState(new Date());
  const [startBookingDay, setStartBookingDay] = useState(new Date().getDate());
  const [endBookingDay, setEndBookingDay] = useState(new Date().getDate() + 2);
  const period = endBookingDay - startBookingDay;
  const today = new Date();

  const weekend = (event) => {
    if (localStorage.getItem("prevBTN") == "true") {
      return (
        event.getDate() >=
          new Date(localStorage.getItem("startExamDay")).getDate() &&
        event.getDate() <=
          new Date(localStorage.getItem("endExamDay")).getDate()
      );
    } else {
      return !(event.getDay() == 6 || event.getDay() == 0);
    }
  };

  // Collect data user type roomName
  const setNameOfRoom = (event) => {
    setRoomName(event.target.value);
    setInputRoom(true);
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
    // event.preventDefault();

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
    setInputRoom(false);
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
  const mapItem = dataShow.map((data) => {
    const calRoomNumberDay =
      String(data.roomType) == roomType &&
      String(data.roomNumber) == roomNumber &&
      Number(data.day) == getDay;
    const calTomeFrom =
      getTimeFrom >= Number(data.timeFrom) && getTimeFrom < Number(data.timeTo);
    console.log(getTimeFrom);
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    // console.log(valueExam);
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

    const getname = localStorage.getItem("user");
    const getemail = localStorage.getItem("email");
    const getimage = localStorage.getItem("image");
    setName(getname);
    setEmail(getemail);
    setImage(getimage);

    if (localStorage.getItem("prevBTN") == "true") {
      setStartBookingDay(
        new Date(localStorage.getItem("startExamDay")).getDate()
      );
      setEndBookingDay(new Date(localStorage.getItem("endExamDay")).getDate());
      setMinTime(new Date("1/1/1111 12:00 AM"));
      setMaxTime(new Date("1/1/1111 11:00 PM"));
      // setBookingDay(new Date(valueExam.startDay));
    } else {
      if (today.getDate() !== BookingDay.getDate()) {
        setStartBookingDay(new Date().getDate());
        setEndBookingDay(new Date().getDate() + 2);
        setBookingDay(new Date());
        setTest(true);
        setMinTime(new Date("1/1/1111 10:00 AM"));
        setMaxTime(new Date("1/1/1111 4:00 PM"));
      }
    }
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
  ]);

  // =============================================================

  return (
    <div className="w-full h-full lg:h-screen dark:bg-[#282a36] uppercase">
      <div id="book" className="max-w-[90%] m-auto px-2 py-60 w-full">
        <p className="text-xl tracking-widest uppercase text-[red]"></p>
        <h2 className=" tracking-wide py-4 text-center dark:text-[white]">
          {" "}
          Booking Page
        </h2>
        <div className="grid lg:grid-cols-5 gap-8 mt-5">
          {/* left */}

          <div className="col-span-3 lg:col-span-2 w-full mx-auto h-full shadow-xl shadow-gray-400 dark:shadow-[black] dark:bg-[#202020] bg-[#F2F2F2] rounded-xl p4">
            {/* <div className="text-center"><h2>let&apos;s book!</h2></div> */}
            <form onSubmit={saveData}>
              <div className="grid md:grid-cols-1 gap-4 w-full py-3">
                <div className="px-3 py-2 ">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reservation Name
                  </label>
                  <input
                    type="text"
                    id="email"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Reservation's Name"
                    onChange={setNameOfRoom}
                    value={roomName}
                  />
                  <div className="text-lg dark:text-[white]">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Type Of Room
                    </label>
                    <select
                      id="countries"
                      class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={setTypeOfRoom}
                      value={roomType}
                      disabled={!inputRoom}
                    >
                      <option value="default" hidden>
                        Select Room Type
                      </option>

                      {typeRoom.map((type) => (
                        <option value={type.value} key={uuid()}>
                          {type.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-lg  dark:text-[white]">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Number Of Room
                    </label>
                    <select
                      id="countries"
                      class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={setRoomofNumber}
                      value={roomNumber}
                      disabled={!selectRoom}
                    >
                      <option value="default" hidden>
                        Select Room Number
                      </option>

                      {numberRoom.map((number) => (
                        <option value={number.value} key={uuid()}>
                          {number.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*====================== DATE ========================== */}
                  <div className="text-lg uppercase dark:text-white">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Date
                    </label>

                    <div className="max-w-lg ">
                      <DatePicker
                        className="relative bg-gray-50 border mb-3 border-gray-300  rounded-lg  bg-transparent  px-4 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholderText="Select Date"
                        selected={day}
                        onChange={checkDay}
                        minDate={BookingDay}
                        maxDate={addDays(BookingDay, period)}
                        filterDate={weekend}
                        disabled={!canSelectDateTime}
                        datepicker
                      />
                    </div>
                  </div>
                  {/* ====================== DATE COPPY========================== */}

                  <div date-rangepicker class="flex items-center justify-start">
                    <div class="relative ">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Time Start
                      </label>

                      <DatePicker
                        name="start"
                        // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        className="flex col-12 relative bg-gray-50 border mb-3 border-gray-300  pl-10 rounded-lg  bg-transparent px-3 w-full  py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholderText="Select Time Start"
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
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {" "}
                      </label>
                      <span class="mx-4 text-gray-500 col-2 items-center justify-center dark:text-white">
                        To
                      </span>
                    </div>
                    <div class="relative ">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Time End
                      </label>

                      <DatePicker
                        name="end"
                        type="text"
                        className="flex col-12 relative bg-gray-50 border mb-3 border-gray-300  pl-10 rounded-lg  bg-transparent px-3 w-full  py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholderText="Select Time End"
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
                    </div>
                  </div>
                </div>

                <div className="px-[30%] py-2 text-center">
                  <button
                    onClick={addData}
                    disabled={!checkValid}
                    className="w-full p-4 py-4 px-7 rounded-full uppercase cursor-pointer hover:scale-[95%] ease-in duration-100 text-sm tracking-widest font-semibold text-white mt-4 shadow-gray-400 dark:shadow-[black]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* right */}

          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 dark:shadow-[black] rounded-xl md:p-4 dark:bg-[#202020] bg-[#F2F2F2]">
            <div>
              <div>
                <div className="lg:p-4 h-full">
                  <Image
                    src="/assets/libranameroomV2.png"
                    width={2212}
                    height={1215}
                    alt="/"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Booking;
