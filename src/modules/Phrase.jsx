import React from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react-lite';

import Avatar from '../components/Avatar';
import PhraseTime from '../components/PhraseTime';
import Words from '../components/Words';

import { useStore } from '../store';

import './Phrase.css';

const Phrase = ({ phraseIndex }) => {
  const store = useStore();

  return useObserver(() => {
    const phraseTime = store.transcript[phraseIndex].timeStart;

    return (
      <div styleName="phrase">
        <Avatar />
        <div styleName="words-block">
          <PhraseTime time={phraseTime} />
          <Words phraseIndex={phraseIndex} />
        </div>
      </div>
    );
  });
};

Phrase.propTypes = {
  phraseIndex: PropTypes.number.isRequired,
};

export default Phrase;
