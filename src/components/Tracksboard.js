import React from 'react';

const closeTracksboard = () => {
  const tracksboard = document.getElementById('tracksboard');
  tracksboard.classList.add('hidden');
};
const Tracksboard = (props) => {
  return (
    <div className="Tracksboard hidden" id="tracksboard">
      <div className="closeBtn" onClick={closeTracksboard}>
        <div>Tracks en commun</div>
        <div>X</div>
      </div>
      {props.matchedTracks.map((track) => {
        return (
          <div key={track.id} className="track-container">
            <div className="artist">{track.artist}</div>
            <div classname="track">{track.track}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Tracksboard;
