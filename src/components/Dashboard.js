import React from 'react';
import iconMusic from '../img/play-button.png';
import iconMatch from '../img/match.png';
const Dashboard = ({ tracksCount, matchsCount, btnFunction }) => {
  return (
    <div className="Dashboard">
      <div className="title-container">
        <h3>Mon compte</h3>
      </div>
      <div className="item-row">
        <div className="item">
          <img src={iconMusic} alt="" />
          <div className="item-desc--container">
            <div className="item-title">Ma musique</div>
            <div className="item-desc">
              {`${tracksCount} titres` || 'Aucun titre synchronisé'}
            </div>
          </div>
        </div>
        <button id="sync-btn" className="button" onClick={btnFunction}>
          Synchroniser
        </button>
      </div>
      <div className="item-row">
        <div className="item">
          <img src={iconMatch} alt="" />
          <div className="item-desc--container">
            <div className="item-title">Mes Matchs</div>
            <div className="item-desc">{`${matchsCount} Matchs`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
