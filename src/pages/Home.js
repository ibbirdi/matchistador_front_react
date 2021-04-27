import React, { Component, Redirect } from 'react';
import ConnectStatus from '../components/ConnectStatus';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Matchboard from '../components/Matchboard';
import matchistador from '../core/matchistador';

//Récupération du code renvoyé par spotify dans l'url en param get

class Home extends Component {
  state = {
    username: '',
    tracks: [],
    matchs: [],
  };

  async componentDidMount() {
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
    this.setState({ username: localStorage.getItem('connected_user_name') });
    this.setState({ tracks: tracks });
    this.setState({ matchs: matchs });
    console.log('matchs :', matchs);
  }

  render() {
    const syncThenReload = async () => {
      await matchistador.syncAll();
    };
    return (
      <div className="Home">
        <Header name={this.state.username} />
        <div className="home-container">
          <h2>Hello</h2>
          {/* <button onClick={this.showMyTracks}>youpi</button> */}
          <Dashboard
            tracksCount={this.state.tracks.length}
            matchsCount={this.state.matchs.length}
            btnFunction={syncThenReload}
          />
          <Matchboard matchs={this.state.matchs} />
        </div>
      </div>
    );
  }
}

export default Home;
