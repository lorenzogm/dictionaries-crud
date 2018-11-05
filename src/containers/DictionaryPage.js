import React from "react";
import uuidv4 from "uuid/v4";

import DictionaryForm from "./DictionaryForm";
import List from "../components/List";

import "./DictionaryPage.css";

class DictionaryPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = { list: [], selectedItem: {} };
  }

  // Create a new element from the CREATE form
  handleCreate(dictionary) {
    const { list } = this.state;

    dictionary.id = uuidv4();
    list.push(dictionary);

    this.setState({ list });
  }

  // Delete the selected element
  handleDelete(dictionary) {
    const { list } = this.state;

    const index = list.findIndex(d => d.id === dictionary.id);

    list.splice(index, 1);

    this.setState({ list });
  }

  // Select the element to edit and populate the UPDATE form
  handleEdit(dictionary) {
    console.log(dictionary);
    this.setState({ selectedItem: dictionary });
  }

  // Update the element from the UPDATE form
  handleUpdate(dictionary) {
    const { list } = this.state;
    const index = list.findIndex(d => d.id === dictionary.id);

    list.splice(index, 1, dictionary);

    this.setState({ list, selectedItem: {} });
  }

  render() {
    const { list } = this.state;

    return (
      <div className="DictionaryPage">
        <div className="forms">
          <DictionaryForm
            formType="CREATE"
            legend="New dictionary"
            onSubmit={this.handleCreate}
          />
          <DictionaryForm
            formType="UPDATE"
            dictionary={this.state.selectedItem}
            legend="Update dictionary"
            onSubmit={this.handleUpdate}
          />
        </div>
        <fieldset>
          <legend>Dictionary Overview</legend>
          <List
            label={{ singular: "dictionary", plural: "dictionaries" }}
            list={list}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
        </fieldset>
      </div>
    );
  }
}

export default DictionaryPage;
