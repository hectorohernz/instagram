import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/Profile";
import PropTypes from 'prop-types';
import "./Feed.css";
import data from "../../mock/db.json";
import NavBar from '../nav/Nav';
import Spinner from '../../spinner';
import axios from "axios";


const Feed = ({ auth: { isAuth, loading } }) => {
  const [mockData, setData] = useState(data);
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    const res = await axios.get("/api/profile/me");
    setUserData(res.data)
  };

  useEffect(() => {
    fetchUser();
  }, [])


  return userData === null ? "" : (
    <>
      <NavBar />
      <h1 className="welcome-text">Welcome Back, {userData.user.username}</h1>
      <div className="feed">
        {mockData.users.map(user => (
          <div className="user-card">
            <div className="user-card-info">
              <div className="user-info-1">
                <img src={user.profileimage} className="user-image" />
                <div>
                  <p className="username">{user.username}</p>
                  <p className="upload-time">{user.uploadtime}</p>
                </div>
              </div>
            </div>    
            <div className="photo-container">
              <img src={user.profileimage} className="photo" />
            </div>
        
          </div>
        ))}
      </div>

    </>
  )
};

Feed.protoTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Feed);