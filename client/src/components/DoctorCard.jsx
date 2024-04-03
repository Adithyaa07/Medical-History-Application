import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function DoctorCard({ doctor }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2  overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <div className="p-3 flex flex-col gap-2">
        <Link to={`/doctor/${doctor._id}`}>
          <p className="text-lg font-semibold line-clamp-2">{doctor.name}</p>
        </Link>
        <span className="italic text-sm">{doctor.specialization}</span>
      </div>
    </div>
  );
}
