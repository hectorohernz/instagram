import React, { useState } from "react";
import {link, withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./create.css";
import {createProfile} from '../../actions/Profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    bio: "",
    recFile: null,
    location: "",
    hobbies: "",
    music: "",
    food: "",
    martial: "",
  });
  const { bio, recFile, location, hobbies, music, food, martial } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })


  const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history);
    };

  return (
    <section className="create-profile">
      <h1> Create Your Profile</h1>
      <form onSubmit={(e => onSubmit(e))}>
      <label htmlFor="recFile">Profile Photo</label>
      <input type="file" id='recFile' value={recFile} name="recFile"  onChange={(e) => onChange(e)} />
        <input
          type="text"
          value={bio}
          name="bio"
          placeholder="Enter Bio"
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          value={hobbies}
          name="hobbies"
          placeholder="Enter Hobbies Ex: Basketball, Football,"
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          value={food}
          name="food"
          placeholder="Enter Favorite Food"
          onChange={(e) => onChange(e)}
        />
        <select id="martial"  name="martial" value={martial}  onChange={(e) => onChange(e)}>
          <option value="N/A">Enter Martial Status</option>
          <option value="single">Single</option>
          <option value="Dating">Dating</option>
          <option value="Married">Married</option>
        </select>
        <select id="music"  name="music"   value={music} onChange={(e) => onChange(e)}>
          <option value="N/A">Enter Favorite Music Genre</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Pop">Pop</option>
          <option value="Indie">Indie</option>
          <option value="Rock">Rock</option>
        </select>
        <input
          type="text"
          value={location}
          name="location"
          placeholder="Enter location"
          onChange={(e) => onChange(e)}
        />
        <input type="submit" value="Submit"  />
      </form>
    </section>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};


export default connect(null, {createProfile})(withRouter(CreateProfile));
