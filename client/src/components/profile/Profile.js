import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../nav/Nav';
import db from "../../mock/db.json";
import {images} from '../../mock/PFile.json';
import './Profile.css';
import Spinner from '../../spinner';

export default function Profile() {
  const [data, setData] = useState(null);
  const fetchUser = async () => {
    const res = await axios.get("/api/profile/me");
    setData(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const classColors = ['blue', 'red', 'purple'];
  return data === null ? <Spinner/> : (
    <>
      <NavBar />
      <div className={`profile ${classColors[Math.floor(Math.random() * Math.floor(classColors.length))]}`}>
        <div className="profile-flex">
          <img src={images[Number(data.profileImage)].path} className="nav-img " />
          <h1>{data.user.username}</h1>
        </div>
        <div>
          <ul className="hobbies-list">
            <li><span>Bio: </span>{data.bio}</li>
            <li><span>Location:</span> {data.location}</li>
            <li><span>Music: </span>{data.music}</li>
            <li><span>Food: </span>{data.food}</li>
            <li><span>Hobbies:</span> {data.hobbies[0]}</li>
          </ul>
        </div>
      </div>
      <div className="profile-images">
        {db.users.map(user => (
             <img src={user.profileimage} className="photo" />
        ))}
      </div>
    </>
  )
};