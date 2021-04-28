import React, { useEffect, useState } from 'react';
import ConnectStatus from '../components/ConnectStatus';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Matchboard from '../components/Matchboard';
import Tracksboard from '../components/Tracksboard';
import matchistador from '../core/matchistador';

//Récupération du code renvoyé par spotify dans l'url en param get

const Home = () => {
  const [username, setUsername] = useState('');
  const [tracks, setTracks] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [matchedTracks, setMatchedTracks] = useState([]);
  const [runOnce, setRunOnce] = useState(true);

  const syncThenReload = async () => {
    try {
      await matchistador.getMyTracks();
      const login = localStorage.getItem('connected_user_login');
      setTracks(await matchistador.showMyTracks(login));
      setMatchs(await matchistador.showMyMatchs(login));
    } catch (error) {
      console.error(error);
    }
  };

  const showMatchedTracks = async (matchuser) => {
    const matchedTracks = matchistador.getMatchedTracks(matchuser);
    setMatchedTracks(matchedTracks);
  };

  useEffect(async () => {
    if (runOnce) {
      console.log('local storage : ', localStorage.getItem('isAuth'));
      let url = new URL(window.location.href);
      const spotifyAuthCode = url.searchParams.get('code');

      if (spotifyAuthCode && localStorage.getItem('isAuth') != 'true') {
        await matchistador.authProcess(spotifyAuthCode);
      }
      const login = localStorage.getItem('connected_user_login');
      console.log('login', login);

      const tracks = await matchistador.showMyTracks(login);
      const matchs = await matchistador.showMyMatchs(login);

      setUsername(localStorage.getItem('connected_user_name'));
      setTracks(tracks);
      setMatchs(matchs);
      setRunOnce(false);
    }
  }, []);

  return (
    <div className="Home">
      <Header connectedUser={username} />
      <div className="home-container">
        <h2>Hello</h2>
        {/* <button onClick={this.showMyTracks}>youpi</button> */}
        <Dashboard
          tracksCount={tracks.length}
          matchsCount={matchs.length}
          btnFunction={syncThenReload}
        />
        <Matchboard matchs={matchs} clickFunction={showMatchedTracks} />
        <Tracksboard matchedTracks={matchedTracks} />
      </div>
    </div>
  );
};

// class Home extends Component {
//   state = {
//     username: '',
//     tracks: [],
//     matchs: [],
//   };

//   async componentDidMount() {
//     console.log('local storage : ', localStorage.getItem('isAuth'));
//     let url = new URL(window.location.href);
//     const spotifyAuthCode = url.searchParams.get('code');

//     if (spotifyAuthCode && localStorage.getItem('isAuth') != 'true') {
//       await matchistador.authProcess(spotifyAuthCode);
//     }
//     const login = localStorage.getItem('connected_user_login');
//     console.log('login', login);

//     const tracks = await matchistador.showMyTracks(login);
//     const matchs = await matchistador.showMyMatchs(login);
//     this.setState({ username: localStorage.getItem('connected_user_name') });
//     this.setState({ tracks: tracks });
//     this.setState({ matchs: matchs });
//     console.log('matchs :', matchs);
//   }

//   render() {
//     const syncThenReload = async () => {
//       await matchistador.syncAll();
//     };
//     return (
//       <div className="Home">
//         <Header name={this.state.username} />
//         <div className="home-container">
//           <h2>Hello</h2>
//           {/* <button onClick={this.showMyTracks}>youpi</button> */}
//           <Dashboard
//             tracksCount={this.state.tracks.length}
//             matchsCount={this.state.matchs.length}
//             btnFunction={syncThenReload}
//           />
//           <Matchboard matchs={this.state.matchs} />
//         </div>
//       </div>
//     );
//   }
// }

export default Home;
