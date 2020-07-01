import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/Profile";
import PropTypes from 'prop-types';
import "./Feed.css";
import data from "../../mock/db.json";
import NavBar from '../nav/Nav';

/*
  constructor(props) {
    super(props);
    this.state = {
      mockData: data,
      data: null
    };
  }




  <NavBar />

  componentDidMount(){
    this.setState({ data: this.props.profile })
  }

  render() {
    return (
      <div>
        <header>
          <div className="container1">
            <img src="../images/instagram-logo.png"></img>
          </div>
        </header>

        {this.state.mockData.users.map((person) => (
          <div>
            <div className="container">
              <div className="post">
                <div className="post-header">
                  <h2>{person.username}</h2>
                  <span>{person.uploadtime}</span>
                </div>

                <div>
                  <img
                    className="profile-image"
                    src={person.profileimage}
                  ></img>
                </div>
                <div className="likes">
                  <p>{person.likes}</p>
                  <img src="../images/instagram-heart.png"></img>
                  <img src="../images/comments.png"></img>
                  <img src="../images/dms.png"></img>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }*/

const Feed = ({getCurrentProfile, auth, profile}) => {
    useEffect( () => {
        getCurrentProfile();
    },[])
    const [mockData, setData ] = useState(data);
    return(
        <div>
          <NavBar />
          <header>
            <div className="container1">
              <img src="../images/instagram-logo.png"></img>
            </div>
          </header>
  
          {mockData.users.map((person) => (
            <div>
              <div className="container">
                <div className="post">
                  <div className="post-header">
                    <h2>{person.username}</h2>
                    <span>{person.uploadtime}</span>
                  </div>
  
                  <div>
                    <img
                      className="profile-image"
                      src={person.profileimage}
                    ></img>
                  </div>
                  <div className="likes">
                    <p>{person.likes}</p>
                    <img src="../images/instagram-heart.png"></img>
                    <img src="../images/comments.png"></img>
                    <img src="../images/dms.png"></img>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    )
}

Feed.protoTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile})(Feed);