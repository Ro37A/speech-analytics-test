import React from 'react';
import { useObserver } from 'mobx-react-lite';

import Phrase from './Phrase';

import { useStore } from '../store';

import './Transcribation.css';

const Transcribation = () => {
  const store = useStore();

  return useObserver(() => (
    <div styleName="transcribation">
      <h2 styleName="audio-name">audio.wav</h2>
      <p styleName="audio-date">23 июн 01:15:03</p>
      <div styleName="phrases">
        {store.transcript.map(({ id }) => (
          <Phrase
            key={id}
            phraseIndex={id}
          />
        ))}
      </div>
    </div>
  ));
};

export default Transcribation;
