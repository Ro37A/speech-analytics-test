import React from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';

import './Words.css';

const Words = ({ phraseIndex }) => {
  const store = useStore();

  return useObserver(() => {
    if (store.activePhraseIndex !== phraseIndex) {
      return <p styleName="text">{store.transcript[phraseIndex].phrase}</p>;
    }

    return (
      <p styleName="text">
        {store.transcript[phraseIndex].words.map(({ word, id }) => {
          const isActive = id === store.activeWordIndex;

          return (
            <React.Fragment key={id}>
              <span styleName={isActive && 'active-word'}>{word}</span>
              {' '}
            </React.Fragment>
          );
        })}
      </p>
    );
  });
};

Words.propTypes = {
  phraseIndex: PropTypes.number.isRequired,
};

export default Words;
