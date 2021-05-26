import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Matchboard from '../components/Matchboard';
import matchistador from '../core/matchistador';
import { connect } from 'react-redux';
import { getUserInfo, getMyData } from '../store/actions';

import Fade from 'react-reveal/Fade';

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(getUserInfo()),
  getMyData: () => dispatch(getMyData()),
});

const Home = ({ state, getUserInfo, getMyData }) => {
  const syncThenReload = async () => {
    // try {
    //   let syncBtn = document.getElementById('sync-btn');
    //   setTitle('Synchronisation en cours...');
    //   await matchistador.getMyTracks();
    //   const tracks = await matchistador.showMyTracks();
    //   const matchs = await matchistador.showMyMatchs();
    //   setFilteredMatchs(matchs.filter((match) => match.score > 0));
    //   setTitle('Terminé !');
    //   syncBtn.textContent = 'Terminé !';
    //   syncBtn.classList.toggle('wait');
    //   syncBtn.classList.toggle('success');
    //   setTimeout(() => {
    //     setTitle('TODO');
    //   }, 2000);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    getUserInfo();
    getMyData();
    // const signInAndSyncView = async () => {
    //   setTitle('Chargement...');
    //   const info = await matchistador.getMyInfoFromMatchistador();
    //   if (!info) {
    //     setIsAuth(false);
    //     console.log('pas auth');
    //   }

    //   setUsername(info.name);
    //   setTitle('Hello ' + info.name);
    //   console.log('info!');
    //   setRunOnce(false);
    //   setLoading(false);
    // };
    // if (runOnce) {
    //   signInAndSyncView();
    // }
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
              btnFunction={syncThenReload}
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
