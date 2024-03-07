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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const res = await fetch("/api/auth/create-doctor", {
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
      setLoading(false);
      if (res.ok) {
        navigate("/dashboard?tab=doctors");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="w-full p-10 rounded-lg flex-col">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Doctors Information
      </h1>

      <div>
        <div>
          <Table striped>
            <Table.Head className="w-full">
              <Table.HeadCell>Doctor Name</Table.HeadCell>
              <Table.HeadCell>Specialization</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>

            <Table.Body className="py-6">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Apple MacBook Pro 17"'}
                </Table.Cell>
                <Table.Cell>Sliver</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Microsoft Surface Pro
                </Table.Cell>
                <Table.Cell>White</Table.Cell>
                <Table.Cell>Laptop PC</Table.Cell>
                <Table.Cell>$1999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Magic Mouse 2
                </Table.Cell>
                <Table.Cell>Black</Table.Cell>
                <Table.Cell>Accessories</Table.Cell>
                <Table.Cell>$99</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Google Pixel Phone
                </Table.Cell>
                <Table.Cell>Gray</Table.Cell>
                <Table.Cell>Phone</Table.Cell>
                <Table.Cell>$799</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Apple Watch 5
                </Table.Cell>
                <Table.Cell>Red</Table.Cell>
                <Table.Cell>Wearables</Table.Cell>
                <Table.Cell>$999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            
          </Table>
          <div 
              onClick={() => setShowModal(true)}
              className="cursor-pointer text-white bg-blue-500 mt-5 py-2 px-4 rounded-md hover:bg-blue-600 w-max mx-auto transition-all duration-300"
            >
              Create Doctor
            </div>
        </div>
      </div>
      <div>
        <Modal show={showModal} onClose={() => setShowModal(false)} popup>
          <Modal.Header>
            <h4 className="text-center p-3 text-2xl my-7 font-bold">
              Add Doctor
            </h4>
          </Modal.Header>
          <Modal.Body>
            <div className="w-500 h-max">
              <form
                className="flex flex-col gap-2 max-w-md mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <span>
                    <Label className="text-gray-600">Doctor Name</Label>
                    <TextInput
                      className="border p-2 rounded-md w-full"
                      // className="grid gap-4 mb-4 grid-cols-2"
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
      </div>
    </div>
  );
}

export default Doctors;
