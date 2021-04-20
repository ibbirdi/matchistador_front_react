const front_url = 'http://88.126.89.254:20081';
const api_url = 'http://88.126.89.254:20080';

const app = {
  clientId: 'cd47067c9a6743619eb7c24d6b1e4c3d',
  clientSecret: '3d65254b4e1d4f06ad6e77471fc7a613',
  redirectUri: `${front_url}/index.html`,
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
      app.clientId +
      (app.scopes ? '&scope=' + encodeURIComponent(app.scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(app.redirectUri);
    return url;
  },

  init: async () => {
    localStorage.clear();
    console.log('Bonjour toi');
    console.log(app.makeSpotifyConnectUrl());
    //on crée l'URL de spotify connect
    let spotifyLoginBtn = document.getElementById('spotify-login-btn');
    spotifyLoginBtn.href = app.makeSpotifyConnectUrl();

    //spotify renvoie sur la même adresse avec un code en parametre get, on teste si il est bien là
    let url = new URL(window.location.href);
    app.spotifyAuthCode = url.searchParams.get('code');
    console.log('le code est : ', app.spotifyAuthCode);

    if (app.spotifyAuthCode) {
      //récupération du token de spotify avec le code et des infos de l'user
      await app.getToken();
    }

    //enregistrement/update de l'user via l'API et modification de la vue une fois l'user connecté
    if (localStorage.getItem('access_token')) {
      await app.registerMe();
      console.log(localStorage.getItem('connected_user'));
      let infoBtn = document.getElementById('info-btn-ctn');
      infoBtn.classList.remove('hide');
      spotifyLoginBtn.classList.add('hide');
    }
    if (localStorage.getItem('connected_user')) {
      const title = document.getElementById('main-title');
      title.textContent = `Bonjour ${localStorage.getItem('connected_user')}`;
    }
  },

  getToken: async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body:
        'grant_type=authorization_code&code=' +
        app.spotifyAuthCode +
        '&redirect_uri=' +
        app.redirectUri,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(app.clientId + ':' + app.clientSecret),
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

    localStorage.setItem('connected_user', response.display_name);
    console.log('Infos: ', response);
    return response;
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

      let avancement = Math.floor((result.length / response.total) * 100);
      const progress = document.getElementById('sync-progress-bar');
      const syncBtn = document.getElementById('sync-btn');
      progress.classList.remove('hide');
      syncBtn.classList.add('is-loading');
      progress.value = avancement;
      console.log(avancement + '%');

      response.items.forEach((item) => {
        result.push({
          artist: item.track.artists[0].name,
          track: item.track.name,
          album: item.track.album.name,
          popularity: item.track.popularity,
          spotify_id: item.track.id,
          spotify_url: item.track.uri,
          spotify_img_url: item.track.album.images[1].url
            ? item.track.album.images[1].url
            : '',
          spotify_preview_url: item.track.preview_url,
        });
      });
      if (response.next) {
        loop(response.next);
      } else {
        progress.value = 100;
        progress.classList.add('hide');
        syncBtn.classList.remove('is-loading');
        syncBtn.textContent = 'Terminé !';
        syncBtn.setAttribute('disabled', 'disabled');
        const title = document.getElementById('main-title');
        title.textContent = `Merci !`;

        app.syncMyTracks(result);
        return console.log(result);
      }
    }
    loop(fetchUrl);
  },
  registerMe: async () => {
    const userInfo = await app.getMyInfo();
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
    const userInfo = await app.getMyInfo();
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
};

document.addEventListener('DOMContentLoaded', app.init);
