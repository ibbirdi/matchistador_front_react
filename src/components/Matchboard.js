import React, { useState, useEffect } from 'react';
import matchistador from '../core/matchistador';
import Tracksboard from './Tracksboard';
import iconM from '../img/logo-m.png';

const Matchboard = ({ matchs }) => {
  const [matchedTracks, setMatchedTracks] = useState([]);
  const [matchName, setMatchName] = useState('');
  const [matchsToDisplay, setMatchsToDisplay] = useState([]);

  const showMatchedTracks = async (matchname, matchuser) => {
    let tracks = await matchistador.getMatchedTracks(matchuser);
    const tracksboard = document.getElementById('tracksboard');
    tracksboard.classList.remove('hidden');
    setMatchedTracks(tracks);
    setMatchName(matchname);
  };

  useEffect(() => {
    setMatchsToDisplay(matchs);
  }, [matchs]);

  const searchMatch = (e) => {
    const filteredMatchs = matchs.filter((match) =>
      match.matchuser.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMatchsToDisplay(filteredMatchs);

    console.log(filteredMatchs);
  };

  return (
    <div className="Matchboard">
      <div className="title-container">
        <h3>Mes Matchs</h3>

        <input
          className="searchInput"
          type="text"
          placeholder="Rechercher..."
          onChange={searchMatch}
        />
      </div>
      {matchsToDisplay.map((match) => {
        return (
          <div
            key={match.matchuser.spotify_login}
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

              <div className="item-title">{match.matchuser.name}</div>
            </div>
            <div className="item-desc--container">
              <div className="score">{match.score} points</div>
              <div className="item-desc">{match.tracksQty} titres</div>
            </div>
          </div>
        );
      })}
      <Tracksboard matchedTracks={matchedTracks} matchName={matchName} />
    </div>
  );
};

export default Matchboard;
