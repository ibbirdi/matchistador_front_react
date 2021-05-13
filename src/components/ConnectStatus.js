import React from 'react';
import { Link } from 'react-router-dom';
import userImg from '../img/profile-user.png';
import Fade from 'react-reveal/Fade';
const ConnectStatus = ({ username }) => {
  return (
    <div className="connectstatus">
      <Link to="/profil">
        <div className="connecteduser-container" href="/profile">
          <div>{username}</div>
          <img src={userImg} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default ConnectStatus;
