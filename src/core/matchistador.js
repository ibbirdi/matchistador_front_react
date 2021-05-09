let front_url = 'https://www.matchistador.com';
let api_url = 'https://api.matchistador.com';
//
//
const dev = false;

if (dev) {
  front_url = 'http://localhost:3000';
  api_url = 'http://localhost:4000';
}

const matchistador = {
  spotify_clientId: 'cd47067c9a6743619eb7c24d6b1e4c3d',
  spotify_clientSecret: '3d65254b4e1d4f06ad6e77471fc7a613',
  spotify_redirectUri: `${front_url}/auth`,
  spotify_authCode: '',
  spotify_scopes: [
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

  deezer_clientId: '478182',
  deezer_clientSecret: '8408fde493d3080da7404dc0b054f059',
  deezer_redirectUri: `${front_url}/authdeezer`,
  deezer_authCode: '',
  deezer_scopes: 'basic_access,email,listening_history',

  makeDeezerConnectUrl: () => {
    const url = `https://connect.deezer.com/oauth/auth.php?app_id=${matchistador.deezer_clientId}&redirect_uri=${matchistador.deezer_redirectUri}&perms=${matchistador.deezer_scopes}`;
    return url;
  },

  makeSpotifyConnectUrl: () => {
    const url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      matchistador.spotify_clientId +
      (matchistador.spotify_scopes
        ? '&scope=' + encodeURIComponent(matchistador.spotify_scopes)
        : '') +
      '&redirect_uri=' +
      encodeURIComponent(matchistador.spotify_redirectUri);
    return url;
  },

  spotify_authProcess: async (code) => {
    console.log(code);

    console.log('authProcess');

    //récupération du token de spotify avec le code et des infos de l'user
    await matchistador.spotify_getToken(code);
    if (localStorage.getItem('access_token')) {
      await matchistador.registerMe();
    }
  },
  deezer_authProcess: async (code) => {
    console.log(code);

    console.log('authProcess');

    //récupération du token de spotify avec le code et des infos de l'user
    const response = await fetch(
      `https://connect.deezer.com/oauth/access_token.php?app_id=${matchistador.deezer_clientId}&secret=${matchistador.deezer_clientSecret}&code=${code}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    const deezerData = response;
    console.log(deezerData);
    // if (localStorage.getItem('access_token')) {
    //   // await matchistador.registerMe();
    // }
  },

  registerMe: async () => {
    const userInfo = await matchistador.getMyInfoFromSpotify();
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
    await matchistador.syncMyInfo();
  },

  spotify_getToken: async (code) => {
    localStorage.clear();
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body:
          'grant_type=authorization_code&code=' +
          code +
          '&redirect_uri=' +
          matchistador.spotify_redirectUri,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            btoa(
              matchistador.spotify_clientId +
                ':' +
                matchistador.spotify_clientSecret
            ),
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
        return console.log(`Erreur d'authentification`);
      }
    } catch (error) {
      return console.error(error);
    }
  },

  getMyInfoFromSpotify: async () => {
    let response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
    response = await response.json();
    console.log('GMIFS', response);
    return response;
  },

  syncMyInfo: async () => {
    const response = await matchistador.getMyInfoFromSpotify();
    if (response) {
      let userInfo = await fetch(`${api_url}/user/${response.id}/info`);
      userInfo = await userInfo.json();
      localStorage.setItem('connected_user_name', userInfo.name);
      localStorage.setItem('connected_user_login', response.id);
      localStorage.setItem('isAuth', true);
      console.log('Infos: ', response);
      return response;
    }
  },

  getMyInfo: async () => {
    try {
      const response = await matchistador.getMyInfoFromSpotify();
      if (response.id) {
        console.log('Connect status : ok');
      } else return;
      let userInfo = await fetch(`${api_url}/user/${response.id}/info`);
      userInfo = await userInfo.json();
      return userInfo;
    } catch (error) {
      console.log('Connect status : error');
      localStorage.setItem('isAuth', false);
      return;
    }
  },

  changeMyUsername: async (newUserName) => {
    const username = JSON.stringify({ newusername: newUserName });
    const spotifyInfo = await matchistador.getMyInfoFromSpotify();

    let response = await fetch(`${api_url}/user/${spotifyInfo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: username,
    });
    return await response.json();
  },

  showMyTracks: async () => {
    const spotifyInfo = await matchistador.getMyInfoFromSpotify();

    const result = await fetch(`${api_url}/user/${spotifyInfo.id}/tracks`);
    const tracks = await result.json();
    return tracks;
  },

  showMyMatchs: async () => {
    const spotifyInfo = await matchistador.getMyInfoFromSpotify();
    const result = await fetch(`${api_url}/user/${spotifyInfo.id}/matchs`);
    const matchs = await result.json();
    return matchs;
  },

  getMyTopTracks: async (term) => {
    let result = [];
    let fetchUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=50`;
    try {
      let response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      response = await response.json();
      console.log(response);
      response.items.forEach((item) => {
        result.push({
          artist: item.artists[0].name,
          track: item.name,
          album: item.album.name,
          popularity: item.popularity,
          spotify_id: item.id,
          spotify_url: item.uri,
          spotify_img_url: '',
          spotify_preview_url: item.preview_url,
        });
      });
      console.log('top tracks: ', result);
      return result;
    } catch (error) {
      return console.error(error);
    }
  },

  getMyTracks: async () => {
    try {
      //récupère les 50 top tracks de l'user
      const topTracks_LT = await matchistador.getMyTopTracks('long_term');
      const topTracks_MT = await matchistador.getMyTopTracks('medium_term');
      const topTracks_ST = await matchistador.getMyTopTracks('short_term');
      let result = [];
      result = result.concat(topTracks_LT, topTracks_MT, topTracks_ST);
      console.log('top tracks RESULT :', result.length);
      const topTracksLength = result.length;
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
        let avancement = Math.floor(
          (result.length / (response.total + topTracksLength)) * 100
        );
        syncBtn.setAttribute('disabled', 'disabled');
        syncBtn.textContent = avancement + '%';
        syncBtn.classList.add('wait');

        console.log(avancement + '%');

        response.items.forEach((item) => {
          //ajoute dans [result] chaque track
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
          return loop(response.next);
        } else {
          syncBtn.textContent = `Synchronisation...`;

          console.log(
            'NOMBRE DE TRACKS ENVOYES DANS LE POST : ',
            result.length
          );
          await matchistador.syncMyTracks(result);
          await matchistador.syncMyMatchs();
          return result.length;
        }
      }
      await loop(fetchUrl);
    } catch (error) {
      console.error(error);
    }
  },

  syncMyTracks: async (tracks) => {
    try {
      // s'exécute à la fin de getMyTracks()
      const spotifyInfo = await matchistador.getMyInfoFromSpotify();
      let response = await fetch(`${api_url}/user/${spotifyInfo.id}/tracks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tracks),
      });
      return console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  },

  syncMyMatchs: async () => {
    try {
      // s'exécute à la fin de getMyTracks()
      const userInfo = await matchistador.syncMyInfo();
      const spotify_login = userInfo.id;
      let response = await fetch(`${api_url}/user/${spotify_login}/syncmatchs`);
      console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  },

  getMatchedTracks: async (matchuser) => {
    try {
      let matchedTracks = await fetch(
        `${api_url}/user/${localStorage.getItem(
          'connected_user_login'
        )}/matchedtracks/${matchuser}`
      );
      return await matchedTracks.json();
    } catch (error) {
      console.error(error);
    }
  },
};

export default matchistador;
