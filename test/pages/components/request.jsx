import Axios from "axios";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import { getData } from './CollectData'
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)

const request = () => {
  const [email, setEmail] = useState("");
  const [dataShow, setDataShow] = useState([]);

<<<<<<< HEAD
  const getData = async () => {
    await Axios.get("http://localhost:3001/customer").then((response) => {
      setDataShow(response.data);
    });
  };
  console.log(dataShow);

  useEffect(() => {
    getData();
=======
  const getUserData = async () => {
    const data = await getData();
    setDataShow(data);
  }

  useEffect(() => {
    getUserData();
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)
    setEmail(localStorage.getItem("email"));
  });

  const deleteBooking = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setDataShow(
        dataShow.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div id="list" className="pt-[200px] dark:bg-[#282a36]">
      <div className="w-full h-screen text-center ">
        <div className="max-w-[100%] w-full h-3/5 mx-auto p-2 justify-center items-center ">
          <h2 className="md-auto tracking-wide py-6 text-center dark:text-[white]">
            My Booking
          </h2>
          <div className="relative max-w-screen-xl mx-auto">
            <table class="w-full text-sm text-gray-500 justify-center items-center text-center dark:text-[white]">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-[white]">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Type room</th>
                  <th className="px-6 py-3">Room number</th>
                  <th className="px-6 py-3">Period time</th>
                  <th className="px-6 py-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {dataShow.map((val) => {
                  if (val.email == email) {
                    return (
                      <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{val.date}</td>
                        <td className="px-6 py-4">{val.roomName}</td>
                        <td className="px-6 py-4">{val.roomType}</td>
                        <td className="px-6 py-4">{val.roomNumber}</td>
                        <td className="px-6 py-4">
                          {val.timeFrom}:00 - {val.timeTo}:00
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="delete-btn"
                            onClick={() => {
                              deleteBooking(val.id);
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default request;