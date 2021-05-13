import React from 'react';
import iconMusic from '../img/play-button.png';
import iconMatch from '../img/match.png';
import Fade from 'react-reveal/Fade';
const Dashboard = ({ tracksCount, matchsCount, btnFunction }) => {
  return (
    <Fade cascade>
      <div className="Dashboard">
        <div className="item-row">
          <div className="item">
            <img src={iconMusic} alt="" />
            <div className="item-desc--container">
              <div className="item-title">Ma musique</div>
              <Fade when={tracksCount}>
                <div className="item-desc">
                  {`${tracksCount} titres` || 'Aucun titre synchronisé'}
                </div>
              </Fade>
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
              <Fade when={matchsCount}>
                <div className="item-desc">{`${matchsCount} Matchs`}</div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Dashboard;
