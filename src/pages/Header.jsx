import React from "react";
import { Outlet } from "react-router-dom";
import { useDataContext } from "./DataProvider";

const header = () => {
  const { dataFor2 } = useDataContext();
  const doctorName = dataFor2 || "רופא"; 
  const doctorInitial = doctorName.charAt(0).toUpperCase();

  return (
    <div className="header">
      <div className="container-fluid bg-primary-subtle position-relative h-20 p-3 flex items-center justify-between">

         
          <div className="text-3xl font-bold text-blue-700 p-5">BloodFlow</div>

         
          <div className="flex items-center p-5">
            <span className="mr-3 text-lg font-semibold">{doctorName}</span>
            <div
              className="user-icon rounded-full bg-success text-white flex justify-center items-center"
              style={{ width: "40px", height: "40px" }}
            >
              {doctorInitial}
            </div>
          </div>
      </div>

      <Outlet />
    </div>
  );
};

export default header;