import React, { useState } from "react";
import {  withRouter, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./create.css";
import { images } from '../../mock/PFile.json';
import axios from 'axios';
import { createProfile } from '../../actions/Profile'
const CreateProfile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    hobbies: "",
    music: "",
    food: "",
    martial: "",
    profileImage: 0
  });
  const [formCompleted, updateFormCompleted] = useState(false);

  const { bio, profileImage, location, hobbies, music, food, martial } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': "application/json"
      }
    };
   try{
      await axios.post("/api/profile", formData, config);
      updateFormCompleted(true);
   } catch(err){
    console.log(err);
   };
  };
  if(formCompleted){
    return <Redirect to="/successful"/>
}

  return (
    <section className="create-profile">
      <h1> Create Your Profile</h1>
      <form onSubmit={(e => onSubmit(e))}>
        <div className="image">
          <img src={images[profileImage].path} className="profile-image" alt={`images-${profileImage}`} />
        </div>
        <select id="profileImage" name="profileImage" value={profileImage} onChange={(e) => onChange(e)}>
          <option value="0">Choose Profile Image</option>
          <option value="1">Robot Cop</option>
          <option value="2">Woman Avatar</option>
          <option value="3">Men Avatar</option>
          <option value="4">Woman Avatar</option>
          <option value="5">Woman Avatar</option>
        </select>
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
        <select id="martial" name="martial" value={martial} onChange={(e) => onChange(e)}>
          <option value="N/A">Enter Martial Status</option>
          <option value="single">Single</option>
          <option value="Dating">Dating</option>
          <option value="Married">Married</option>
        </select>
        <select id="music" name="music" value={music} onChange={(e) => onChange(e)}>
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
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </section>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};


export default connect(null, { createProfile })(withRouter(CreateProfile));
