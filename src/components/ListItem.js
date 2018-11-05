import React from "react";
import PropTypes from "prop-types";

import "./ListItem.css";

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete() {
    const { onDelete, item } = this.props;

    onDelete(item);
  }

  handleEdit() {
    const { onEdit, item } = this.props;

    onEdit(item);
  }

  render() {
    const { item } = this.props;

    return (
      <li>
        {item.name}
        <button
          type="button"
          className="list-item-button"
          onClick={this.handleEdit}
        >
          Edit
        </button>
        <button
          type="button"
          className="list-item-button"
          onClick={this.handleDelete}
        >
          Delete
        </button>
      </li>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default ListItem;
