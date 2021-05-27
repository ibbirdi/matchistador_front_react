import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { hideTracksboard, createPlaylist } from '../store/actions';
import iconM from '../img/logo-m.png';
import iconCancel from '../img/cancel-white.png';
import Flip from 'react-reveal/Flip';
import Spin from 'react-reveal/Spin';
import plusIcon from '../img/plus.png';
import barsSvg from '../img/bars.svg';

const mapStateToProps = (state) => ({
  matchName: state.tracksboard.matchName,
  matchedTracks: state.tracksboard.matchedTracks,
  addPlaylistMessage: state.tracksboard.addPlaylistMessage,
  addPlaylistBtnIsActive: state.tracksboard.addPlaylistBtnIsActive,
  isActive: state.tracksboard.isActive,
  isLoading: state.tracksboard.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  hideTracksboard: () => dispatch(hideTracksboard()),
  createPlaylist: () => dispatch(createPlaylist()),
});

const Tracksboard = ({
  matchName,
  matchedTracks,
  createPlaylist,
  addPlaylistMessage,
  addPlaylistBtnIsActive,
  isActive,
  isLoading,
  hideTracksboard,
}) => {
  return (
    <div className={classNames('Tracksboard', { hidden: !isActive })}>
      <div className="trackslist">
        {isLoading ? (
          <img src={barsSvg} alt="Chargement" />
        ) : (
          <>
            <Flip top>
              <div className="tracksboard-title">
                <div className="logo-m">
                  <img src={iconM} alt="" />
                  {matchName}
                </div>

                <div className="subtitle">
                  {matchedTracks.length} titres en commun
                  <div className="closebtn" onClick={hideTracksboard}>
                    <img src={iconCancel} alt="" />
                  </div>
                </div>
              </div>
            </Flip>
            <Flip top spy={addPlaylistMessage}>
              <div>{addPlaylistMessage}</div>
            </Flip>
            {addPlaylistBtnIsActive && (
              <div className="addbutton" onClick={createPlaylist}>
                <img src={plusIcon} alt="plus" /> Créer la playlist
              </div>
            )}
            {matchedTracks.map((track) => {
              return (
                <Flip top cascade key={track.id}>
                  <div className="track-container">
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
          </>
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracksboard);
