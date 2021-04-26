import React from 'react';

const Matchboard = (props) => {
  return (
    <div className="Matchboard">
      <div className="title">Mes Matchs</div>
      {props.matchs.map((match) => {
        return (
          <div key={match.matchuser.name} className="item-row">
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
    </div>
  );
};

export default Matchboard;
