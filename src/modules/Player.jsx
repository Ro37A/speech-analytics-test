import React, { useRef, useEffect, useCallback } from 'react';
import { reaction } from 'mobx';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';

import PlayButton from '../components/PlayButton';
import AudioRange from '../components/AudioRange';
import PlayerTime from '../components/PlayerTime';

import audio from '../assets/audio/audio.wav';

import './Player.css';

const Player = () => {
  const audioEl = useRef();
  const store = useStore();

  useEffect(
    () => reaction(
      () => store.isPlay,
      isPlay => (isPlay ? audioEl.current.play() : audioEl.current.pause()),
    ),
    [],
  );

  const handleDurationChange = useCallback(() => {
    store.setDuration(audioEl.current.duration);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    store.setCurrentTime(audioEl.current.currentTime);
  }, []);

  const handleStop = useCallback(() => {
    if (store.isPlay) store.tooglePlay();
  }, []);

  const handleChangeTime = useCallback((time) => {
    audioEl.current.currentTime = time;
  }, []);

  return useObserver(() => (
    <div styleName="player">
      <audio
        ref={audioEl}
        preload="metadata"
        onDurationChange={handleDurationChange}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleStop}
      >
        <source src={audio} type="audio/wav" />
        <p>Ваш браузер не поддерживает HTML5 аудио</p>
      </audio>
      <div styleName="player-controls">
        <PlayButton />
        <AudioRange onChangeTime={handleChangeTime} />
        <PlayerTime />
      </div>
    </div>
  ));
};

export default Player;
