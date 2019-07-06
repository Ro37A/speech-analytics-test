import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import formatTime from '../utils/formatTime';

import './PlayerTime.css';

const PlayerTime = () => {
  const store = useStore();

  return useObserver(() => (
    <span styleName="time">
      {formatTime(store.currentTime)}
      /
      {formatTime(store.duration)}
    </span>
  ));
};

export default PlayerTime;
