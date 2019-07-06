import React from 'react';
import { observer } from 'mobx-react-lite';
import { ReactComponent as PauseSVG } from '../assets/img/pause-button.svg';
import { ReactComponent as PlaySVG } from '../assets/img/play-button.svg';

import { useStore } from '../store';

import './PlayButton.css';

const PlayButton = observer(() => {
  const store = useStore();
  const SVG = store.isPlay ? PauseSVG : PlaySVG;

  return (
    <SVG styleName="icon" onClick={store.tooglePlay} />
  );
});

export default PlayButton;
