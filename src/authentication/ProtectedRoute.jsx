import { Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import React from "react";

const ProtectedRoute = ({ children, element, ...rest }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" replace />}
    >
      {children}
    </Route>
  );
};

export default ProtectedRoute;
