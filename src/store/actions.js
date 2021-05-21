export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_MY_TRACKS = 'GET_MY_TRACKS';
export const GET_MY_MATCHS = 'GET_MY_MATCHS';
export const SET_ISAUTH = 'SET_ISAUTH';

//MATCHBOARD
export const FILTER_MATCHS_BY_STR = 'FILTER_MATCHS_BY_STR';
export const FILTER_MATCHS_BY_SCORE = 'FILTER_MATCHS_BY_SCORE';

//HOME
export const SET_HOME_TITLE = 'SET_HOME_TITLE';

//PROFILE
export const SET_USERNAME_INPUT = 'SET_USERNAME_INPUT';
export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const SET_USERNAME_RESPONSE_MESSAGE = 'SET_USERNAME_RESPONSE_MESSAGE';

//TRACKSBOARD
export const SET_TRACKSBOARD_ADDPLAYLIST_MESSAGE =
  'SET_TRACKSBOARD_ADDPLAYLIST_MESSAGE';
export const SET_TRACKSBOARD_ADDPLAYLISTBTN_ACTIVE =
  'SET_TRACKSBOARD_ADDPLAYLISTBTN_ACTIVE';

export const getUserInfo = () => ({ type: GET_USER_INFO });
export const getMyTracks = () => ({ type: GET_MY_TRACKS });
export const getMyMatchs = () => ({ type: GET_MY_MATCHS });
export const setIsAuth = (bool) => ({ type: SET_ISAUTH, isAuth: bool });

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

export const setTracksboardAddplaylistMessage = (message) => ({
  type: SET_TRACKSBOARD_ADDPLAYLIST_MESSAGE,
  message: message,
});

export const setTracksboardAddplaylistBtnActive = (bool) => ({
  type: SET_TRACKSBOARD_ADDPLAYLISTBTN_ACTIVE,
  isActive: bool,
});
