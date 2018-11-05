import React from "react";
import PropTypes from "prop-types";

const ListCount = ({ length, label }) => {
  if (length === 0) {
    return <h2>No data</h2>;
  }

  const itemLabel = length === 1 ? label.singular : label.plural;

  return (
    <h2>
      {length} {itemLabel}
    </h2>
  );
};

ListCount.propTypes = {
  label: PropTypes.object.isRequired,
  length: PropTypes.number.isRequired
};

export default ListCount;
