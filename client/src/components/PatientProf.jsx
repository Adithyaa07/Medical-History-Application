import DashSideBar from "./DashSideBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import RecordForm from "./RecordForm";
import RecordList from "./RecordList";

function PatientProf() {
  const { patientId } = useParams();
  const [activeItem, setActiveItem] = useState("records");
  const [, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [patient, setPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/patient/getPatients?patientId=${patientId}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPatient(data.patients[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPatient();
  }, [patientId]);

  const toggleItem = (item) => {
    setActiveItem(activeItem === item ? item : item);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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
            {patient && (
              <>
                {patient.gender === "M" ? (
                  <h3 className="text-xl font-bold">Mr. {patient.name}</h3>
                ) : (
                  <h3 className="text-xl font-bold">Ms. {patient.name}</h3>
                )}
              </>
            )}
          </div>

          <p>{patient && patient.phone}</p>
          {/* <p>{doctor && doctor.userId}</p> */}

          <ul className="p-3 gap-2">
            <li
              className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold"
              onClick={() => toggleItem("records")}
            >
              Medical Records
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

            <li
              className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold"
              onClick={() => toggleItem("healthInfo")}
            >
              Health Information
            </li>
            <li
              className="text-blue-500 cursor-pointer hover:underline mt-3 font-semibold"
              onClick={() => toggleItem("personal")}
            >
              Personal Information
            </li>
          </ul>
        </div>
      </div>

      <div className=" my-10 border-teal-500 border-2 rounded-lg h-fit md:w-2/4 m-10 p-8">
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
                placeholder="Mr./Mrs."
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
              <label className="font-semibold">Emergency Contact</label>
              <TextInput className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
              <label className="font-semibold">Address</label>
              <TextInput className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
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
        {activeItem === "appointments" && (
          <div className="mt-0">Appointments</div>
        )}
        {activeItem === "Payments" && <div className="mt-0">Payments</div>}
        {activeItem === "healthInfo" && (
          <div className="mt-0 ">
            <div className="flex flex-col space-y-3 mt-3">
              <div>
                <Label className="font-semibold ">Blood Group</Label>
                <select
                  className="ml-4 border bg-white text-gray-700 p-2 rounded-md"
                  id="gender"
                  onChange={(e) => e.target.value}
                >
                  <option value="">Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <label className="font-semibold text-nowrap">Weight</label>
              <TextInput
                className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="60Kg"
              />
              <label className="mt-5 font-semibold">Height</label>
              <TextInput
                className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="5.5ft"
              />
              <label className="font-semibold">Allergies</label>
              <Textarea
                className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="beans, nuts etc"
              />
              <label className="font-semibold">Habits</label>
              <Textarea
                className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="smoking, drinking, drugs etc"
              />
              <label className="font-semibold">Medical History</label>
              <Textarea
                className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="diabetes, malaria, glaucoma etc"
              />
              <div className="flex gap-4 w-full">
                <span>
                  <Button>Delete Information</Button>
                </span>
                <span>
                  <Button>Save Changes</Button>
                </span>
              </div>
            </div>
          </div>
        )}
        {activeItem === "records" && (
          <div className="mt-0">
            <RecordList patientId={patientId} />
            <div
              onClick={() => setShowModal(true)}
              className="cursor-pointer text-white bg-blue-500 mt-5 py-2 px-4 rounded-md hover:bg-blue-600 w-max mx-auto transition-all duration-300"
            >
              Add New Record
            </div>
            <div>
              <Modal show={showModal} onClose={() => setShowModal(false)} popup>
                <Modal.Header>
                  <div className="text-center p-3 text-2xl my-7 font-bold">
                    Add New Medical Record
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <RecordForm patientId={patientId} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientProf;
{
  /* <RecordForm patientId={patientId} /> */
}
