import React from 'react';
import PropTypes from 'prop-types';

import formatTime from '../utils/formatTime';

import './PhraseTime.css';

const PhraseTime = ({ time }) => (
  <span styleName="time">
    {formatTime(time)}
  </span>
);

PhraseTime.propTypes = {
  time: PropTypes.number.isRequired,
};

export default PhraseTime;
