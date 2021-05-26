import {
  GET_USER_INFO_SUCCESS,
  GET_MY_DATA_START,
  GET_MY_DATA_SUCCESS,
  DISCONNECT,
  SET_HOME_TITLE,
  SYNC_START,
  SYNC_SUCCESS,
  CHANGE_FILTER_INPUT_VALUE,
} from './actions';

const initialState = {
  isAuth: true,
  tracks: [],
  matchs: [],
  filteredMatchs: [],
  userInfo: { name: 'Chargement' },
  home: {
    title: 'Chargement...',
    syncBtnText: 'Synchroniser',
    syncBtnIsActive: true,
  },
  matchBoard: {
    isLoading: false,
    filterInputValue: '',
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
        filteredMatchs: action.matchs,
        matchBoard: { ...state.matchBoard, isLoading: false },
      };
    case DISCONNECT:
      return {
        ...state,
        isAuth: false,
      };
    case SET_HOME_TITLE:
      return {
        ...state,
        home: {
          ...state.home,
          title: action.title,
        },
      };
    case SYNC_START:
      return {
        ...state,
        home: {
          ...state.home,
          title: 'Veuillez patienter...',
          syncBtnText: 'Synchronisation...',
          syncBtnIsActive: false,
        },
      };
    case SYNC_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          title: 'Bonjour ' + state.userInfo.name,
          syncBtnText: 'Terminé',
          syncBtnIsActive: false,
        },
      };
    case CHANGE_FILTER_INPUT_VALUE:
      return {
        ...state,
        filteredMatchs: state.matchs.filter((match) =>
          match.matchuser.name
            .toLowerCase()
            .includes(action.newValue.toLowerCase())
        ),
        matchboard: {
          ...state.matchboard,
          filterInputValue: action.newValue,
        },
      };
    default:
      return state;
  }
};

export default reducer;
