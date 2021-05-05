import React, { useEffect, useState } from 'react';
import matchistador from '../core/matchistador';

const ConnectStatus = ({ username }) => {
  return (
    <div className="connectstatus">
      <a href="/profil">
        <div className="connecteduser-container" href="/profile">
          <div>{username}</div>
          <img src="/img/profile-user.png" alt="" />
        </div>
      </a>
    </div>
  );
};

export default ConnectStatus;
