import React from "react";
import PropTypes from "prop-types";

import ListCount from "./ListCount";
import ListItem from "./ListItem";

import "./List.css";

const List = ({ label, list, onDelete, onEdit }) => (
  <div className="list">
    <ListCount length={list.length} label={label} />
    <ul>
      {list.map((item, index) => (
        <ListItem item={item} key={index} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  </div>
);

List.propTypes = {
  list: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default List;
