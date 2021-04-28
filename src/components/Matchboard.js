import React, { useState, useEffect } from 'react';
import matchistador from '../core/matchistador';
import Tracksboard from './Tracksboard';

const Matchboard = (props) => {
  const [matchedTracks, setMatchedTracks] = useState([]);

  const showMatchedTracks = async (matchuser) => {
    let tracks = await matchistador.getMatchedTracks(matchuser);
    const tracksboard = document.getElementById('tracksboard');
    tracksboard.classList.remove('hidden');

    console.log(tracks);
    setMatchedTracks(tracks);
  };

  return (
    <div className="Matchboard">
      <h3>Mes Matchs</h3>
      {props.matchs.map((match) => {
        return (
          <div
            key={match.matchuser.spotify_login}
            className="item-row"
            onClick={() => {
              showMatchedTracks(match.matchuser.spotify_login);
            }}
          >
            <div className="item">
              <span className="logo-m shadow">
                <img src="/img/logo-m.png" alt="" />
              </span>

              <div className="item-title">{match.matchuser.name}</div>
            </div>
            <div className="item-desc--container">
              <div className="score">{match.score} points</div>
              <div className="item-desc">
                {match.tracksQty} titres en commun
              </div>
            </div>
          </div>
        );
      })}
      <Tracksboard matchedTracks={matchedTracks} />
    </div>
  );
};

export default Matchboard;
