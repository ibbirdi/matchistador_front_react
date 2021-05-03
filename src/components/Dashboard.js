import React from 'react';

const Dashboard = ({ tracksCount, matchsCount, btnFunction }) => {
  return (
    <div className="Dashboard">
      <h3>Dashboard</h3>
      <div className="item-row">
        <div className="item">
          <img src="/img/play-button.png" alt="" />
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
          <img src="/img/match.png" alt="" />
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
