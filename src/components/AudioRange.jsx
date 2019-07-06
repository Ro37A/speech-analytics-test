import React from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react-lite';
import Slider from 'rc-slider';
import { useStore } from '../store';

import './AudioRange.css';

const sharedStyle = {
  backgroundColor: '#3374eb',
  cursor: 'pointer',
};
const trackStyle = {
  ...sharedStyle,
};
const handleStyle = {
  ...sharedStyle,
  width: '8px',
  height: '8px',
  transform: 'translate(3px, 3px)',
  border: 0,
};
const railStyle = {
  ...sharedStyle,
  backgroundColor: '#e8e8e8',
};

const AudioRange = ({ onChangeTime }) => {
  const store = useStore();

  return useObserver(() => (
    <div styleName="slider">
      <Slider
        max={+store.duration.toFixed(1) || 100}
        value={+store.currentTime.toFixed(1)}
        step={0.1}
        onChange={onChangeTime}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        railStyle={railStyle}
      />
    </div>
  ));
};

AudioRange.propTypes = {
  onChangeTime: PropTypes.func.isRequired,
};

export default AudioRange;
