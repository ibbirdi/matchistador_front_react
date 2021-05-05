import React, { useEffect, useState } from 'react';
import matchistador from '../core/matchistador';
import userImg from '../img/profile-user.png';

const ConnectStatus = ({ username }) => {
  return (
    <div className="connectstatus">
      <a href="/profil">
        <div className="connecteduser-container" href="/profile">
          <div>{username}</div>
          <img src={userImg} alt="" />
        </div>
      </a>
    </div>
  );
};

export default ConnectStatus;
