import { hot } from 'react-hot-loader/root';
import React from 'react';

import Player from './Player';
import Transcribation from './Transcribation';

import { StoreProvider } from '../store';

import './App.css';

const App = () => (
  <div styleName="app">
    <StoreProvider>
      <Transcribation />
      <Player />
    </StoreProvider>
  </div>
);

export default hot(App);
