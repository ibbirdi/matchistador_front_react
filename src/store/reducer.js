import matchistador from '../core/matchistador';
import { GET_USER_INFO } from './actions';

const initialState = {
  isAuth: false,
  tracks: [],
  matchs: [],
  filteredMatchs: [],
  userInfo: {},
  home: {
    title: 'Chargement...',
    syncBtnText: 'Synchroniser',
    syncBtnState: '',
  },
  matchBoard: {
    isLoading: true,
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
    //TODO: commencer par créer GET_USER_INFO_SUCCESS et _ERROR
    case GET_USER_INFO:
      const userInfo = { name: 'youpi' };
      return {
        ...state,
        userInfo: userInfo,
      };
    default:
      return state;
  }
};

export default reducer;
