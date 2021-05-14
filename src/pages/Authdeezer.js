import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import matchistador from '../core/matchistador';
import logoMatchistador from '../img/logodegrade.png';
import Flip from 'react-reveal/Flip';

const Authdeezer = () => {
  const history = useHistory();
  const [authError, setAuthError] = useState(true);

  useEffect(() => {
    let url = new URL(window.location.href);
    const deezerAuthCode = url.searchParams.get('code');
    console.log('bonjour');
    const deezerAuth = async () => {
      console.log('AUTH EN COURS');
      await matchistador.deezer_authProcess(deezerAuthCode);
      history.push('/home');
    };
    if (deezerAuthCode) {
      deezerAuth();
    }
  }, [history]);

  return (
    <div className="landing-page">
      <div className="connexion">
        <img className="logo" src={logoMatchistador} alt="" />
        <Flip top cascade>
          <h1>Authentification...</h1>
        </Flip>{' '}
      </div>
    </div>
  );
};

export default Authdeezer;
