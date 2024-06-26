/* eslint-disable no-unused-vars */
// import React from 'react'
import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiUserGroup } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { MdMedicalServices } from "react-icons/md";
import { CiHospital1 } from "react-icons/ci";
import { GrAnnounce } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { SignOutSuccess } from "../redux/hospital/hospitalSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DashSideBar() {
  const { currentHospital } = useSelector((state) => state.hospital);
  const location = useLocation();
  const [tab, setTab] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("api/hospital/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(SignOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Logo className="px-4 py-2 text-blue center font-bold rounded bg-gradient-to-r from-purple-600 to-pink-400 text-gray text-3xl">
        Doc Vault
      </Sidebar.Logo>

      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item className="flex" icon={CiHospital1}>
            Welcome {currentHospital.HospitalName}
          </Sidebar.Item>
          <Link to="/dashboard?tab=dash">
            <Sidebar.Item active={tab === "dash"} icon={RxDashboard} as="div">
              Dashboard
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=patients">
            <Sidebar.Item
              icon={HiUserGroup}
              active={tab === "patients"}
              as="div"
            >
              Patient
            </Sidebar.Item>
          </Link>
          {currentHospital && (
            <Link to="/dashboard?tab=doctors">
              <Sidebar.Item
                active={tab === "doctors"}
                icon={FaUserDoctor}
                as="div"
              >
                Doctors
              </Sidebar.Item>
            </Link>
          )}
          {currentHospital && (
            <Link to="/dashboard?tab=services">
              <Sidebar.Item
                active={tab === "services"}
                icon={MdMedicalServices}
                as="div"
              >
                Services
              </Sidebar.Item>
            </Link>
          )}
          {currentHospital && (
            <Link to="/dashboard?tab=campaigns">
              <Sidebar.Item
                active={tab === "campaigns"}
                icon={GrAnnounce}
                as="div"
              >
                Campaigns
              </Sidebar.Item>
            </Link>
          )}

          {/* <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentHospital.HospitalName}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link> */}
          <Sidebar.Item
            onClick={handleSignOut}
            icon={HiArrowSmRight}
            className="cursor-pointer"
            as="div"
          >
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
