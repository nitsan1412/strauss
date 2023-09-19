import React from "react";
import { Navigate, Route } from "react-router-dom";

import { useAuth } from "../context/auth-context";

function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useAuth(); // Access the user object from the context

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
}

export default ProtectedRoute;
