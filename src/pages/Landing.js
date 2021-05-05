import React from 'react';
import matchistador from '../core/matchistador';
import logoSpotify from '../img/spotifyWhite.png';
import logoMatchistador from '../img/logodegrade.png';

const Landing = () => {
  const spotifyUrl = matchistador.makeSpotifyConnectUrl();
  localStorage.clear();
  console.log(localStorage);

  return (
    <div className="landing-page">
      <div className="connexion">
        <img className="logo" src={logoMatchistador} alt="" />
        <h1>Bienvenue</h1>
        <a href={spotifyUrl}>
          <div className="spotify-connect--btn">
            Se connecter avec
            <img className="spotify-connect--img" src={logoSpotify} alt="" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Landing;
