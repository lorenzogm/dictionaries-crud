import React from "react";
import PropTypes from "prop-types";

const FormInput = ({ onChange, id, label, value }) => (
  <label>
    {label}
    <input type="text" id={id} value={value} onChange={onChange} />
  </label>
);

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string
};

export default FormInput;
