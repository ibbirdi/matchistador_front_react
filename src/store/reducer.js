import {
  GET_USER_INFO_SUCCESS,
  GET_MY_DATA_START,
  GET_MY_DATA_SUCCESS,
  DISCONNECT,
  SET_HOME_TITLE,
  SYNC_START,
  SYNC_SUCCESS,
  CHANGE_FILTER_INPUT_VALUE,
  SET_TRACKSBOARD_ADDPLAYLIST_MESSAGE,
  SET_TRACKSBOARD_ADDPLAYLISTBTN_ACTIVE,
  SET_TRACKSBOARD_CONTENT,
  SHOW_TRACKSBOARD,
  HIDE_TRACKSBOARD,
} from './actions';

const initialState = {
  isAuth: true,
  tracks: [],
  matchs: [],
  dataIsSync: false,
  filteredMatchs: [],
  userInfo: { name: 'Chargement' },
  home: {
    title: 'Chargement...',
    syncBtnText: 'Synchroniser',
    syncBtnIsActive: true,
  },
  matchboard: {
    isLoading: false,
    filterInputValue: '',
    matchsToDisplay: [],
    matchsDisplayAll: false,
  },
  profile: {
    userNameInput: '',
    message: '',
  },
  tracksboard: {
    isActive: false,
    matchName: '',
    matchLogin: '',
    matchedTracks: [],
    addPlaylistMessage: '',
    addPlaylistBtnIsActive: true,
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
        matchs: [],
        filteredMatchs: [],
        matchBoard: { ...state.matchBoard, isLoading: true },
      };
    case GET_MY_DATA_SUCCESS:
      return {
        ...state,
        matchBoard: { ...state.matchBoard, isLoading: false },
        tracks: action.tracks,
        matchs: action.matchs,
        dataIsSync: true,
        filteredMatchs: action.matchs,
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
    case SET_TRACKSBOARD_ADDPLAYLIST_MESSAGE:
      return {
        ...state,
        tracksboard: {
          ...state.tracksboard,
          addPlaylistMessage: action.message,
        },
      };
    case SET_TRACKSBOARD_ADDPLAYLISTBTN_ACTIVE:
      return {
        ...state,
        tracksboard: {
          ...state.tracksboard,
          addPlaylistBtnIsActive: action.bool,
        },
      };
    case SET_TRACKSBOARD_CONTENT:
      return {
        ...state,
        tracksboard: {
          ...state.tracksboard,
          matchedTracks: action.tracks,
          matchName: action.matchName,
          matchLogin: action.matchLogin,
        },
      };
    case SHOW_TRACKSBOARD:
      return {
        ...state,
        tracksboard: {
          ...state.tracksboard,
          isActive: true,
          addPlaylistBtnIsActive: true,
          addPlaylistMessage: '',
        },
      };
    case HIDE_TRACKSBOARD:
      return {
        ...state,
        tracksboard: {
          ...state.tracksboard,
          isActive: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
