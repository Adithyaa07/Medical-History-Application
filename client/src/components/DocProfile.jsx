// import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashSideBar from "./DashSideBar";
import { Button, TextInput } from "flowbite-react";
import Patients from "./Patients";

export default function DocProfile() {
  const { doctorId } = useParams();
  const [activeItem, setActiveItem] = useState("personal");
  const [, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/doctor/get-doctors?doctorId=${doctorId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setDoctor(data.doctors[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  const toggleItem = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSideBar />
      </div>

      <div className="border-teal-500 border-2 rounded-lg md:w-1/4 m-4 p-6">
        <div className="md:self-center">
          <img
            src="profile.jpg"
            alt="Profile"
            className=" border-2 rounded-full w-24 h-24 mb-6"
          />
          <div>
            <h3 className="text-xl font-bold">
              {" "}
              Dr. {doctor && doctor.name}
              <span className="italic">
                ({doctor && doctor.specialization})
              </span>
            </h3>
          </div>
          <p>{doctor && doctor.email}</p>
          <p>{doctor && doctor.phone}</p>
          {/* <p>{doctor && doctor.userId}</p> */}

          <ul className="p-3 gap-2">
            <li
              className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold"
              onClick={() => toggleItem("personal")}
            >
              Personal Information
            </li>

            <li
              className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold"
              onClick={() => toggleItem("patients")}
            >
              Patients
            </li>
            <li
              className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold"
              onClick={() => toggleItem("appointments")}
            >
              Appointments
            </li>
            <li
              className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold"
              onClick={() => toggleItem("payments")}
            >
              Payments
            </li>

            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
              Change Password
            </button>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className=" my-20 border-teal-500 border-2 rounded-lg md:w-2/4 m-10 p-8">
        {activeItem === "personal" && (
          <>
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-10 h-40 text-center">
              <p className="text-gray-600">
                Drag and drop your profile image here
              </p>
            </div>
            <div className="flex flex-col space-y-3 mt-3">
              <label className="font-semibold">Title</label>
              <TextInput
                className="border border-gray-300 font-semibold rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Dr."
              />
              <label className="font-semibold text-nowrap">Full Name</label>
              <TextInput
                className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="John Doe"
              />
              <label className="mt-5 font-semibold">Phone Number</label>
              <TextInput
                className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="123-456-7890"
              />
              <label className="font-semibold">Email</label>
              <TextInput
                className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="example@example.com"
              />
              <div className="flex gap-4 w-full">
                <span>
                  <Button>Delete Account</Button>
                </span>
                <span>
                  <Button>Save Changes</Button>
                </span>
              </div>
            </div>
          </>
        )}
        {activeItem === "patients" && (
          <div className="mt-0 h-screen">
            <Patients />
          </div>
        )}
      </div>
    </div>
  );
}
