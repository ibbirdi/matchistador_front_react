import React from 'react';
import iconM from '../img/logo-m.png';
import iconCancel from '../img/cancel-white.png';
import Flip from 'react-reveal/Flip';
import Spin from 'react-reveal/Spin';
import plusIcon from '../img/plus.png';

const closeTracksboard = () => {
  const tracksboard = document.getElementById('tracksboard');
  tracksboard.classList.add('hidden');
};
const Tracksboard = ({
  matchName,
  matchedTracks,
  addPlaylistFunc,
  addPlaylistMessage,
  addPlaylistBtnIsActive,
}) => {
  return (
    <div className="Tracksboard hidden" id="tracksboard">
      <div className="trackslist">
        <Flip top>
          <div className="tracksboard-title">
            <div className="logo-m">
              <img src={iconM} alt="" />
              {matchName}
            </div>

            <div className="subtitle">
              {matchedTracks.length} titres en commun{' '}
              <div className="closebtn" onClick={closeTracksboard}>
                <img src={iconCancel} alt="" />
              </div>
            </div>
          </div>
        </Flip>
        <Flip top spy={addPlaylistMessage}>
          <div>{addPlaylistMessage}</div>
        </Flip>
        {addPlaylistBtnIsActive && (
          <div className="addbutton" onClick={addPlaylistFunc}>
            <img src={plusIcon} alt="plus" /> Créer la playlist
          </div>
        )}
        {matchedTracks.map((track) => {
          return (
            <Flip top cascade>
              <div key={track.id} className="track-container">
                <div className="artist">{track.artist}</div>
                <div className="track">
                  <div>{track.track}</div>
                  {track.spotify_img_url && (
                    <Flip left>
                      <img src={track.spotify_img_url} alt="" />
                    </Flip>
                  )}
                </div>
              </div>
            </Flip>
          );
        })}
      </div>
    </div>
  );
};

export default Tracksboard;
