import React, { useEffect, useState } from 'react';
import Card1 from '../components/Card1';
import Header from '../components/Header';
import matchistador from '../core/matchistador';
import Fade from 'react-reveal/Fade';
import { SkipBack } from 'react-feather';
import { Edit } from 'react-feather';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [userInfo, setUserinfo] = useState('Chargement...');
  const [usernameToPost, setUsernameToPost] = useState('');
  const [message, setMessage] = useState('');

  const showInfo = async () => {
    setUserinfo(await matchistador.getMyInfoFromMatchistador());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <Fade>
      <div>
        <div className="main-container">
          <Edit />
          <h2>Profil</h2>
          <Card1 title={userInfo.name}>
            <div className="input-container">
              <form onSubmit={handleSubmit}>
                <input
                  className="input-left"
                  type="text"
                  placeholder="Changer de pseudo"
                  onChange={(e) => setUsernameToPost(e.target.value)}
                />
                <button className="button button-right" type="submit">
                  Ok
                </button>
              </form>
            </div>
            <Fade spy={message}>
              <div className="message">{message}</div>
            </Fade>
            <Link to="/home" className="button">
              <SkipBack /> Retour
            </Link>
          </Card1>
        </div>
      </div>
    </Fade>
  );
};

export default Profile;
