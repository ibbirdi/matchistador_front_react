import matchistador from '../core/matchistador';
import actions from './actions';

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
    case actions.GET_USER_INFO:
      const userInfo = matchistador.getMyInfoFromMatchistador();
      console.log('reducer : GET_USER_INFO', userInfo);
      return {
        ...state,
        userInfo: userInfo,
      };
    default:
      return state;
  }
};

export default reducer;
