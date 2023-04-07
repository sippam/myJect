import React, { useState, useEffect } from "react";
import Axios from "axios";
import uuid from "react-uuid";
// import TableContainer from "@mui/material/TableContainer";
// import Table from "@mui/material/Table";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableBody from '@mui/material/TableBody';
import AdminSetting from "./AdminSetting";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NativeSelect from "@mui/material/NativeSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/router";

const table = () => {
  const router = useRouter();
  const label = { inputProps: { "aria-label": "Switch demo" } };

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

  const [dataExam, setDataExam] = useState({});

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
  const [dataShow, setDataShow] = useState([]);
  console.log(dataShow);

  useEffect(() => {
    getData();
  }, []);

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

  const [startBooking, setStartBooking] = useState(new Date().getDate());
  const [endBooking, setEndBooking] = useState(new Date().getDate() + 2);
  const periodBooking = endBooking - startBooking;

  useEffect(() => {
    if (localStorage.getItem("startExamDay") !== null && localStorage.getItem("endExamDay")!== null && localStorage.getItem("prevBTN") == "true") {
      setStartBooking(new Date(localStorage.getItem("startExamDay")).getDate())
      setEndBooking(new Date(localStorage.getItem("endExamDay")).getDate())
    } else if (localStorage.getItem("prevBTN") == "false") {
      setStartBooking(new Date().getDate())
      setEndBooking(new Date().getDate() + 2)
    }
    getData();
  }, []);

  const test = [];
  for (let i = 0; i <= periodBooking; i++) {
    test.push(startBooking + i);
  }

  // console.log(test);
  const [date, setDate] = React.useState(new Date().getDate());

  const selectDay = (event) => {
    setDate(event.target.value);
  };

  const [alignment, setAlignment] = useState("Conference");

  const changeTypeRoom = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const match = alignment == "Conference" ? true : false;
  const con1 = dataShow.filter((data) => {
    if (
      data.roomType == "Conference" &&
      data.roomNumber == 1 &&
      data.day == date
    ) {
      return data;
    }
  });

  const con2 = dataShow.filter((data) => {
    if (
      data.roomType == "Conference" &&
      data.roomNumber == 2 &&
      data.day == date
    ) {
      return data;
    }
  });

  const con3 = dataShow.filter((data) => {
    if (
      data.roomType == "Conference" &&
      data.roomNumber == 3 &&
      data.day == date
    ) {
      return data;
    }
  });

  const meet1 = dataShow.filter((data) => {
    if (
      data.roomType == "Meeting" &&
      data.roomNumber == 1 &&
      data.day == date
    ) {
      return data;
    }
  });

  const meet2 = dataShow.filter((data) => {
    if (
      data.roomType == "Meeting" &&
      data.roomNumber == 2 &&
      data.day == date
    ) {
      return data;
    }
  });

  const meet3 = dataShow.filter((data) => {
    if (
      data.roomType == "Meeting" &&
      data.roomNumber == 3 &&
      data.day == date
    ) {
      return data;
    }
  });
  const meet4 = dataShow.filter((data) => {
    if (
      data.roomType == "Meeting" &&
      data.roomNumber == 4 &&
      data.day == date
    ) {
      return data;
    }
  });

  return (
    
<div className="relative max-w-screen-[100%] mx-auto dark:bg-[#282a36]">
      <div className="flex px-0 justify-end items-center dark:bg-[#282a36]">
        <div className="m-10 dark:bg-[#282a36]">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={changeTypeRoom}
            aria-label="Platform"
          >
            <ToggleButton value="Conference" className="dark:text-white">Conference</ToggleButton>
            <ToggleButton value="Meeting" className="dark:text-white">Meeting</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="m-0">
          <Box sx={{ minWidth: 80 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label" className="dark:text-white">Date</InputLabel>

              <Select
              className="dark:text-white"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={date}
                label="Date"
                onChange={selectDay}
              >
                {test.map((data) => {
                  return <MenuItem  value={data}>{data}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div>
            <DatePicker
              className=" flex justify-end items-center  bg-gray-50 border  border-gray-300  rounded-lg  bg-transparent  px-2 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholderText="Exam Start"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={today}
            />
          </div>

          <div>
            <DatePicker
              className="flex justify-end items-center  bg-gray-50 border  border-gray-300  rounded-lg  bg-transparent  px-2 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholderText="Exam End"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={today}
            />
          </div>

          {checkSwitch ? (
            <Switch {...label} onClick={switchOnOff} checked={true} />
          ) : (
            <Switch {...label} onClick={switchOnOff} checked={false} />
          )}
        </div>
      </div>
      

      <div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-[white]">
          <tbody>
            {match ? (
              <>
                <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                  <th className="border justify-center items-center text-center">
                    Conference 1
                  </th>
                  {con1.length > 0 &&
                    con1.map((data) => {
                      return (
                        <>
                          <td className="px-3 py-2 border justify-center items-center text-center">
                            <div className="header">
                              <h4>Reservation Name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Name : {data.name}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                  <th className="border justify-center items-center text-center">
                    Conference 2
                  </th>
                  {con2.length > 0 &&
                    con2.map((data) => {
                      return (
                        <>
                          <td className=" px-3 py-2 border justify-center items-center text-center">
                            <div className="header">
                              <h4>Reservation Name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Name : {data.name}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                  <th className="border justify-center items-center text-center">
                    Conference 3
                  </th>
                  {con3.length > 0 &&
                    con3.map((data) => {
                      return (
                        <>
                          <td className=" px-3 py-2 border justify-center items-center text-center">
                            <div className="header">
                              <h4>Reservation Name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Name : {data.name}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
              </>
            ) : (
              <>
                <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                  <th className="border justify-center items-center text-center">
                    Meeting 1
                  </th>
                  {meet1.length > 0 &&
                    meet1.map((data) => {
                      return (
                        <>
                          <td className=" px-3 py-2 border justify-center items-center text-center">
                            <div className="header">
                              <h4>Reservation Name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Name : {data.name}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                  <th className="border justify-center items-center text-center">
                    Meeting 2
                  </th>
                  {meet2.length > 0 &&
                    meet2.map((data) => {
                      return (
                        <>
                          <td className=" px-3 py-2 border justify-center items-center text-center">
                            <div className="header">
                              <h4>Reservation Name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Name : {data.name}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                  <th className="border justify-center items-center text-center">
                    Meeting 3
                  </th>
                  {meet3.length > 0 &&
                    meet3.map((data) => {
                      return (
                        <>
                          <td className=" px-3 py-2 border justify-center items-center text-center">
                            <div className="header">
                              <h4>Reservation Name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Name : {data.name}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                  <th className="border justify-center items-center text-center">
                    Meeting 4
                  </th>
                  {meet4.length > 0 &&
                    meet4.map((data) => {
                      return (
                        <>
                          <td className=" px-3 py-2 border justify-center items-center text-center">
                            <div className="header ">
                              <h4>Reservation Name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Name : {data.name}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default table;