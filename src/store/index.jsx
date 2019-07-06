import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStore } from 'mobx-react-lite';

import transcript from '../mock/transcript.json';

const storeContext = React.createContext(null);

const createStore = () => ({
  isPlay: false,
  currentTime: 0,
  duration: 0,
  transcript: transcript.map((phrase, phraseIndex) => ({
    ...phrase,
    id: phraseIndex,
    timeEnd: phrase.words[phrase.words.length - 1].timeEnd,
    words: phrase.words.map((word, wordIndex) => ({
      ...word,
      id: wordIndex,
    })),
  })),
  tooglePlay() {
    this.isPlay = !this.isPlay;
  },
  setCurrentTime(time) {
    this.currentTime = time;
  },
  setDuration(time) {
    this.duration = time;
  },
  get activePhraseIndex() {
    return this.transcript.findIndex(
      ({ timeStart, timeEnd }) => this.currentTime >= timeStart && this.currentTime <= timeEnd,
    );
  },
  get activeWordIndex() {
    if (this.activePhraseIndex === -1) return -1;

    return this.transcript[this.activePhraseIndex].words.findIndex(
      ({ timeStart, timeEnd }) => this.currentTime >= timeStart && this.currentTime <= timeEnd,
    );
  },
});

const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore);

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStore = () => {
  const store = React.useContext(storeContext);

  if (!store) {
    throw new Error('You have forgot to use StoreProvider.');
  }
  return store;
};

export { StoreProvider, useStore };
