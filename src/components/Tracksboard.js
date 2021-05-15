import React from 'react';
import iconM from '../img/logo-m.png';
import iconCancel from '../img/cancel-white.png';
import Flip from 'react-reveal/Flip';

const closeTracksboard = () => {
  const tracksboard = document.getElementById('tracksboard');
  tracksboard.classList.add('hidden');
};
const Tracksboard = ({ matchName, matchedTracks }) => {
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
        {matchedTracks.map((track) => {
          return (
            <Flip top cascade>
              <div key={track.id} className="track-container">
                <div className="artist">{track.artist}</div>
                <div className="track">
                  <div>{track.track}</div>
                  <img src={track.spotify_img_url} alt="" />
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
