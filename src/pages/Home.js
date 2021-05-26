import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Matchboard from '../components/Matchboard';
import matchistador from '../core/matchistador';
import { connect } from 'react-redux';
import { getUserInfo, getMyData, sync } from '../store/actions';

import Fade from 'react-reveal/Fade';

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(getUserInfo()),
  getMyData: () => dispatch(getMyData()),
  sync: () => dispatch(sync()),
});

const Home = ({ state, getUserInfo, getMyData, sync }) => {
  useEffect(() => {
    getUserInfo();
    getMyData();
  }, []);

  return (
    <div className="Home">
      <Header />
      <div className="main-container">
        {state.isAuth ? (
          <>
            <Fade spy={state.home.title}>
              <h2>{state.home.title}</h2>
            </Fade>
            <Dashboard
              tracksCount={state.tracks.length}
              matchsCount={state.matchs.length}
              btnFunction={sync}
              btnText={state.home.syncBtnText}
              btnIsActive={state.home.syncBtnIsActive}
            />
            <Matchboard />
          </>
        ) : (
          <>
            <h2>Vous êtes déconnecté</h2>
            <a href="/">
              <div className="button">Par ici !</div>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
