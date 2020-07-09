import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/Profile";
import PropTypes from 'prop-types';
import "./Feed.css";
import data from "../../mock/db.json";
import NavBar from '../nav/Nav';
import Spinner from '../../spinner';
import axios from "axios";
import AOS from 'aos'; 
import 'aos/dist/aos.css';


const Feed = ({ auth: { isAuth, loading } }) => {
  const [mockData, setData] = useState(data); // State with Hooks s
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    const res = await axios.get("/api/profile/me"); // Getting Data from from the api route. User Must Be Login with Api Token 
    setUserData(res.data)  // Getting Data from from the api route. User Must Be Login with Api Token 
  };
  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => { // Use Effect is ran after the componets have load. 
    fetchUser(); // The Effect Hook lets you perform side effects in function components:
    AOS.init({
      duration : 1000
    });
    AOS.refresh();
  }, [])

// Conditional Rendering If the userdata has not loaded it will just load the loading spinner 
  return userData === null ? <Spinner/> : (
    <>
      <NavBar />
      <h1 className="welcome-text">Welcome Back, {userData.user.username}</h1>
      <div className="feed">
        {mockData.users.map(user => (
          <div className="user-card"  data-aos="zoom-in">
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
            <div className="icons">
            <i class="fas fa-heart"></i>
            <i class="fas fa-comment"></i>
            <i class="fas fa-sliders-h"></i>
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