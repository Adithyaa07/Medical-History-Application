/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";

function RecordForm({ patientId }) {
  // Component code here

  const [recordData, setRecordData] = useState({
    doctor: "",
    prescription: "",
    diagnosis: "",
    treatment: "",
    complaints: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !recordData.doctor ||
      !recordData.prescription ||
      !recordData.complaints ||
      !recordData.treatment ||
      !recordData.diagnosis
    ) {
      return setErrorMessage("Please fill in all fields");
    }

    try {
      const res = await fetch(`/api/patient/${patientId}/records`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.errorMessage);
      }

      if (res.ok) {
        setLoading(false);
        setSuccessMessage("Record added successfully");
        setErrorMessage(null);
        setRecordData({
          doctor: "",
          prescription: "",
          diagnosis: "",
          treatment: "",
          complaints: "",
        });
      }
      // Optionally, you can refresh the record list here after adding a new record
    } catch (error) {
      console.error("Error submitting record:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <Label htmlFor="doctor" className="block font-bold mb-2">
            Doctor
          </Label>
          <TextInput
            type="text"
            id="doctor"
            name="doctor"
            value={recordData.doctor}
            onChange={handleChange}
            className="border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="complaints" className="block font-bold mb-2">
            Complaints
          </Label>
          <Textarea
            id="complaints"
            name="complaints"
            value={recordData.complaints}
            onChange={handleChange}
            className="border rounded-md px-4 py-2 w-full h-20 resize-none focus:outline-none focus:border-blue-500"
          ></Textarea>
        </div>
        <div className="mb-4">
          <Label htmlFor="diagnosis" className="block font-bold mb-2">
            Diagnosis
          </Label>
          <TextInput
            type="text"
            id="diagnosis"
            name="diagnosis"
            value={recordData.diagnosis}
            onChange={handleChange}
            className="border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="treatment" className="block font-bold mb-2">
            Treatment
          </Label>
          <TextInput
            type="text"
            id="treatment"
            name="treatment"
            value={recordData.treatment}
            onChange={handleChange}
            className="border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="prescription" className="block font-bold mb-2">
            Prescription
          </Label>
          <TextInput
            type="text"
            id="prescription"
            name="prescription"
            value={recordData.prescription}
            onChange={handleChange}
            className="border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading</span>
            </>
          ) : (
            "Add Record"
          )}
        </Button>
      </form>
      {errorMessage && (
        <Alert className="mt-5" color="failure">
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert color="success" className="mt-5">
          {successMessage}
        </Alert>
      )}
    </div>
  );
}

export default RecordForm;
