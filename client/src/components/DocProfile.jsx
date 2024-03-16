// import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashSideBar from "./DashSideBar";

export default function DocProfile() {
  const { doctorId } = useParams();
  const [, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [doctor, setDoctor] = useState(null);
  console.log(doctor);
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSideBar />
      </div>

      <div className="sidebar w-1/4 p-6">
        <img
          src="profile.jpg"
          alt="Profile"
          className="profile-image rounded-full w-30 h-24 mb-6"
        />
        <div>
          <h3 className="text-xl font-semibold">
            {" "}
            {doctor && doctor.name}
            <span className="italic">({doctor && doctor.specialization})</span>
          </h3>
        </div>
        <p className="text-gray-300">{doctor && doctor.email}</p>
        <p className="text-gray-300">{doctor && doctor.phone}</p>

        <ul className="menu mt-6 p-3 gap-2">
          <li className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold">
            Personal Information
          </li>
          <li className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold">
            Policies
          </li>
          <li className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold">
            Appointments
          </li>
          <li className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold">
            Payments
          </li>
          <li className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold">
            Invoices
          </li>
          <li className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold">
            Access Control
          </li>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Change Password
          </button>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content w-2/4 p-6">
        {/* Profile Image Section */}
        {/* Implement drag-and-drop functionality using a library like react-dropzone */}
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-600">Drag and drop your profile image here</p>
          {/* Additional text or instructions can be customized */}
        </div>

        {/* Form Section */}
        {/* Add input fields for editing user information */}
        {/* Implement logic to handle form submission */}
      </div>
    </div>
  );
}
