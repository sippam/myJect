import React, { useState, useEffect } from "react";
import Axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
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

const table = () => {
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Axios.get("http://localhost:3001/customer").then((response) => {
      setDataShow(response.data);
    });
  };
  console.log(dataShow);

  const time = [
    { id: "10", text: "10:00 - 11:00" },
    { id: "11", text: "11:00 - 12:00" },
    { id: "12", text: "12:00 - 13:00" },
    { id: "13", text: "13:00 - 14:00" },
    { id: "14", text: "14:00 - 15:00" },
    { id: "15", text: "15:00 - 16:00" },
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

  const numberInRoomConferece = [
    { value: 1, text: 1 },
    { value: 2, text: 2 },
    { value: 3, text: 3 },
  ];

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
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Date</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>{new Date().getDate()}</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="containerAdmin">
        {dataShow.length > 0 &&
          dataShow.map((val) => {
            return (
              <div key={uuid()} className="card">
                <div className="card-body">
                  <h4>Room name : {val.roomName}</h4>
                  <p>Room type : {val.roomType}</p>
                  <p>Room number : {val.roomNumber}</p>
                  <p>Time from : {val.timeFrom}</p>
                  <p>Time to : {val.timeTo}</p>
                  <p>Day : {val.day}</p>
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
          })}
      </div>
    </>
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
