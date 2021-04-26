import React from 'react';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import matchistador from '../core/matchistador';

const Landing = () => {
  const spotifyUrl = matchistador.makeSpotifyConnectUrl();
  localStorage.clear();

  return (
    <div className="landing-page">
      <Header />
      <div className="connexion">
        <h1>Bienvenue</h1>
        <a href={spotifyUrl}>
          <div className="spotify-connect--btn">
            Se connecter avec
            <img
              className="spotify-connect--img"
              src="/img/spotifyWhite.png"
              alt=""
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Landing;
