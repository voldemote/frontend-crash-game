import styles from './styles.module.scss';

import React from 'react';
import { Slider } from '@material-ui/core';

function VolumeSlider({ level = 0.5, handleChange = () => {} }) {
  return (
    <Slider
      className={styles.slider}
      aria-label="Volume"
      value={level * 100}
      onChange={handleChange}
      min={0}
      max={100}
      sx={{
        color: '#36344c',
        width: 100,
      }}
    />
  );
}

export default VolumeSlider;
