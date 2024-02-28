import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "./useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();

  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};

export default RequireAuth;