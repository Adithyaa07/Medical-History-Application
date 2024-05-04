/* eslint-disable no-unused-vars */

import {
  Alert,
  Button,
  Label,
  Modal,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Services() {
  const { currentHospital } = useSelector((state) => state.hospital);
  const [formData, setFormData] = useState({});
  const [services, setServices] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          "/api/service/getService"
          // ?userId=${currentHospital._id}
        );
        const data = await res.json();
        if (res.ok) {
          setServices(data.services);
          if (data.services.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchService();
  }, [currentHospital._id]);

  const handleShowMore = async () => {
    const startIndex = services.length;
    try {
      const res = await fetch(
        `/api/service/getService?userId=${currentHospital._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setServices((prev) => [...prev, ...data.services]);
        if (data.services.length < 9) {
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
    if (!formData.name || !formData.status || !formData.price) {
      return setErrorMessage("Please fill in all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/service/createService", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.errorMessage || "Failed to add Service");
      }
      setLoading(false);
      navigate("/dashboard?tab=services");
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="table-auto w-4/5 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className=" text-left  text-4xl my-7 font-semibold rounded-lg flex-col">
        Services
      </h1>
      {services.length > 0 ? (
        <>
          <Table hoverable className="shadow-md mt-10">
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Price(Rs.)</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>

              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {services.map((doc) => (
              <Table.Body key={doc._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{doc.name}</Table.Cell>
                  <Table.Cell>
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{doc.price}</Table.Cell>
                  {doc && (
                    <>
                      {doc.status === "Disabled" ? (
                        <Table.Cell className="text-red-500">
                          {doc.status}
                        </Table.Cell>
                      ) : (
                        <Table.Cell className="text-green-500">
                          {doc.status}
                        </Table.Cell>
                      )}
                    </>
                  )}

                  <Table.Cell>
                    <span
                      onClick={() => {
                        // setShowModal2(true);
                        // setDocId(doc._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Edit
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
        <p>No services Available right now.</p>
      )}

      <div>
        <Modal show={showModal} onClose={() => setShowModal(false)} popup>
          <Modal.Header>
            <div className="text-center p-3 text-2xl my-7 font-bold">
              Add New Service
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="w-900 h-900">
              <form
                className="flex flex-col gap-2 w-700"
                onSubmit={handleSubmit}
              >
                <div className=" gap-3 mt-2 py-2">
                  <Label className="text-gray-600">Service Name</Label>
                  <TextInput
                    className="border  rounded-md w-full"
                    type="text"
                    placeholder="Name"
                    id="name"
                    onChange={handleChange}
                  />

                  <Label className="text-gray-600">price</Label>
                  <TextInput
                    className="border rounded-md w-full"
                    type="text"
                    id="price"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label className="text-gray-600 gap-1 text-wrap p-3 ">
                    Status
                  </Label>
                  <select
                    className="border p-2 rounded-md"
                    id="status"
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
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
                    "Add Service"
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
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer text-white bg-blue-500 mt-5 py-2 px-4 rounded-md hover:bg-blue-600 w-max mx-auto transition-all duration-300"
      >
        Add New Service
      </div>
    </div>
  );
}

export default Services;
