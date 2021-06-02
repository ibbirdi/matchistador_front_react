import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Auth = () => {
  const history = useHistory();

  useEffect(() => {
    let url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    const platform = url.searchParams.get('platform');

    console.log('bonjour');

    if (token && platform) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('platform', platform);
      localStorage.setItem('isAuth', 'true');
      history.push('/home');
    } else {
      console.log('Auth error');
    }
  }, [history]);

  return <></>;
};

export default Auth;
