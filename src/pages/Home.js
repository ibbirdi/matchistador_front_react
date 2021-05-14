import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Matchboard from '../components/Matchboard';
import Tracksboard from '../components/Tracksboard';
import matchistador from '../core/matchistador';

import Fade from 'react-reveal/Fade';

const Home = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [title, setTitle] = useState('');
  const [tracks, setTracks] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [filteredMatchs, setFilteredMatchs] = useState([]);
  const [username, setUsername] = useState('Chargement...');
  const [runOnce, setRunOnce] = useState(true);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const signInAndSyncView = async () => {
      setTitle('Chargement...');
      const info = await matchistador.getMyInfoFromMatchistador();
      if (!info) {
        setIsAuth(false);
        console.log('pas auth');
      }
      const tracks = await matchistador.showMyTracks();
      const matchs = await matchistador.showMyMatchs();
      setFilteredMatchs(matchs.filter((match) => match.score > 0));

      setIsAuth(true);
      setTracks(tracks);
      setMatchs(matchs);
      setUsername(info.name);
      setTitle('Hello ' + info.name);
      console.log('info!');
      setRunOnce(false);
      setLoading(false);
    };
    if (runOnce) {
      signInAndSyncView();
    }
  }, [runOnce]);

  return (
    <div className="Home">
      <Header username={username} />
      <div className="main-container">
        {isAuth && (
          <>
            <Fade spy={title}>
              <h2>{title}</h2>
            </Fade>
            <Dashboard
              tracksCount={tracks.length}
              matchsCount={filteredMatchs.length}
              btnFunction={syncThenReload}
            />
            <Matchboard matchs={matchs} loading={loading} />
          </>
        )}
        {!isAuth && (
          <>
            <h2>Vous êtes déconnecté</h2>
            <a href="/">
              <div className="button">Par ici !</div>
            </a>
          </>
        )}{' '}
      </div>
    </div>
  );
};

export default Home;
