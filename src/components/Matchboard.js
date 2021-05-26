import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import matchistador from '../core/matchistador';
import Tracksboard from './Tracksboard';
import iconM from '../img/logo-m.png';
import Loading from './Loading';
import logoSpotify from '../img/spotifyWhite.png';
import logoDeezer from '../img/deezerWhite.png';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({});

const Matchboard = ({ state }) => {
  const [matchedTracks, setMatchedTracks] = useState([]);
  const [matchName, setMatchName] = useState('');
  const [matchsToDisplay, setMatchsToDisplay] = useState([]);
  const [matchsDisplayAll, setMatchsDisplayAll] = useState(false);
  const [addPlaylistMessage, setAddPlaylistMessage] = useState('');
  const [addPlaylistBtnIsActive, setAddPlaylistBtnIsActive] = useState(false);

  const showMatchedTracks = async (matchname, matchuser) => {
    let tracks = await matchistador.getMatchedTracks(matchuser);
    const tracksboard = document.getElementById('tracksboard');
    tracksboard.classList.remove('hidden');
    setMatchedTracks(tracks);
    setMatchName(matchname);
    console.log(tracks);
  };

  // const searchMatch = (e) => {
  //   const filteredMatchs = matchs.filter((match) =>
  //     match.matchuser.name.toLowerCase().includes(e.target.value.toLowerCase())
  //   );
  //   setMatchsToDisplay(filteredMatchs);
  //   console.log(filteredMatchs);
  // };

  const makeMatchsPlaylist = async () => {
    await matchistador.makePlaylist(
      `Matchistador avec ${matchName}`,
      'Playlist générée automatiquement par Matchistador en fonction de vos titres communs',
      matchedTracks
    );
    setAddPlaylistMessage(
      'Terminé, playlist créée dans votre bitliothèque musicale'
    );

    setAddPlaylistBtnIsActive(false);
  };

  useEffect(() => {
    if (localStorage.getItem('platform') === 'spotify')
      setAddPlaylistBtnIsActive(true);
    // if (matchsDisplayAll === false) {
    //   const filteredMatchs = matchs.filter((match) => match.score > 0);
    //   console.log(matchsToDisplay);
    //   setMatchsToDisplay(filteredMatchs);
    // } else {
    //   setMatchsToDisplay(matchs);
    // }
  }, []);

  return (
    <div className="Matchboard">
      <div className="title-container">
        <Flip top cascade>
          <h3>Mes Matchs</h3>
          <input
            className="searchInput"
            type="text"
            placeholder="Rechercher..."
            onChange={null}
          />
        </Flip>
      </div>
      <Fade>{state.matchBoard.isLoading && <Loading />}</Fade>
      {state.matchs.map((match) => {
        return (
          <Flip top cascade key={match.matchuser.spotify_login}>
            <div
              className="item-row"
              onClick={() => {
                showMatchedTracks(
                  match.matchuser.name,
                  match.matchuser.spotify_login
                );
              }}
            >
              <div className="item">
                <span className="logo-m shadow">
                  <img src={iconM} alt="" />
                </span>

                <div className="item-title">
                  {match.matchuser.name}{' '}
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
      <Tracksboard
        matchedTracks={matchedTracks}
        matchName={matchName}
        addPlaylistFunc={makeMatchsPlaylist}
        addPlaylistMessage={addPlaylistMessage}
        addPlaylistBtnIsActive={addPlaylistBtnIsActive}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Matchboard);
