// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // Redirect to the login page if userId is not present
    return <Navigate to="/" />;
  }

  return <Route element={() => element} />;
};

export default PrivateRoute;
