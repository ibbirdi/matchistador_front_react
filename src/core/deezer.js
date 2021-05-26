import matchistador from '../core/matchistador';
import env_vars from './env_vars';

const deezer = {
  clientId: '478322',
  clientSecret: '781de75409e815239f8c9497ee7fb06f',
  redirectUri: `${env_vars.front_url}/authdeezer`,
  scopes: 'basic_access,email,listening_history,offline_access',
  corsAnywhereUrl: '',

  makeConnectUrl: () => {
    const url = `https://connect.deezer.com/oauth/auth.php?app_id=${deezer.clientId}&redirect_uri=${deezer.redirectUri}&perms=${deezer.scopes}`;
    return url;
  },

  buildCorsFreeUrl: (url) => {
    return `https://cors.bridged.cc/${url}`;
  },

  authProcess: async (code) => {
    console.log(code);

    console.log('authProcess');

    //récupération du token de deezer avec le code récupéré

    const response = await fetch(
      deezer.buildCorsFreeUrl(
        `https://connect.deezer.com/oauth/access_token.php?app_id=${encodeURIComponent(
          deezer.clientId
        )}&secret=${encodeURIComponent(
          deezer.clientSecret
        )}&code=${encodeURIComponent(code)}&response_type=token&output=json`
      )
    );

    const deezerData = await response.json();

    if (deezerData.access_token) {
      localStorage.setItem('access_token', deezerData.access_token);
      console.log('access token reçu de deezer');
      await deezer.getMyInfo();
      localStorage.setItem('platform', 'deezer');
    }
    if (localStorage.getItem('access_token')) {
      await matchistador.registerMe();
    }
  },

  getMyInfo: async () => {
    let response = await fetch(
      deezer.buildCorsFreeUrl(
        `https://api.deezer.com/user/me?access_token=${localStorage.getItem(
          'access_token'
        )}`
      )
    );
    response = await response.json();
    console.log('GMIFD', response);
    const data = {
      name: response.name,
      spotify_login: response.name,
      email: response.email,
      streaming_platform: 'deezer',
      token: localStorage.getItem('access_token'),
    };
    return data;
  },

  getMyTracks: async () => {
    try {
      let result = [];
      let fetchUrl = deezer.buildCorsFreeUrl(
        `https://api.deezer.com/user/me/tracks&access_token=${localStorage.getItem(
          'access_token'
        )}`
      );

      async function loop(url) {
        let response = await fetch(url);
        response = await response.json();

        // let syncBtn = document.getElementById('sync-btn');
        let avancement = Math.floor((result.length / response.total) * 100);
        // syncBtn.setAttribute('disabled', 'disabled');
        // syncBtn.textContent = avancement + '%';
        // syncBtn.classList.add('wait');

        console.log(avancement + '%');

        response.data.forEach((track) => {
          //ajoute dans [result] chaque track
          result.push({
            artist: track.artist.name,
            track: track.title,
            album: track.album.title,
            popularity: Math.floor(track.rank / 10000),
            // deezer_id: track.id,
            // deezer_url: track.link,
            // deezer_img_url: '',
            // deezer_preview_url: '',
          });
        });
        if (response.next) {
          return loop(deezer.buildCorsFreeUrl(response.next));
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

export default deezer;
