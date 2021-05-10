import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Matchboard from '../components/Matchboard';
import Tracksboard from '../components/Tracksboard';
import matchistador from '../core/matchistador';

const Home = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [title, setTitle] = useState('Chargement...');
  const [tracks, setTracks] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [username, setUsername] = useState('Chargement...');
  const [matchedTracks, setMatchedTracks] = useState([]);

  const syncThenReload = async () => {
    try {
      let syncBtn = document.getElementById('sync-btn');
      setTitle('Synchronisation en cours...');
      await matchistador.getMyTracks();
      const tracks = await matchistador.showMyTracks();
      const matchs = await matchistador.showMyMatchs();
      setTracks(tracks);
      setMatchs(matchs);

      setTitle('Terminé !');
      syncBtn.textContent = 'Terminé !';
      syncBtn.classList.toggle('wait');
      syncBtn.classList.toggle('success');

      setTimeout(() => {
        setTitle(title);
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
      const info = await matchistador.getMyInfoFromMatchistador();
      if (!info) {
        setIsAuth(false);
        console.log('pas auth');
      }
      const tracks = await matchistador.showMyTracks();
      const matchs = await matchistador.showMyMatchs();

      setIsAuth(true);
      setTracks(tracks);
      setMatchs(matchs);
      setUsername(info.name);
      setTitle('Hello ' + info.name);
      console.log('info!');
    };

    signInAndSyncView();
  }, []);

  return (
    <div className="Home">
      <Header username={username} />
      <div className="main-container">
        {isAuth && (
          <>
            <h2>{title}</h2>

            <Dashboard
              tracksCount={tracks.length}
              matchsCount={matchs.length}
              btnFunction={syncThenReload}
            />
            <Matchboard matchs={matchs} clickFunction={showMatchedTracks} />
            <Tracksboard matchedTracks={matchedTracks} />
          </>
        )}
        {!isAuth && (
          <>
            <h2>Vous êtes déconnecté</h2>
            <a href="/">
              <div className="button">Par ici !</div>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
