import React from 'react';

const closeTracksboard = () => {
  const tracksboard = document.getElementById('tracksboard');
  tracksboard.classList.add('hidden');
};
const Tracksboard = ({ matchName, matchedTracks }) => {
  return (
    <div className="Tracksboard hidden" id="tracksboard">
      <div className="trackslist">
        <div className="tracksboard-title" onClick={closeTracksboard}>
          <div>
            <div className="logo-m">
              <img src="/img/logo-m.png" alt="" />
            </div>
            {matchName}
          </div>
          <div className="closebtn">
            <img src="/img/cancel-white.png" alt="" />
          </div>
        </div>
        {matchedTracks.map((track) => {
          return (
            <div key={track.id} className="track-container">
              <div className="artist">{track.artist}</div>
              <div className="track">
                {track.track} ({track.popularity})
              </div>
            </div>
          );
        })}
        <div>Total : {matchedTracks.length}</div>
      </div>
    </div>
  );
};

export default Tracksboard;
