import {
  GET_USER_INFO_SUCCESS,
  GET_MY_DATA_START,
  GET_MY_DATA_SUCCESS,
  DISCONNECT,
} from './actions';

const initialState = {
  isAuth: false,
  tracks: [],
  matchs: [],
  filteredMatchs: [],
  userInfo: { name: 'Chargement' },
  home: {
    title: 'Chargement...',
    syncBtnText: 'Synchroniser',
    syncBtnState: '',
  },
  matchBoard: {
    isLoading: false,
    filterInput: '',
    matchedTracks: [],
    matchName: '',
    matchsToDisplay: [],
    matchsDisplayAll: false,
    addPlaylistMessage: '',
    addPlaylistBtnIsActive: true,
  },
  profile: {
    userNameInput: '',
    message: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        isAuth: true,
        home: { ...state.home, title: 'Bonjour ' + action.userInfo.name },
      };
    case GET_MY_DATA_START:
      return {
        ...state,
        matchBoard: { ...state.matchBoard, isLoading: true },
      };
    case GET_MY_DATA_SUCCESS:
      return {
        ...state,
        tracks: action.tracks,
        matchs: action.matchs,
        matchBoard: { ...state.matchBoard, isLoading: false },
      };
    case DISCONNECT:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default reducer;
