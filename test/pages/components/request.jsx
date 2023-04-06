import Axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const request = () => {
  const [email, setEmail] = useState("");
  const [dataShow, setDataShow] = useState([]);

  const getData = async () => {
    await Axios.get("http://localhost:3001/customer").then((response) => {
      setDataShow(response.data);
    });
  };
  console.log(dataShow);

  useEffect(() => {
    getData();
    setEmail(localStorage.getItem("email"));
  }, []);

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
    <div>
      <Link href="../components/login" legacyBehavior>
        <a>Home</a>
      </Link>
      <center>
        <table>
          <tbody>
            <tr className="table-style">
              <th className="table-style">Date</th>
              <th className="table-style">Name</th>
              <th className="table-style">Type room</th>
              <th className="table-style">Room number</th>
              <th className="table-style">Period time</th>
              <th className="table-style">Delete</th>
            </tr>
            {dataShow.map((val) => {
              if (val.email == email) {
                return (
                  <tr className="table-style">
                    <td className="table-style">{val.date}</td>
                    <td className="table-style">{val.roomName}</td>
                    <td className="table-style">{val.roomType}</td>
                    <td className="table-style">{val.roomNumber}</td>
                    <td className="table-style">
                      {val.timeFrom} - {val.timeTo}
                    </td>
                    <td className="ha">
                      <button
                        className="delete-btn"
                        onClick={() => {
                          deleteBooking(val.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default request;