import React, { Component } from 'react';
import './profileForm.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.props.profile, formMessage: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  removeInvalidClasses(requiredFields) {
    requiredFields.forEach((element) => {
      element.classList.remove('profile-form__field--invalid');
    });

    this.setState({ formMessage: '' });
  }

  addValidationMessage(emptyFields) {
    const emptyFieldNames = emptyFields.map((element) => element.name);

    this.setState({ formMessage: capitalizeFirstLetter(`${emptyFieldNames.join(', ')} can not be blank`) });
  }

  showFormSuccess() {
    this.setState({ formMessage: 'Form submitted!' });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value} );
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const requiredFields = [
      event.target.name,
      event.target.gender,
      event.target.email,
      event.target.phone
    ]

    const emptyFields = requiredFields.filter((element) => (
      !Boolean(element.value)
    ));

    this.removeInvalidClasses(requiredFields);

    if (emptyFields.length) {
      this.addValidationMessage(emptyFields);

      emptyFields.forEach((element) => {
        element.classList.add('profile-form__field--invalid');
      });

    } else {
      this.showFormSuccess();

      console.log({
        name: event.target.name.value,
        gender: event.target.gender.value,
        email: event.target.email.value,
        phone: event.target.phone.value
      });
    }

  }

  render() {
    const { name, gender, email, phone, formMessage } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label className="profile-form__row">
          Name:
          <input
            defaultValue={name}
            onChange={this.handleChange}
            className="profile-form__field" name="name" type="text"
          />
        </label>
        <label className="profile-form__row">
          Gender:
          <select
            defaultValue={gender}
            onChange={this.handleChange}
            className="profile-form__field profile-form__select" name="gender"
          >
            <option value="unspecified">Unspecified</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="profile-form__row">
          Email:
          <input
            defaultValue={email}
            onChange={this.handleChange}
            className="profile-form__field"
            name="email"
            type="text"
          />
        </label>
        <label className="profile-form__row">
          Phone:
          <input
            defaultValue={phone}
            onChange={this.handleChange}
            className="profile-form__field"
            name="phone"
            type="text"
          />
        </label>
        <div className="profile-form__row">
          <input type="submit" value="Save" />
        </div>
        <div className="profile-form__row">
          {formMessage === 'Form submitted!' ? (
            <span className="profile-form__message">
              Form submitted!
            </span>
          ) : (
            <span className="profile-form__message profile-form__message--invalid">
              {formMessage}
            </span>
          )}
        </div>
      </form>
    )
  }
}

export default ProfileForm;
