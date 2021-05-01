import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Matchboard from '../components/Matchboard';
import Tracksboard from '../components/Tracksboard';
import matchistador from '../core/matchistador';

const Home = () => {
  const [username, setUsername] = useState('Chargement...');
  const [title, setTitle] = useState('Chargement...');
  const [tracks, setTracks] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [matchedTracks, setMatchedTracks] = useState([]);
  const [runOnce, setRunOnce] = useState(true);

  const syncThenReload = async () => {
    try {
      await matchistador.getMyTracks();

      const tracks = await matchistador.showMyTracks();
      const matchs = await matchistador.showMyMatchs();
      setTracks(tracks);
      setMatchs(matchs);
      console.log('SET EXECUTE');
    } catch (error) {
      console.error(error);
    }
  };

  const showMatchedTracks = async (matchuser) => {
    const matchedTracks = matchistador.getMatchedTracks(matchuser);
    setMatchedTracks(matchedTracks);
  };

  useEffect(async () => {
    if (runOnce) {
      let url = new URL(window.location.href);
      const spotifyAuthCode = url.searchParams.get('code');

      if (spotifyAuthCode && localStorage.getItem('isAuth') != 'true') {
        await matchistador.authProcess(spotifyAuthCode);
      }

      const tracks = await matchistador.showMyTracks();
      const matchs = await matchistador.showMyMatchs();

      setUsername(localStorage.getItem('connected_user_name'));
      setTracks(tracks);
      setMatchs(matchs);
      setTitle('Hello');
      setRunOnce(false);
    }
  }, []);

  return (
    <div className="Home">
      <Header connectedUser={username} />
      <div className="home-container">
        <h2>{title}</h2>

        <Dashboard
          tracksCount={tracks.length}
          matchsCount={matchs.length}
          btnFunction={syncThenReload}
        />
        <Matchboard matchs={matchs} clickFunction={showMatchedTracks} />
        <Tracksboard matchedTracks={matchedTracks} />
      </div>
    </div>
  );
};

export default Home;
