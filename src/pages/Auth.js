import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card1 from '../components/Card1';
import matchistador from '../core/matchistador';
import logoMatchistador from '../img/logodegrade.png';

const Auth = () => {
  const history = useHistory();
  //   const [authError, setAuthError] = useState(true);

  useEffect(() => {
    let url = new URL(window.location.href);
    const spotifyAuthCode = url.searchParams.get('code');
    console.log('bonjour');
    const spotifyAuth = async () => {
      console.log('AUTH EN COURS');
      await matchistador.authProcess(spotifyAuthCode);
      //   setAuthError(false);
      history.push('/home');
    };
    if (spotifyAuthCode) {
      spotifyAuth();
    }
  }, [history]);

  return (
    <div className="main-container">
      <img className="logo" width="200px" src={logoMatchistador} alt="" />
      <Card1>
        <h2>Authentification en cours</h2>
      </Card1>
    </div>
  );
};

export default Auth;
