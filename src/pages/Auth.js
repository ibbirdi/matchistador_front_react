import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import spotify from '../core/spotify';
import logoMatchistador from '../img/logodegrade.png';
import Flip from 'react-reveal/Flip';

const Auth = () => {
  const history = useHistory();

  useEffect(() => {
    let url = new URL(window.location.href);
    const spotifyAuthCode = url.searchParams.get('code');
    console.log('bonjour');
    const spotifyAuth = async () => {
      console.log('AUTH EN COURS');
      await spotify.authProcess(spotifyAuthCode);
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
