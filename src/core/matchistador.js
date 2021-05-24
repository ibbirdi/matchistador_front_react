import spotify from './spotify';
import deezer from './deezer';
import env_vars from './env_vars';

const matchistador = {
  makePlatformsConnectUrls: () => ({
    spotifyUrl: spotify.makeConnectUrl(),
    deezerUrl: deezer.makeConnectUrl(),
  }),

  registerMe: async () => {
    const data = await matchistador.getMyInfoFromPlatformAuto();
    console.log(data);

    const response = await fetch(`${env_vars.api_url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(await response.json());
    await matchistador.syncMyInfo();
  },

  getMyInfoFromPlatformAuto: async () => {
    let response;
    if (localStorage.getItem('platform') === 'spotify') {
      console.log('récup info spotify auto');
      response = await spotify.getMyInfo();
    } else if (localStorage.getItem('platform') === 'deezer') {
      console.log('récup info deezer auto');

      response = await deezer.getMyInfo();
    }
    return response;
  },

  checkConnectionFromMatchistador: async () => {
    const response = await matchistador.getMyInfoFromPlatformAuto();
    if (response.spotify_login && response.token) {
      console.log('Connect status : ok', response.token);
    } else return;
    let userInfo = await fetch(
      `${env_vars.api_url}/user/${response.spotify_login}/info?token=${response.token}`
    );
    userInfo = await userInfo.json();
    return userInfo;
  },

  syncMyInfo: async () => {
    const userInfo = await matchistador.checkConnectionFromMatchistador();
    localStorage.setItem('connected_user_name', userInfo.name);
    localStorage.setItem('connected_user_login', userInfo.spotify_login);
    localStorage.setItem('isAuth', true);
    console.log('Infos: ', userInfo);

    return userInfo;
  },

  getMyInfoFromMatchistador: async () => {
    try {
      const userInfo = await matchistador.checkConnectionFromMatchistador();
      console.log('GMIFM', userInfo);

      return userInfo;
    } catch (error) {
      console.log('Connect status : error');
      localStorage.setItem('isAuth', false);

      return;
    }
  },

  changeMyUsername: async (newUserName) => {
    const username = JSON.stringify({ newusername: newUserName });
    const data = await matchistador.getMyInfoFromPlatformAuto();

    let response = await fetch(
      `${env_vars.api_url}/user/${data.spotify_login}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: username,
      }
    );
    return await response.json();
  },

  showMyTracks: async () => {
    const response = await matchistador.getMyInfoFromPlatformAuto();

    const result = await fetch(
      `${env_vars.api_url}/user/${response.spotify_login}/tracks`
    );
    const tracks = await result.json();
    return tracks;
  },

  showMyMatchs: async () => {
    const response = await matchistador.getMyInfoFromPlatformAuto();
    const result = await fetch(
      `${env_vars.api_url}/user/${response.spotify_login}/matchs`
    );
    const matchs = await result.json();
    return matchs;
  },

  getMyTracks: async () => {
    if (localStorage.getItem('platform') === 'spotify') {
      await spotify.getMyTracks();
    } else if (localStorage.getItem('platform') === 'deezer') {
      await deezer.getMyTracks();
    }
  },

  syncMyTracks: async (tracks) => {
    try {
      // s'exécute à la fin de getMyTracks()
      const data = await matchistador.getMyInfoFromPlatformAuto();
      let response = await fetch(
        `${env_vars.api_url}/user/${data.spotify_login}/tracks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tracks),
        }
      );
      return console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  },

  syncMyMatchs: async () => {
    try {
      // s'exécute à la fin de getMyTracks()
      const data = await matchistador.syncMyInfo();
      const spotify_login = data.spotify_login;
      let response = await fetch(
        `${env_vars.api_url}/user/${spotify_login}/syncmatchs`
      );
      console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  },

  getMatchedTracks: async (matchuser) => {
    try {
      let matchedTracks = await fetch(
        `${env_vars.api_url}/user/${localStorage.getItem(
          'connected_user_login'
        )}/matchedtracks/${matchuser}`
      );
      return await matchedTracks.json();
    } catch (error) {
      console.error(error);
    }
  },
  makePlaylist: async (name, desc, tracks) => {
    try {
      const userInfo = await matchistador.checkConnectionFromMatchistador();

      if (userInfo.streaming_platform === 'spotify') {
        //CREATION DE LA PLAYLIST
        const data = {
          name: name,
          description: desc,
        };

        let newPlaylist = await fetch(
          `https://api.spotify.com/v1/users/${userInfo.spotify_login}/playlists`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            },
            body: JSON.stringify(data),
          }
        );
        newPlaylist = await newPlaylist.json();
        const playlistId = newPlaylist.id;
        console.log(newPlaylist);

        //AJOUT DES TRACKS DANS LA PLAYLIST

        let tracksUri = tracks.map((track) => track.spotify_url);
        console.log('tracks uri array : ', tracksUri);

        tracksUri = tracksUri.filter((track) => !track.includes('deezer'));

        while (tracksUri.length > 0) {
          const splicedTracks = tracksUri.splice(0, 100);
          const addTracksData = {
            uris: splicedTracks,
          };
          console.log(addTracksData);
          await fetch(
            ` https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              },
              body: JSON.stringify(addTracksData),
            }
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default matchistador;
