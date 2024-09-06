import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const IsAdminRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <>
      {currentUser && currentUser.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default IsAdminRoute;
