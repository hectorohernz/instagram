import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';
import './Nav.css'
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import { getCurrentProfile } from "../../actions/Profile";
import Spinner from '../../spinner';
const NavBar = ({ auth: {isAuth, loading}, logout, getCurrentProfile, profile}) => {
  
    // State Takes two params.
    const [clicked, hasBeenClickedOn] = useState(false)
    const [data, setData ] = useState(null);

    useEffect(() => {
        // Update the document title using the browser API
       setData(profile.profile)
      });
    
    return data === null ? < Spinner/> : (
        <div className="container">
            <header>
                <nav className={`navbar ${clicked ? "change" : ""}`}>
                    <div className={`hamburger--container`} onClick={() => {
                        if (clicked) {
                            hasBeenClickedOn(false);
                        } else {
                            hasBeenClickedOn(true);
                        }
                    }}>
                        <div className="hamburger--line line--1"></div>
                        <div className="hamburger--line line--2"></div>
                        <div className="hamburger--line line--3"></div>
                    </div>
                    <ul className="ul--navlinks">
                        <img src={data.profileImage} alt="Instagram picture" width="100" height="100"></img>
                        <h1>{data.user.username}</h1>
                        <li><a href="/profile"><h3><FaUser />  Profile</h3></a></li>
                        <li><a href="/feed"><h3><FaHome />   Feed</h3></a></li>
                        <li><a href="/search"><h3><FaSearch />   Search</h3></a></li>
                        {/* <li><a href="/"><h3><FaPaperPlane />   Log off</h3></a></li> */}
                        <li><a href="/" onClick={logout}><h3><FaPaperPlane />   Log off</h3></a></li>

                    </ul>
                </nav>
            </header>
        </div>
    );
}

NavBar.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    logout : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})


export default connect(mapStateToProps, {logout, getCurrentProfile})(NavBar)