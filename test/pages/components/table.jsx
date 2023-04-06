import React, { useState, useEffect } from "react";
import Axios from "axios";
import uuid from "react-uuid";
// import TableContainer from "@mui/material/TableContainer";
// import Table from "@mui/material/Table";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableBody from '@mui/material/TableBody';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NativeSelect from "@mui/material/NativeSelect";

const table = () => {
  const [dataShow, setDataShow] = useState([]);
  console.log(dataShow);

  useEffect(() => {
    getData();
  }, []);

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

  const time = [
    { id: "10", text: "10:00 - 11:00" },
    { id: "11", text: "11:00 - 12:00" },
    { id: "12", text: "12:00 - 13:00" },
    { id: "13", text: "13:00 - 14:00" },
    { id: "14", text: "14:00 - 15:00" },
    { id: "15", text: "15:00 - 16:00" },
  ];

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

  // const [xd, setXD] = useState([]);

  // const other = {
  //   autoHeight: true,
  //   showCellVerticalBorder: true,
  //   showColumnVerticalBorder: true,
  // };

  // const column = time.map((data) => {
  //   return { field: `${data.text}`, flex: 1 };
  // });

  // const rows = dataShow.map((data) => {
  //   return {
  //     id: uuid(),
  //     [`${data.timeFrom}`]: data.roomName,
  //   };
  // });

  // const getRowId = (row) => row.id;
  // const getChildRows = (parentRow, allRows) => {
  //   return parentRow.children;
  // };

  // const testItem = dataShow.map(() => {
  //   dataShow.map((val) => {
  //     const space = [];
  //     const period = val.timeTo - val.timeFrom;
  //     for (let i = 0; i < val.timeFrom - 10; i++) {
  //       space.push(<th></th>);
  //     }
  //     return (
  //       <>
  //         {/* <span className="nested"> */}
  //         <tr
  //         // className="table-style"
  //         >
  //           <th>
  //             <span className="table-style-deletetop nestedHead">Con 1</span>
  //           </th>
  //           {space}
  //           <th
  //             colSpan={val.timeTo - val.timeFrom + 1}
  //             className={
  //               period == 1
  //                 ? "nested table-style-deletetop"
  //                 : period == 2
  //                 ? "nested2 table-style-deletetop"
  //                 : period == 3
  //                 ? "nested3 table-style-deletetop"
  //                 : null
  //             }
  //           >
  //             <div className="header">
  //               {val.roomName}
  //               <span className="description">
  //                 Email : {val.email}
  //                 <br />
  //                 Name : {val.name}
  //                 <br />
  //                 Day : {val.day}
  //                 <br />
  //                 Period : {val.timeFrom}:00 - {val.timeTo}:00
  //                 <br />
  //                 <button
  //                   className="delete-btn"
  //                   onClick={() => {
  //                     deleteBooking(val.id);
  //                   }}
  //                 >
  //                   Delete
  //                 </button>
  //               </span>
  //             </div>
  //           </th>
  //           {/* </span> */}
  //         </tr>
  //         {/* </span> */}
  //       </>
  //     );
  //   });
  // });
  // console.log(testItem);

  const [startBooking, setStartBooking] = useState(new Date().getDate());
  const [endBooking, setEndBooking] = useState(new Date().getDate() + 2);
  const periodBooking = endBooking - startBooking;

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
    <div className="pt-[30px]">
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={changeTypeRoom}
        aria-label="Platform"
      >
        <ToggleButton value="Conference">Conference</ToggleButton>
        <ToggleButton value="Meeting">Meeting</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Date</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            label="Date"
            onChange={selectDay}
          >
            {test.map((data) => {
              return <MenuItem value={data}>{data}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>

      <div>
        <table>
          <tbody>
            {match ? (
              <>
                <tr>
                  <th className="table-style">Conference 1</th>
                  {con1.length > 0 &&
                    con1.map((data) => {
                      return (
                        <>
                          {/* <div className="header">
                              {val.roomName}
                              <span className="description">
                                Email : {val.email}
                                <br />
                                Name : {val.name}
                                <br />
                                Day : {val.day}
                                <br />
                                Period : {val.timeFrom}:00 - {val.timeTo}:00
                                <br />
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(val.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </span>
                            </div> */}
                          <td className="table-style">
                            {/* <div key={uuid()} className="card"> */}
                            {/* <div className="card-body"> */}
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(val.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                            {/* </div> */}
                            {/* </div> */}
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr>
                  <th className="table-style">Conference 2</th>
                  {con2.length > 0 &&
                    con2.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
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
                <tr>
                  <th className="table-style">Conference 3</th>
                  {con3.length > 0 &&
                    con3.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
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
                <tr>
                  <th className="table-style">Meeting 1</th>
                  {meet1.length > 0 &&
                    meet1.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
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
                <tr>
                  <th className="table-style">Meeting 2</th>
                  {meet2.length > 0 &&
                    meet2.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
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
                <tr>
                  <th className="table-style">Meeting 3</th>
                  {meet3.length > 0 &&
                    meet3.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
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
                <tr>
                  <th className="table-style">Meeting 4</th>
                  {meet4.length > 0 &&
                    meet4.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
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
            {/* {typeRoom.map((data) => (
              {numberInRoomConferece.map((time) => (
                  <tr>
                    <th>
                      {data} : {time}
                    </th>
                  </tr>
                ))}
              ))}
            ))} */}

            {/* <tr>
              <th>Con1</th>
            </tr>
            <tr>
              <th>Con2</th>
            </tr>
            <tr>
              <th>Con3</th>
            </tr> */}
          </tbody>
        </table>

        {/* {dataShow.length > 0 &&
          dataShow.map((val) => {
            return (
              <div key={uuid()} className="card">
                <div className="card-body">
                  <h4>Room name : {val.roomName}</h4>
                  <p>Room type : {val.roomType}</p>
                  <p>Room number : {val.roomNumber}</p>
                  <p>Date : {val.day}</p>
                  <p>
                    Period : {val.timeFrom}:00 - {val.timeTo}:00
                  </p>
                  <p>Email : {val.email}</p>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      deleteBooking(val.id);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })} */}
      </div>
    </div>
    // <center>
    //   <table>
    //     <tbody>
    //       <tr>
    //         <th className="">TEst</th>
    //         {time.map((val) => {
    //           return (
    //             <th className="table-style" key={uuid()}>
    //               {val.text}
    //             </th>
    //           );
    //         })}
    //       </tr>
    //       {numberInRoomConferece.map((data) => (
    //         <tr>
    //           <th className="table-style">Conference {data.text}</th>
    //           {/* เปลี่ยตรง ==1 มันจะแยกแสดงทีละ row */}
    //           {data.text == 2 && (
    //             <>
    //               {dataShow.map((val) => {
    //                 const space = [];
    //                 const period = val.timeTo - val.timeFrom;
    //                 for (let i = 0; i < val.timeFrom - 10; i++) {
    //                   space.push(<th></th>);
    //                 }
    //                 return (
    //                   <>
    //                     {/* <span className="nested"> */}
    //                     <tr
    //                     // className="table-style"
    //                     >
    //                       {space}
    //                       <th
    //                         colSpan={val.timeTo - val.timeFrom + 1}
    //                         className={
    //                           period == 1
    //                             ? "nested table-style-deletetop"
    //                             : period == 2
    //                             ? "nested2 table-style-deletetop"
    //                             : period == 3
    //                             ? "nested3 table-style-deletetop"
    //                             : null
    //                         }
    //                         // style={period == 1
    //                         //   ? "margin-left: %;"
    //                         //   : period == 2
    //                         //   ? "nested2 table-style-deletetop"
    //                         //   : period == 3
    //                         //   ? "nested3 table-style-deletetop"
    //                         //   : null}
    //                       >
    //                         <div className="header">
    //                           {val.roomName}
    //                           <span className="description">
    //                             Email : {val.email}
    //                             <br />
    //                             Name : {val.name}
    //                             <br />
    //                             Day : {val.day}
    //                             <br />
    //                             Period : {val.timeFrom}:00 - {val.timeTo}:00
    //                             <br />
    //                             <button
    //                               className="delete-btn"
    //                               onClick={() => {
    //                                 deleteBooking(val.id);
    //                               }}
    //                             >
    //                               Delete
    //                             </button>
    //                           </span>
    //                         </div>
    //                       </th>
    //                       {/* </span> */}
    //                     </tr>
    //                     {/* </span> */}
    //                   </>
    //                 );
    //               })}
    //             </>
    //           )}
    //         </tr>
    //       ))}
    //       {dataShow.map((val) => {
    //         const space = [];
    //         const period = val.timeTo - val.timeFrom;
    //         for (let i = 0; i < val.timeFrom - 10; i++) {
    //           space.push(<th></th>);
    //         }
    //         return (
    //           <>
    //             {/* <span className="nested"> */}
    //             <tr
    //             // className="table-style"
    //             >
    //               <th>
    //                 <span className="table-style-deletetop nestedHead">
    //                   Con 1
    //                 </span>
    //               </th>
    //               {space}
    //               <th
    //                 colSpan={val.timeTo - val.timeFrom + 1}
    //                 className={
    //                   period == 1
    //                     ? "nested table-style-deletetop"
    //                     : period == 2
    //                     ? "nested2 table-style-deletetop"
    //                     : period == 3
    //                     ? "nested3 table-style-deletetop"
    //                     : null
    //                 }
    //               >
    //                 <div className="header">
    //                   {val.roomName}
    //                   <span className="description">
    //                     Email : {val.email}
    //                     <br />
    //                     Name : {val.name}
    //                     <br />
    //                     Day : {val.day}
    //                     <br />
    //                     Period : {val.timeFrom}:00 - {val.timeTo}:00
    //                     <br />
    //                     <button
    //                       className="delete-btn"
    //                       onClick={() => {
    //                         deleteBooking(val.id);
    //                       }}
    //                     >
    //                       Delete
    //                     </button>
    //                   </span>
    //                 </div>
    //               </th>
    //               {/* </span> */}
    //             </tr>
    //             {/* </span> */}
    //           </>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    //   {/* <div style={{ position: "absolute", width: "90%" }}>
    //     <DataGrid
    //     columns={column}
    //     rows={rows}
    //     autoHeight
    //     disableColumnFilter
    //     disableRowSelectionOnClick
    //     disableColumnSelector
    //     disableColumnMenu
    //     hideFooter
    //     getRowId={(row) => uuid()}
    //     {...other}
    //     />
    //     <DataGrid
    //       rows={rows}
    //       columns={columns}
    //       getRowId={getRowId}
    //       getChildRows={getChildRows}
    //     />
    //   </div> */}
    // </center>
  );
};

export default table;

// {dataShow.map((val) => {
//   {
//     return time.map((time) => {
//       if (val.timeFrom == time.id) {
//         return (
//           <tr key={uuid()}>
//             <th
//               className="ha"
//               colSpan={val.timeTo - val.timeFrom + 1}
//             >
//               test
//             </th>
//           </tr>
//         );
//       }
//     });
//   }
// })}
