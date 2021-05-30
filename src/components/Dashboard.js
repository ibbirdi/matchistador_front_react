import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { sync } from '../store/actions';

import iconMusic from '../img/play-button.png';
import iconMatch from '../img/match.png';
import barsSvg from '../img/bars.svg';
import checkSvg from '../img/check-mark.svg';

import Fade from 'react-reveal/Fade';

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  matchs: state.matchs,
  syncBtnText: state.home.syncBtnText,
  syncBtnIsActive: state.home.syncBtnIsActive,
  syncBtnLoadingAnimation: state.home.syncBtnLoadingAnimation,
});

const mapDispatchToProps = (dispatch) => ({
  sync: () => dispatch(sync()),
});

const Dashboard = ({
  tracks,
  matchs,
  sync,
  syncBtnText,
  syncBtnIsActive,
  syncBtnLoadingAnimation,
}) => {
  return (
    <Fade>
      <div className="Dashboard">
        <div className="item-row">
          <div className="item">
            <img src={iconMusic} alt="" />
            <div className="item-desc--container">
              <div className="item-title">Ma musique</div>
              <Fade spy={tracks}>
                <div className="item-desc">
                  {tracks.length !== 0
                    ? `${tracks.length} titres`
                    : 'Aucun titre synchronisé'}
                </div>
              </Fade>
            </div>
          </div>
          <button
            id="sync-btn"
            className={classNames('button', {
              wait: syncBtnLoadingAnimation === 'loading',
              success: syncBtnLoadingAnimation === 'complete',
            })}
            onClick={sync}
            disabled={!syncBtnIsActive}
          >
            {syncBtnLoadingAnimation === 'loading' && (
              <img src={barsSvg} alt="" />
            )}
            {syncBtnLoadingAnimation === 'complete' && (
              <img src={checkSvg} alt="" />
            )}
            {syncBtnText}
          </button>
        </div>
        <div className="item-row">
          <div className="item">
            <img src={iconMatch} alt="" />
            <div className="item-desc--container">
              <div className="item-title">Mes Matchs</div>
              <Fade spy={matchs}>
                <div className="item-desc">{`${matchs.length} Matchs`}</div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
