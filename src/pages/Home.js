import React, { useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Matchboard from '../components/Matchboard';
import Tracksboard from '../components/Tracksboard';
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
    if (!state.dataIsSync) {
      getMyData();
      // sync();
    }
  }, []);

  return (
    <div className="Home">
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
            <Tracksboard />
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
