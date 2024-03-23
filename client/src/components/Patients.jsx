// import React from 'react'

import {
  Table,
  Alert,
  Button,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Patients() {
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { currentHospital } = useSelector((state) => state.hospital);
  const [userPatient, setUserPatient] = useState([]);
  const [showModal2, setShowModal2] = useState(false);
  const [docId, setDocId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(
          `/api/patient/getPatients?userId=${currentHospital._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserPatient(data.patients);
          if (data.patients.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPatient();
  }, [currentHospital._id]);

  const handleShowMore = async () => {
    const startIndex = userPatient.length;
    try {
      const res = await fetch(
        `/api/doctor/getPatients?userId=${currentHospital._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPatient((prev) => [...prev, ...data.patients]);
        if (data.patients.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.phone ||
      !formData.age ||
      !formData.blood ||
      !formData.gender
    ) {
      return setErrorMessage("Please fill in all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/patient/createPatient", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.errorMessage || "Failed to add patient");
      }

      setLoading(false);
      navigate("/dashboard?tab=patients");
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="text-center text-3xl my-7 font-semibold w-full p-10 rounded-lg flex-col">
        Patients Information
      </h1>
      <form className="w-40 gap-2 m-2" onSubmit={handleSearch}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {userPatient.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Patient</Table.HeadCell>
              <Table.HeadCell>Gender</Table.HeadCell>
              <Table.HeadCell>Age</Table.HeadCell>
              <Table.HeadCell>Blood Group</Table.HeadCell>

              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {userPatient.map((doc) => (
              <Table.Body key={doc._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/patient/${doc._id}`}>{doc.name}</Link>
                  </Table.Cell>
                  <Table.Cell>{doc.gender}</Table.Cell>
                  <Table.Cell>{doc.age}</Table.Cell>
                  <Table.Cell>{doc.blood}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal2(true);
                        setDocId(doc._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You Have No Patients</p>
      )}
      <div>
        <Modal show={showModal} onClose={() => setShowModal(false)} popup>
          <Modal.Header>
            <div className="text-center p-3 text-2xl my-7 font-bold">
              Add Patient
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="w-500 h-max">
              <form
                className="flex flex-col gap-2 max-w-md mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <span>
                    <Label className="text-gray-600">Patient Name</Label>
                    <TextInput
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="First Name"
                      id="name"
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    <Label className="text-gray-600">Age</Label>
                    <TextInput
                      className="border p-2 rounded-md w-full"
                      type="text"
                      id="age"
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    {" "}
                    <Label className="text-gray-600">Mobile Number</Label>
                    <TextInput
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="9874569875"
                      id="phone"
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    <Label className="text-gray-600">Blood Group</Label>
                    <TextInput
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="AB+, B-...."
                      id="blood"
                      onChange={handleChange}
                    />
                  </span>
                </div>
                <div>
                  <Label className="text-gray-600 gap-1 text-wrap p-3 ">Gender</Label>
                  <select
                    className="border p-2 rounded-md"
                    id="gender"
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading</span>
                    </>
                  ) : (
                    "Add Patient"
                  )}
                </Button>
              </form>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </Modal.Body>
        </Modal>
        {/* <Modal
          show={showModal2}
          onClose={() => setShowModal2(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteDoctor}>
                  Yes, I am sure
                </Button>
                <Button color="gray" onClick={() => setShowModal2(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal> */}
      </div>
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer text-white bg-blue-500 mt-5 py-2 px-4 rounded-md hover:bg-blue-600 w-max mx-auto transition-all duration-300"
      >
        Add New Patient
      </div>
    </div>
  );
}

export default Patients;
