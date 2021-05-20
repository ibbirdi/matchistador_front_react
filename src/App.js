import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Authdeezer from './pages/Authdeezer';
import Home from './pages/Home';
import Landing from './pages/Landing';

import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/authdeezer" exact component={Authdeezer} />

            <Route path="/home" exact component={Home} />
            <Route path="/profil" exact component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
