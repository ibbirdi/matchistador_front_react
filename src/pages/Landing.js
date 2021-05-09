import React from 'react';
import matchistador from '../core/matchistador';
import logoSpotify from '../img/spotifyWhite.png';
import logoMatchistador from '../img/logodegrade.png';
import logoDeezer from '../img/deezerWhite.png';

const Landing = () => {
  const spotifyUrl = matchistador.makeSpotifyConnectUrl();
  const deezerUrl = matchistador.makeDeezerConnectUrl();
  localStorage.clear();
  console.log(localStorage);

  return (
    <div className="landing-page">
      <div className="connexion">
        <img className="logo" src={logoMatchistador} alt="" />
        <h1>Bienvenue !</h1>
        <h2>Se connecter avec :</h2>
        <div className="btn-container">
          <a href={spotifyUrl}>
            <div className="spotify-connect--btn">
              <img className="spotify-connect--img" src={logoSpotify} alt="" />
            </div>
          </a>
          {/* <a href={deezerUrl}>
            <div className="spotify-connect--btn">
              <img className="spotify-connect--img" src={logoDeezer} alt="" />
            </div>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
