import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import storage from "@/utils/storage";

const RouteUnauth = (props) => {
  const currentUser = useSelector((state) => state.global.currentUser);

  // eslint-disable-next-line react/prop-types
  if (props?.path?.includes("set-password")) {
    if (storage.get("access_token")) {
      storage.clear();
    }
  }

  if (currentUser) return <Redirect to="/" />;

  return <Route {...props} />;
};

export default RouteUnauth;
