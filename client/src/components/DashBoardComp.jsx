/* eslint-disable no-unused-vars */
// import React from 'react'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import CanvasJSReact from '@canvasjs/react-charts';


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart =CanvasJSReact.CanvasJSChart;
const options = {
  backgroundColor: "rgb(75 85 99)",
  
  title: {
    text: "Doctors in different field"
  },
  
  data: [{
    type: "doughnut",
startAngle: 60,
//innerRadius: 60,
indexLabelFontSize: 17,
indexLabel: "{label} - #percent%",
toolTipContent: "<b>{label}:</b> {y} (#percent%)",
dataPoints: [
  { y: 67, label: "Cardiologist", },
  { y: 28, label: "Dentist" },
  { y: 10, label: "ENT Specialist" },
  { y: 60, label: "Gynecologist"},
  { y: 15, label: "Pediatrician"},
  { y: 6, label: "Veterinarian"}
]
  }]
}



const DashBoardComp = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [doc, setDoc] = useState([]);
  const [services, setServices] = useState([]);
  const [lastMonthDoc, setLastMonthDoc] = useState(0);
  const [totService, setTotService] = useState(0);
  const [lastSer, setLastSer] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const { currentHospital } = useSelector((state) => state.hospital);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`/api/doctor/get-doctors?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setDoc(data.doctors);
          setDoctors(data.totalDoctors);
          setLastMonthDoc(data.lastMonth);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    // const fetchRecords = async () => {
    //   try {
    //     const res = await fetch(
    //       "/api/patient/records"
    //     );
    //     const data = await res.json();
    //     setRecords(data.records);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

    const fetchService = async () => {
      try{
        const res = await fetch(`/api/service/getServices?limit=5`);
        const data = await res.json();
        if(res.ok){
          setServices(data.services);
          setTotService(data.totalServices);
          setLastSer(data.lastMonth);
        }
      }
      catch (error) {
        console.log(error.message)
      }
    }

    const fetchPatients = async () => {
      try {
        const res = await fetch(`/api/patient/getPatients?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.patients);
          setPatients(data.totalPatients);
          setLastMonthUsers(data.lastMonth);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentHospital.isAdmin) {
      fetchDoctors();
      fetchPatients();
      fetchService();
      // fetchRecords();
    }
  }, [currentHospital]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md font-semibold ">Total Patients</h3>
              <p className="text-2xl">{patients}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-md font-semibold">Total Doctors</h3>
              <p className="text-2xl">{doctors}</p>
            </div>
            <HiAnnotation className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthDoc}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-md font-semibold">New Services</h3>
              <p className="text-2xl">{totService}</p>
            </div>
            <HiAnnotation className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastSer}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Patients</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=patients">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Patient Name</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Blood Group</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <Link to={`/patient/${user._id}`}>{user.name}</Link>
                    </Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.blood}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Doctors</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=doctors">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Doctor Name</Table.HeadCell>
              <Table.HeadCell>specialization</Table.HeadCell>
              <Table.HeadCell>Blood Group</Table.HeadCell>
            </Table.Head>
            {doc &&
              doc.map((dt) => (
                <Table.Body key={dt._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <Link to={`/doctor/${dt._id}`}>{dt.name}</Link>
                    </Table.Cell>
                    <Table.Cell>{dt.specialization}</Table.Cell>
                    <Table.Cell>{dt.email}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Services</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=services">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Service Name</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            {services &&
              services.map((dt) => (
                <Table.Body key={dt._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {dt.name}
                    </Table.Cell>
                    <Table.Cell>{dt.price}</Table.Cell>
                    <Table.Cell>{dt.status}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <CanvasJSChart  options={options} />
      </div>
    </div>
  );
};

export default DashBoardComp;
