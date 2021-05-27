import matchistador from '../core/matchistador';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';
export const GET_MY_DATA_START = 'GET_MY_DATA_START';
export const GET_MY_DATA_SUCCESS = 'GET_MY_DATA_SUCCESS';
export const GET_MY_MATCHS = 'GET_MY_MATCHS';
export const SET_ISAUTH = 'SET_ISAUTH';
export const DISCONNECT = 'DISCONNECT';

//MATCHISTADOR
export const SYNC_START = 'SYNC_START';
export const SYNC_SUCCESS = 'SYNC_SUCCESS';

//MATCHBOARD
export const CHANGE_FILTER_INPUT_VALUE = 'CHANGE_FILTER_INPUT_VALUE';
export const FILTER_MATCHS_BY_STR = 'FILTER_MATCHS_BY_STR';
export const FILTER_MATCHS_BY_SCORE = 'FILTER_MATCHS_BY_SCORE';

//HOME
export const SET_HOME_TITLE = 'SET_HOME_TITLE';

//PROFILE
export const SET_USERNAME_INPUT = 'SET_USERNAME_INPUT';
export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const SET_USERNAME_RESPONSE_MESSAGE = 'SET_USERNAME_RESPONSE_MESSAGE';

//TRACKSBOARD
export const SHOW_TRACKSBOARD = 'SHOW_TRACKSBOARD';
export const HIDE_TRACKSBOARD = 'HIDE_TRACKSBOARD';
export const SET_TRACKSBOARD_ADDPLAYLIST_MESSAGE =
  'SET_TRACKSBOARD_ADDPLAYLIST_MESSAGE';
export const SET_TRACKSBOARD_ADDPLAYLISTBTN_ACTIVE =
  'SET_TRACKSBOARD_ADDPLAYLISTBTN_ACTIVE';
export const SET_TRACKSBOARD_CONTENT = 'SET_TRACKSBOARD_CONTENT';

export const disconnect = () => ({ type: DISCONNECT });

export const getUserInfo = () => {
  return async (dispatch) => {
    try {
      const userInfo = await matchistador.syncMyInfo();
      dispatch(getUserInfoSuccess(userInfo));
    } catch (error) {
      dispatch(getUserInfoError());
    }
  };
};

export const getUserInfoSuccess = (userInfo) => ({
  type: GET_USER_INFO_SUCCESS,
  userInfo,
});
export const getUserInfoError = () => ({ type: GET_USER_INFO_ERROR });

export const getMyData = () => {
  return async (dispatch) => {
    dispatch(getMyDataStart());
    try {
      const tracks = await matchistador.showMyTracks();
      const matchs = await matchistador.showMyMatchs();
      dispatch(getMyDataSuccess(tracks, matchs));
    } catch (error) {
      dispatch(disconnect());
    }
  };
};

export const getMyDataStart = () => ({ type: GET_MY_DATA_START });

export const getMyDataSuccess = (tracks, matchs) => ({
  type: GET_MY_DATA_SUCCESS,
  tracks,
  matchs,
});

export const sync = () => {
  return async (dispatch) => {
    dispatch(syncStart());
    await matchistador.getMyTracks();
    dispatch(syncSuccess());
    dispatch(getMyData());
  };
};

export const syncStart = () => ({ type: SYNC_START });
export const syncSuccess = () => ({ type: SYNC_SUCCESS });

export const getMyMatchs = () => ({ type: GET_MY_MATCHS });
export const setIsAuth = (bool) => ({ type: SET_ISAUTH, isAuth: bool });

export const changeFilterInputValue = (newValue) => ({
  type: CHANGE_FILTER_INPUT_VALUE,
  newValue,
});

export const filterMatchsByStr = (filter) => ({
  type: FILTER_MATCHS_BY_STR,
  filter: filter,
});
export const filterMatchsByScore = (score) => ({
  type: FILTER_MATCHS_BY_STR,
  minScore: score,
});

export const setHomeTitle = (title) => ({ type: SET_HOME_TITLE, title: title });

export const setUsernameInput = (newValue) => ({
  type: SET_USERNAME_INPUT,
  newValue: newValue,
});
export const changeUsername = () => ({ type: CHANGE_USERNAME });
export const setUsernameResponseMessage = (response) => ({
  type: SET_USERNAME_RESPONSE_MESSAGE,
  response: response,
});

export const showTracksboard = () => ({
  type: SHOW_TRACKSBOARD,
});
export const hideTracksboard = () => ({
  type: HIDE_TRACKSBOARD,
});

export const setTracksboardAddplaylistMessage = (message) => ({
  type: SET_TRACKSBOARD_ADDPLAYLIST_MESSAGE,
  message: message,
});

export const setTracksboardAddplaylistBtnActive = (bool) => ({
  type: SET_TRACKSBOARD_ADDPLAYLISTBTN_ACTIVE,
  isActive: bool,
});

export const getMatchedTracks = (matchName, matchLogin) => {
  return async (dispatch) => {
    console.log('getMatchedTracks');
    dispatch(showTracksboard());
    const tracks = await matchistador.getMatchedTracks(matchLogin);
    dispatch(setTracksboardContent(matchName, matchLogin, tracks));
  };
};

export const setTracksboardContent = (matchName, matchLogin, tracks) => ({
  type: SET_TRACKSBOARD_CONTENT,
  matchName,
  matchLogin,
  tracks,
});

export const createPlaylist = () => {
  return async (dispatch, getState) => {
    console.log('createPlaylist');
    dispatch(setTracksboardAddplaylistBtnActive(false));
    dispatch(setTracksboardAddplaylistMessage('Veuillez patienter...'));
    const matchName = getState().tracksboard.matchName;
    const matchedTracks = getState().tracksboard.matchedTracks;
    await matchistador.makePlaylist(
      `Matchistador avec ${matchName}`,
      'Playlist générée automatiquement par Matchistador en fonction de vos titres communs',
      matchedTracks
    );
    dispatch(
      setTracksboardAddplaylistMessage(
        'Terminé, playlist créée dans votre bitliothèque musicale'
      )
    );
  };
};
