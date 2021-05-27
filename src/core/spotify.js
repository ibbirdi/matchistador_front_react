import matchistador from '../core/matchistador';
import env_vars from './env_vars';

const spotify = {
  clientId: 'cd47067c9a6743619eb7c24d6b1e4c3d',
  clientSecret: '3d65254b4e1d4f06ad6e77471fc7a613',
  redirectUri: `${env_vars.front_url}/auth`,
  authCode: '',
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

  makeConnectUrl: () => {
    const url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      spotify.clientId +
      (spotify.scopes ? '&scope=' + encodeURIComponent(spotify.scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(spotify.redirectUri);
    return url;
  },

  authProcess: async (code) => {
    console.log(code);

    console.log('authProcess');

    //récupération du token de spotify avec le code et des infos de l'user
    await spotify.getToken(code);
    if (localStorage.getItem('access_token')) {
      await matchistador.registerMe();
    }
  },

  getToken: async (code) => {
    localStorage.clear();
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body:
          'grant_type=authorization_code&code=' +
          code +
          '&redirect_uri=' +
          spotify.redirectUri,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' + btoa(spotify.clientId + ':' + spotify.clientSecret),
        },
      });
      const spotifyAuthData = await response.json();
      console.log(spotifyAuthData);
      if (spotifyAuthData) {
        const access_token = spotifyAuthData.access_token;
        const refresh_token = spotifyAuthData.refresh_token;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('platform', 'spotify');
        console.log(localStorage);
      } else {
        return console.log(`Erreur d'authentification`);
      }
    } catch (error) {
      return console.error(error);
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
    console.log('GMIFS', response);
    const data = {
      name: response.display_name,
      spotify_login: response.id,
      email: response.email,
      streaming_platform: 'spotify',
      token: localStorage.getItem('access_token'),
    };
    return data;
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
      const topTracks_LT = await spotify.getMyTopTracks('long_term');
      const topTracks_MT = await spotify.getMyTopTracks('medium_term');
      const topTracks_ST = await spotify.getMyTopTracks('short_term');
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

        // let syncBtn = document.getElementById('sync-btn');
        let avancement = Math.floor(
          (result.length / (response.total + topTracksLength)) * 100
        );
        // syncBtn.setAttribute('disabled', 'disabled');
        // syncBtn.textContent = avancement + '%';
        // syncBtn.classList.add('wait');

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
            spotify_img_url: item.track.album.images[1]
              ? item.track.album.images[1].url
              : '',
            spotify_preview_url: item.track.preview_url,
          });
        });
        if (response.next) {
          return loop(response.next);
        } else {
          // syncBtn.textContent = `Synchronisation...`;

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
};

export default spotify;
