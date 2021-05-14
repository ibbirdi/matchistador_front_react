import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import matchistador from '../core/matchistador';
import logoMatchistador from '../img/logodegrade.png';
import Flip from 'react-reveal/Flip';

const Auth = () => {
  const history = useHistory();
  //   const [authError, setAuthError] = useState(true);

  useEffect(() => {
    let url = new URL(window.location.href);
    const spotifyAuthCode = url.searchParams.get('code');
    console.log('bonjour');
    const spotifyAuth = async () => {
      console.log('AUTH EN COURS');
      await matchistador.spotify_authProcess(spotifyAuthCode);
      //   setAuthError(false);
      history.push('/home');
    };
    if (spotifyAuthCode) {
      spotifyAuth();
    }
  }, [history]);

  return (
    <div className="landing-page">
      <div className="connexion">
        <img className="logo" src={logoMatchistador} alt="" />
        <Flip top cascade>
          <h1>Authentification...</h1>
        </Flip>
      </div>
    </div>
  );
};

export default Auth;
