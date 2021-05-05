import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Matchboard from '../components/Matchboard';
import Tracksboard from '../components/Tracksboard';
import matchistador from '../core/matchistador';

const Home = () => {
  const [title, setTitle] = useState('Chargement...');
  const [tracks, setTracks] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [username, setUsername] = useState('Chargement...');
  const [matchedTracks, setMatchedTracks] = useState([]);
  const [runOnce, setRunOnce] = useState(true);

  const syncThenReload = async () => {
    try {
      setTitle('Synchronisation en cours...');
      await matchistador.getMyTracks();
      const tracks = await matchistador.showMyTracks();
      const matchs = await matchistador.showMyMatchs();
      setTracks(tracks);
      setMatchs(matchs);
      setTitle('Terminé !');
      setTimeout(() => {
        setTitle('Hello');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const showMatchedTracks = async (matchuser) => {
    const matchedTracks = matchistador.getMatchedTracks(matchuser);
    setMatchedTracks(matchedTracks);
  };

  useEffect(() => {
    const signInAndSyncView = async () => {
      if (runOnce) {
        let url = new URL(window.location.href);
        const spotifyAuthCode = url.searchParams.get('code');

        if (spotifyAuthCode && localStorage.getItem('isAuth') !== 'true') {
          await matchistador.authProcess(spotifyAuthCode);
        }

        const tracks = await matchistador.showMyTracks();
        const matchs = await matchistador.showMyMatchs();
        const info = await matchistador.getMyInfo();
        setTracks(tracks);
        setMatchs(matchs);
        setUsername(info.name);
        setTitle('Hello');
        setRunOnce(false);
      }
    };
    signInAndSyncView();
  }, [runOnce]);

  return (
    <div className="Home">
      <Header username={username} />
      <div className="main-container">
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
