import React from 'react';
import matchistador from '../core/matchistador';

const Dashboard = (props) => {
  return (
    <div className="Dashboard">
      <div className="title">Dashboard</div>
      <div className="item-row">
        <div className="item">
          <img src="/img/play-button.png" alt="" />
          <div className="item-desc--container">
            <div className="item-title">Ma musique</div>
            <div className="item-desc">
              {`${props.tracksCount} titres` || 'Aucun titre synchronisé'}
            </div>
          </div>
        </div>
        <button id="sync-btn" className="button" onClick={props.btnFunction}>
          Synchroniser
        </button>
      </div>
      <div className="item-row">
        <div className="item">
          <img src="/img/match.png" alt="" />
          <div className="item-desc--container">
            <div className="item-title">Mes Matchs</div>
            <div className="item-desc">{`${props.matchsCount} Matchs`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
