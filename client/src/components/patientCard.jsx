import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
const PatientCard = ({ patient }) => {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <div className="p-3 flex flex-col gap-2">
        <Link to={`/doctor/${patient._id}`}>
          <p className="text-lg font-semibold line-clamp-2">{patient.name}</p>
        </Link>
        <span className="italic text-sm">Age {patient.age}</span>
      </div>
      <div>
        <div className="font-bold p-2 text-teal-500">Medical Records</div>
        {patient.records.map((record, index) => (
          <div key={index} className="p-3 border-t border-gray-200">
            <p>
              <span className="font-bold">Complaints : </span>{" "}
              <span className="text-sm italic text-gray-500">
                {record.complaints}
              </span>
            </p>
            <p>
              <span className="font-bold">Doctor: </span>{" "}
              <span className="text-sm italic text-gray-500">
                {record.doctor}
              </span>
            </p>
            <p>
              <span className="font-bold">Prescription: </span>{" "}
              <span className="text-sm italic text-gray-500">
                {record.prescription}
              </span>
            </p>
            <p>
              <span className="font-bold">Diagnosis: </span>{" "}
              <span className="text-sm italic text-gray-500">
                {record.diagnosis}
              </span>
            </p>
            <p>
              <span className="font-bold">Treatment: </span>{" "}
              <span className="text-sm italic text-gray-500">
                {record.treatment}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientCard;
