import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "react-datepicker/dist/react-datepicker.css";

const UserTable = () => {

  const getData = () => {
    Axios.get("http://localhost:3001/customer").then((response) => {
      setDataShow(response.data);
    });
  };

  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    getData();
  });


  const [startBooking, setStartBooking] = useState(new Date().getDate());
  const [endBooking, setEndBooking] = useState(new Date().getDate() + 2);
  const periodBooking = endBooking - startBooking;

  useEffect(() => {
    if (
      localStorage.getItem("startExamDay") !== null &&
      localStorage.getItem("endExamDay") !== null &&
      localStorage.getItem("prevBTN") == "true"
    ) {
      setStartBooking(new Date(localStorage.getItem("startExamDay")).getDate());
      setEndBooking(new Date(localStorage.getItem("endExamDay")).getDate());
    } else if (localStorage.getItem("prevBTN") == "false") {
      setStartBooking(new Date().getDate());
      setEndBooking(new Date().getDate() + 2);
    }
    getData();
  }, []);

  const showPeriodDay = [];
  for (let i = 0; i <= periodBooking; i++) {
    showPeriodDay.push(startBooking + i);
  }

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
    <div className="w-full h-screen text-center relative max-w-screen-[100%] mx-auto dark:bg-[#282a36]">
      <div className="flex px-0 justify-end items-center dark:bg-[#282a36]">
        <div className="m-10 dark:bg-[#282a36]">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={changeTypeRoom}
            aria-label="Platform"
          >
            <ToggleButton value="Conference" className="dark:text-white">
              Conference
            </ToggleButton>
            <ToggleButton value="Meeting" className="dark:text-white">
              Meeting
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="m-0">
          <Box sx={{ minWidth: 80 }}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-label"
                className="dark:text-white"
              >
                Date
              </InputLabel>

              <Select
                className="dark:text-white"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={date}
                label="Date"
                onChange={selectDay}
              >
                {showPeriodDay.map((data) => {
                  return <MenuItem value={data}>{data}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className="flex justify-center  h-screen">
        <table class="w-[50%] text-sm text-left text-gray-500 dark:text-[white]">
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

export default UserTable;
