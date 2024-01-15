// withPrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const WithPrivateRoute = (Component) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // Redirect to the login page if userId is not present
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default WithPrivateRoute;
