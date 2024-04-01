/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'
import {
  Alert,
  Button,
  Label,
  Modal,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Doctors() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const navigate = useNavigate();
  const { currentHospital } = useSelector((state) => state.hospital);
  const [userDoctor, setUserDoctor] = useState([]);
  const [docId, setDocId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(
          `/api/doctor/get-doctors`
          // ?userId=${currentHospital._id}
        );
        //
        const data = await res.json();
        if (res.ok) {
          setUserDoctor(data.doctors);
          if (data.doctors.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDoctor();
  }, [currentHospital._id]);

  const handleShowMore = async () => {
    const startIndex = userDoctor.length;
    try {
      const res = await fetch(
        `/api/doctor/get-doctors?userId=${currentHospital._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserDoctor((prev) => [...prev, ...data.doctors]);
        if (data.doctors.length < 9) {
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
      !formData.email ||
      !formData.password ||
      !formData.specialization
    ) {
      return setErrorMessage("Please fill in all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/doctor/create-doctor", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.errorMessage);
      }

      if (res.ok) {
        setLoading(false);
        navigate("/dashboard?tab=doctors");
        setShowModal(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteDoctor = async () => {
    setShowModal2(false);
    try {
      const res = await fetch(`/api/doctor/delete-doctor/${docId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserDoctor((prev) => prev.filter((doc) => doc._id !== docId));
      }
    } catch (error) {
      console.log(error.message);
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

  const searchPatient = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/searchP?${searchQuery}`);
  };

  return (
    <div className="table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <form className="w-60 gap-2 m-2" onSubmit={searchPatient}>
        <TextInput
          type="text"
          placeholder='Search "Patients"'
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <h1 className="text-center text-3xl my-7 font-semibold w-full p-10 rounded-lg flex-col">
        Doctors Information
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

      {userDoctor.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Doctor Name</Table.HeadCell>
              <Table.HeadCell>Specialization</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>

              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {userDoctor.map((doc) => (
              <Table.Body key={doc._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/doctor/${doc._id}`}>{doc.name}</Link>
                  </Table.Cell>
                  <Table.Cell>{doc.specialization}</Table.Cell>
                  <Table.Cell>{doc.email}</Table.Cell>
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
        <p>You Have No doctors</p>
      )}
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer text-white bg-blue-500 mt-5 py-2 px-4 rounded-md hover:bg-blue-600 w-max mx-auto transition-all duration-300"
      >
        Add New Doctor
      </div>

      <div>
        <Modal show={showModal} onClose={() => setShowModal(false)} popup>
          <Modal.Header>
            <div className="text-center p-3 text-2xl my-7 font-bold">
              Add Doctor
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="w-700 h-900">
              <form
                className="flex flex-col gap-2 w-650 mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="border-dashed border-2 border-gray-300 rounded-lg p-10 h-40 text-center">
                  <p className="text-gray-600">
                    Drag and drop your profile image here
                  </p>
                </div>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <span>
                    <Label className="text-gray-600">Doctor Name</Label>
                    <TextInput
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="Doctor name"
                      id="name"
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    <Label className="text-gray-600">Specialization</Label>
                    <TextInput
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="Dentist, Cardiologist, etc.."
                      id="specialization"
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
                    <Label className="text-gray-600">Email</Label>
                    <TextInput
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="Email.."
                      id="email"
                      onChange={handleChange}
                    />
                  </span>
                </div>

                <div>
                  <Label className="text-gray-600">Password</Label>
                  <TextInput
                    className="border p-2 rounded-md "
                    type="password"
                    placeholder="*******"
                    id="password"
                    onChange={handleChange}
                  />
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
                    "Add Doctor"
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
        <Modal
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
        </Modal>
      </div>
    </div>
  );
}
