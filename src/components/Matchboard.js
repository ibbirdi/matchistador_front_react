import React from 'react';
import { connect } from 'react-redux';
import { changeFilterInputValue, getMatchedTracks } from '../store/actions';
import iconM from '../img/logo-m.png';
import Loading from './Loading';
import logoSpotify from '../img/spotifyWhite.png';
import logoDeezer from '../img/deezerWhite.png';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';

const mapStateToProps = (state) => ({
  isLoading: state.matchboard.isLoading,
  filteredMatchs: state.filteredMatchs,
  filterInputValue: state.matchboard.filterInputValue,
});

const mapDispatchToProps = (dispatch) => ({
  changeFilterInputValue: (e) =>
    dispatch(changeFilterInputValue(e.target.value)),
  getMatchedTracks: (matchName, matchLogin) =>
    dispatch(getMatchedTracks(matchName, matchLogin)),
});

const Matchboard = ({
  isLoading,
  filteredMatchs,
  changeFilterInputValue,
  getMatchedTracks,
  filterInputValue,
}) => {
  return (
    <div className="Matchboard">
      <Flip top cascade>
        {filteredMatchs.length != 0 ? (
          <div className="title-container">
            <h3>Mes Matchs</h3>
            <input
              className="searchInput"
              type="text"
              placeholder="Rechercher..."
              onChange={changeFilterInputValue}
              value={filterInputValue}
            />
          </div>
        ) : (
          <div className="title-container">
            <h3>Aucun Match</h3>
            <input
              className="searchInput"
              type="text"
              placeholder="Rechercher..."
              onChange={changeFilterInputValue}
              value={filterInputValue}
            />
          </div>
        )}
      </Flip>

      <Fade>{isLoading && <Loading />}</Fade>

      {filteredMatchs.map((match) => {
        return (
          <Flip top cascade key={match.matchuser.platform_login}>
            <div
              className="item-row"
              onClick={() => {
                getMatchedTracks(
                  match.matchuser.name,
                  match.matchuser.platform_login
                );
              }}
            >
              <div className="item">
                <span className="logo-m shadow">
                  <img src={iconM} alt="" />
                </span>

                <div className="item-title">
                  {match.matchuser.name}
                  {match.matchuser.streaming_platform === 'spotify' && (
                    <img src={logoSpotify} alt="logo spotify" />
                  )}
                  {match.matchuser.streaming_platform === 'deezer' && (
                    <img src={logoDeezer} alt="logo deezer" />
                  )}
                </div>
              </div>
              <div className="item-desc--container">
                <div className="score">{match.score} points</div>
                <div className="item-desc">{match.tracksQty} titres</div>
              </div>
            </div>
          </Flip>
        );
      })}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Matchboard);
