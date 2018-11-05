import React from "react";
import PropTypes from "prop-types";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

class DictionaryForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddProperty = this.handleAddProperty.bind(this);
    this.handleChangePropertyKey = this.handleChangePropertyKey.bind(this);
    this.handleChangePropertyValue = this.handleChangePropertyValue.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      fields: {
        name: "",
        properties: { key: "value" }
      },
      error: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dictionary } = this.props;

    if (!nextProps.dictionary || !dictionary) {
      return "";
    }

    if (nextProps.dictionary.id !== dictionary.id) {
      this.setState({ fields: nextProps.dictionary });
    }
  }

  handleAddProperty() {
    const { fields } = this.state;

    let count = 0;
    while (true) {
      const key = `key-${count}`;

      if (fields.properties[key] === undefined) {
        fields.properties[key] = `value ${count}`;
        break;
      }

      count += 1;
    }

    this.setState({ fields });
  }

  handleChangeName(e) {
    if (this.validateName(e.target.value)) {
      this.setState({ fields: { ...this.state.fields, name: e.target.value } });
    }
  }

  validateName(name) {
    this.setState({ error: "" });

    // Error: Cannot be empty
    if (!name) {
      this.setState({ error: "The dictionary name cannot be empty" });
      return false;
    }

    return true;
  }

  handleChangePropertyKey(e) {
    const { fields } = this.state;

    if (this.validatePropertyKey(e.target.value)) {
      // Create the new "key" with the old "value"
      fields.properties[e.target.value] = fields.properties[e.target.id];

      // Delete the old "key"
      delete fields.properties[e.target.id];

      // Update the state
      this.setState({ fields });
    }
  }

  validatePropertyKey(key) {
    const { fields } = this.state;

    this.setState({ error: "" });

    // Error: Cannot be empty
    if (!key) {
      this.setState({ error: "The key cannot be empty" });
      return false;
    }

    // Error: duplicate domains
    if (fields.properties[key] !== undefined) {
      this.setState({ error: `The key "${key}" already exists` });
      return false;
    }

    // Error: property key already defined as a value
    console.log(Object.values(fields.properties));
    console.log(Object.values(fields.properties).indexOf(key));
    if (Object.values(fields.properties).indexOf(key) !== -1) {
      this.setState({
        error: `The key "${key}" is already defined as a value`
      });
      return false;
    }

    return true;
  }

  handleChangePropertyValue(e) {
    const { fields } = this.state;

    if (this.validatePropertyValue) {
      // Update the target "key" with the new "value"
      fields.properties[e.target.id] = e.target.value;

      this.setState({ fields });
    }
  }

  validatePropertyValue(value) {
    const { fields } = this.state;

    this.setState({ error: "" });

    // Error: property value already defined as a key
    if (Object.keys(fields.properties).indexOf(value) !== -1) {
      this.setState({
        error: `The value "${value}" is already defined as a key`
      });
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fields } = this.state;

    if (this.validateName(fields.name)) {
      const { onSubmit } = this.props;

      onSubmit(fields);

      this.setState({
        fields: {
          name: "",
          properties: { key: "value" }
        },
        error: ""
      });
    }
  }

  render() {
    const { legend, formType } = this.props;
    const { fields } = this.state;

    // console.log(formType, this.state);

    if (formType === "UPDATE" && fields.id === undefined) {
      return null;
    }

    const rows = Object.keys(fields.properties);

    return (
      <fieldset>
        <legend>{legend}</legend>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="Name"
            value={fields.name}
            onChange={this.handleChangeName}
          />
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((key, index) => (
                <tr key={index}>
                  <td>
                    <FormInput
                      id={key}
                      value={key}
                      onChange={this.handleChangePropertyKey}
                    />
                  </td>
                  <td>
                    <FormInput
                      id={key}
                      value={fields.properties[key]}
                      onChange={this.handleChangePropertyValue}
                    />
                  </td>
                  <td>
                    {index === rows.length - 1 ? (
                      <button type="button" onClick={this.handleAddProperty}>
                        +
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <input type="submit" value="Save" />
          <FormError error={this.state.error} />
        </form>
      </fieldset>
    );
  }
}

DictionaryForm.propTypes = {
  dictionary: PropTypes.object,
  legend: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default DictionaryForm;
