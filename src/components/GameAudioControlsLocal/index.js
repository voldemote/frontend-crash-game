import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import classNames from 'classnames';

function GameAudioControlLocals({ audio, muteButtonClick }) {
  const [aud, setAud] = useState(audio.volume);

  const onChangeVolume = (event, value) => {
    setAud(value / 100)
    audio.setVolume((value / 100).toFixed(1));    
  }
  return (
    <div className={styles.container}>
      <VolumeSlider level={aud} handleChange={onChangeVolume} />
      <div
        className={classNames({
          [styles.muteButton]: true,
          [styles.mute]: !(audio?.volume > 0),
          [styles.low]: audio.volume < 0.5 && audio.volume > 0,
        })}
        onClick={() => {
          muteButtonClick();
          audio.volume === 0.0 ? onChangeVolume(null, 100) : onChangeVolume(null, 0)
        }}
      />
    </div>
  );
}

export default GameAudioControlLocals;
