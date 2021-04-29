import React from 'react';

const closeTracksboard = () => {
  const tracksboard = document.getElementById('tracksboard');
  tracksboard.classList.add('hidden');
};
const Tracksboard = (props) => {
  return (
    <div className="Tracksboard hidden" id="tracksboard">
      <div className="trackslist">
        <div className="tracksboard-title" onClick={closeTracksboard}>
          <div>Tracks en commun</div>
          <div className="closebtn">Fermer X</div>
        </div>
        {props.matchedTracks.map((track) => {
          return (
            <div key={track.id} className="track-container">
              <div className="artist">{track.artist}</div>
              <div classname="track">
                {track.track} ({track.popularity})
              </div>
            </div>
          );
        })}
        <div>Total : {props.matchedTracks.length}</div>
      </div>
    </div>
  );
};

export default Tracksboard;
