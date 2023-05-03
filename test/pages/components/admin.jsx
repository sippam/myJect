import { React } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Table from "./table";
import Navbar from "./Navbar";

const admin = () => {

  return (
    <div id="admin" className="w-full lg:h-screen dark:bg-[#282a36]">
      <Navbar />
      <div id="book" className="max-w-[90%] m-auto px-2 py-40 w-full">
        <Table />
      </div>
    </div>
  );
};

export default admin;