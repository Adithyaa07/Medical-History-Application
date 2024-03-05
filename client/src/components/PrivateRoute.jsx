import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentHospital } = useSelector((state) => state.hospital);
  return currentHospital ? <Outlet /> : <Navigate to="/sign-in" />;
}
