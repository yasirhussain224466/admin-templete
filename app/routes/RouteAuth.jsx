import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import AuthLayout from "@/containers/AuthLayout";
import storage from "@/utils/storage";

// eslint-disable-next-line react/prop-types
const RouteAuth = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state?.global?.currentUser);

  if (!storage.get("access_token") && !currentUser) {
    storage.set("path", JSON.stringify(rest?.computedMatch?.url));
  }

  if (!storage.get("access_token") && !currentUser)
    return <Redirect to="/login" />;
  storage.remove("path");

  return (
    <Route {...rest}>
      <AuthLayout>
        <Component />
      </AuthLayout>
    </Route>
  );
};

RouteAuth.propTypes = {
  component: PropTypes.element,
};

export default RouteAuth;
