/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import Settings from "../components/Settings";
import Doctors from "../components/Doctors";
import Patients from "../components/Patients";
import DashBoardComp from "../components/DashBoardComp";

const DashBoard = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSideBar />
      </div>

      {tab === "profile" && <DashProfile />}
      {tab === "settings" && <Settings />}
      {tab === "doctors" && <Doctors />}
      {tab === "patients" && <Patients />}
      {tab === "dash" && <DashBoardComp />}
    </div>
  );
};

export default DashBoard;
