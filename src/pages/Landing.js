import React, { useState } from 'react';
import matchistador from '../core/matchistador';

import logoSpotify from '../img/spotifyWhite.png';
import logoMatchistador from '../img/logodegrade.png';
import logoDeezer from '../img/deezerWhite.png';
import Quotes from '../components/Quotes';
import Pulse from 'react-reveal/Pulse';

const Landing = () => {
  const btnUrls = matchistador.makePlatformsConnectUrls();
  localStorage.clear();
  console.log(localStorage);

  return (
    <div className="landing-page">
      <div className="connexion">
        <img className="logo" src={logoMatchistador} alt="" />
        <Quotes />
        <h1>Bienvenue</h1>
        <h2>Se connecter avec</h2>
        <div className="btn-container">
          <Pulse duration={3000} forever={true}>
            <a href={btnUrls.spotifyUrl}>
              <div className="spotify-connect--btn">
                <img
                  className="spotify-connect--img"
                  src={logoSpotify}
                  alt=""
                />
              </div>
            </a>
          </Pulse>
          <Pulse duration={3000} forever={true} delay={1500}>
            <a href={btnUrls.deezerUrl}>
              <div className="spotify-connect--btn">
                <img className="spotify-connect--img" src={logoDeezer} alt="" />
              </div>
            </a>
          </Pulse>
        </div>
      </div>
    </div>
  );
};

export default Landing;
