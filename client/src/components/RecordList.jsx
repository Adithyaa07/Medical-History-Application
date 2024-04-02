import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function RecordList({ patientId }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`/api/patient/${patientId}/records`);
        const data = await response.json(); // Parse the response to JSON
        setRecords(data.records);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, [patientId]);

  return (
    <div className="container mx-auto">
      <h2 className="text-lg font-semibold mb-4">Medical Record</h2>

      {/* Individual record entries */}
      {records.map((record, index) => (
        <div key={index} className="mb-4">
          <div className="rounded-lg border shadow p-4">
            <p className="text-lg font-mono text-gray-400">Doctor: {record.doctor}</p>
            <p className="text-base font-semibold">
              Complaints: {record.complaints}
            </p>
            <p className="text-base">Diagnosis: {record.diagnosis}</p>
            <p className="text-base">Treatment: {record.treatment}</p>
            <p className="text-base">Prescription: {record.prescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecordList;
