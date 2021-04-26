const front_url = 'http://88.126.89.254:20080';
const api_url = 'http://88.126.89.254:20081';

const matchistador = {
  clientId: 'cd47067c9a6743619eb7c24d6b1e4c3d',
  clientSecret: '3d65254b4e1d4f06ad6e77471fc7a613',
  redirectUri: `${front_url}/home`,
  spotifyAuthCode: '',
  scopes: [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify',
  ],

  makeSpotifyConnectUrl: () => {
    const url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      matchistador.clientId +
      (matchistador.scopes
        ? '&scope=' + encodeURIComponent(matchistador.scopes)
        : '') +
      '&redirect_uri=' +
      encodeURIComponent(matchistador.redirectUri);
    return url;
  },

  init: async () => {
    console.log('Bonjour toi');
  },
  authProcess: async (spotifyAuthCode) => {
    console.log(spotifyAuthCode);

    console.log('authProcess');

    //récupération du token de spotify avec le code et des infos de l'user
    await matchistador.getToken(spotifyAuthCode);
    if (localStorage.getItem('access_token')) {
      await matchistador.registerMe();
    }

    localStorage.setItem('isAuth', 'true');
  },
  getToken: async (code) => {
    localStorage.clear();

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body:
        'grant_type=authorization_code&code=' +
        code +
        '&redirect_uri=' +
        matchistador.redirectUri,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          btoa(matchistador.clientId + ':' + matchistador.clientSecret),
      },
    });
    const spotifyAuthData = await response.json();
    console.log(spotifyAuthData);
    if (spotifyAuthData) {
      const access_token = spotifyAuthData.access_token;
      const refresh_token = spotifyAuthData.refresh_token;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      console.log(localStorage);
    } else {
      console.log(`Erreur d'authentification`);
    }
  },

  getMyInfo: async () => {
    let response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
    response = await response.json();

    localStorage.setItem('connected_user_name', response.display_name);
    localStorage.setItem('connected_user_login', response.id);
    console.log('Infos: ', response);
    return response;
  },
  showMyTracks: async (login) => {
    //getMyTracks (from db)
    const result = await fetch(`${api_url}/user/${login}/tracks`);
    const tracks = await result.json();
    return tracks;
  },
  showMyMatchs: async (login) => {
    //getMyTracks (from db)
    // await fetch(`http://localhost:4000/user/${login}/syncmatchs`);

    const result = await fetch(`${api_url}/user/${login}/matchs`);
    const matchs = await result.json();
    return matchs;
  },
  getMyTracks: async () => {
    let result = [];
    let fetchUrl = 'https://api.spotify.com/v1/me/tracks?limit=50';

    async function loop(url) {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      response = await response.json();

      let syncBtn = document.getElementById('sync-btn');
      let avancement = Math.floor((result.length / response.total) * 100);
      syncBtn.setAttribute('disabled', 'disabled');
      syncBtn.textContent = avancement + '%';
      console.log(avancement + '%');

      response.items.forEach((item) => {
        result.push({
          artist: item.track.artists[0].name,
          track: item.track.name,
          album: item.track.album.name,
          popularity: item.track.popularity,
          spotify_id: item.track.id,
          spotify_url: item.track.uri,
          spotify_img_url: '',
          spotify_preview_url: item.track.preview_url,
        });
      });
      if (response.next) {
        loop(response.next);
      } else {
        syncBtn.textContent = 'Terminé !';

        matchistador.syncMyTracks(result);
        return result;
      }
    }
    loop(fetchUrl);
  },
  registerMe: async () => {
    const userInfo = await matchistador.getMyInfo();
    console.log(userInfo);
    const userInfoToAdd = {
      name: userInfo.display_name,
      spotify_login: userInfo.id,
      email: userInfo.email,
    };
    console.log(JSON.stringify(userInfoToAdd));

    const response = await fetch(`${api_url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfoToAdd),
    });
    console.log(await response.json());
  },

  syncMyTracks: async (tracks) => {
    // s'exécute à la fin de getMyTracks()
    const userInfo = await matchistador.getMyInfo();
    const spotify_login = userInfo.id;
    console.log(spotify_login);
    let response = await fetch(`${api_url}/user/${spotify_login}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tracks),
    });
    console.log(await response.json());
  },
  syncMyMatchs: async () => {
    // s'exécute à la fin de getMyTracks()
    const userInfo = await matchistador.getMyInfo();
    const spotify_login = userInfo.id;
    let response = await fetch(`${api_url}/user/${spotify_login}/syncmatchs`);
    console.log(await response.json());
  },
  syncAll: async () => {
    await matchistador.getMyTracks();
    await matchistador.syncMyMatchs();
    await matchistador.showMyMatchs();
  },
};

document.addEventListener('DOMContentLoaded', matchistador.init);

module.exports = matchistador;
