import React from "react";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import LoginPage from "../pages/LoginPage.js";
import RegisterPage from "../pages/RegisterPage.js";

function RoutesAuthedNull({loginSuccess}) {
  return (
    <Routes>
      <Route
        path="/*"
        element={<LoginPage loginSuccess={loginSuccess} />}
      />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

RoutesAuthedNull.propTypes = {
    loginSuccess: PropTypes.func.isRequired
}

export default RoutesAuthedNull;