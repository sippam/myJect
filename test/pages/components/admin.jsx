import { React } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Table from "./table";
import Navbar from "./Navbar";
<<<<<<< HEAD
=======
import DataChart from "./DataChart";
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)

const admin = () => {

  return (
    <div id="admin" className="w-full lg:h-screen dark:bg-[#282a36]">
      <Navbar />
      <div id="book" className="max-w-[90%] m-auto px-2 py-40 w-full">
<<<<<<< HEAD
=======
        <DataChart />
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)
        <Table />
      </div>
    </div>
  );
};

export default admin;