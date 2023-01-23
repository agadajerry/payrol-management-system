import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isSuccess } = useSelector((state: RootState) => state.authReducer);

  return isSuccess ? <Outlet /> : <Navigate to="/" />;
}
