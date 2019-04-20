import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileForm from './profileForm.js';
import './profile.css';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <h1>{this.props.name}</h1>
        <ProfileForm profile={this.props.profile} />
      </div>
    );
  }
}

Profile.defaultProps = {
  profile: {
    name: '',
    gender: '',
    email: '',
    phone: ''
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired
}

export default Profile;
