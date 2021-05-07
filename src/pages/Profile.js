import React, { useEffect, useState } from 'react';
import Card1 from '../components/Card1';
import Header from '../components/Header';
import matchistador from '../core/matchistador';
import { SkipBack } from 'react-feather';
import { Edit } from 'react-feather';

const Profile = () => {
  const [userInfo, setUserinfo] = useState('Chargement...');
  const [usernameToPost, setUsernameToPost] = useState('');
  const [message, setMessage] = useState('');

  const showInfo = async () => {
    setUserinfo(await matchistador.getMyInfo());
  };

  const handleSubmit = async () => {
    if (!usernameToPost) {
      setMessage('Username invalide');
    } else {
      const response = await matchistador.changeMyUsername(usernameToPost);
      await matchistador.syncMyInfo();
      showInfo();

      setMessage(response.message);
    }
  };

  useEffect(() => {
    showInfo();
  }, []);

  return (
    <div>
      <Header username={userInfo.name} />
      <div className="main-container">
        <Edit />
        <h2>Profil</h2>
        <Card1 title={userInfo.name}>
          <div className="input-container">
            <input
              className="input-left"
              type="text"
              placeholder="Changer de pseudo"
              onChange={(e) => setUsernameToPost(e.target.value)}
            />
            <button
              className="button button-right"
              type="submit"
              onClick={handleSubmit}
            >
              Ok
            </button>
          </div>
          <h4>{message}</h4>
          <a href="/home" className="button">
            <SkipBack /> Retour
          </a>
        </Card1>
      </div>
    </div>
  );
};

export default Profile;
