import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";
import Loading from "../components/Loading";
import ErrorPage from "../pages/ErrorPage";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  // if -> user thake
  if (loading) {
    return <Loading></Loading>;
  }

  // console.log(loading);

  if (user && user?.email) {
    return children;
  }

  //If user NOT logged in and tries to access restricted route
  if (
    location.pathname === "/shareGardeners" ||
    location.pathname === "/myTips"
  ) {
    return (
      <ErrorPage message="Access Denied — You must be logged in to view this page." />
    );
  }

  // user na thake navigate -> login
  return <Navigate to="/auth/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
