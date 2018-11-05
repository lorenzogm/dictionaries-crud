import React from "react";
import PropTypes from "prop-types";

import "./FormError.css";

const FormError = ({ error }) => {
  if (!error) {
    return "";
  }

  return <div className="FormError">{error}</div>;
};

FormError.propTypes = {
  error: PropTypes.string
};

export default FormError;
