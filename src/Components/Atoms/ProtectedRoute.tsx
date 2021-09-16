import React from "react";
import { Redirect, Route } from "react-router-dom";
import { RouteProps } from "react-router";

function ProtectedRoute({ children, ...otherProps }: RouteProps) {
  const isAuthenticated = localStorage.getItem("user");
  return (
    <Route
      {...otherProps}
      render={() => (isAuthenticated ? children : <Redirect to="/login" />)}
    />
  );
}

export default ProtectedRoute;
