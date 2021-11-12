import useRosiData from '../../hooks/useRosiData';
import { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import GameOffline from '../GameOffline';
import classNames from 'classnames';
import styles from './styles.module.scss';
import GameAudioControls from 'components/GameAudioControls';
import { RosiGameActions } from 'store/actions/rosi-game';
import { GameAudioManager } from './GameAudioManager';
import { GameScene } from './game/scenes/GameScene';
import { PumpDumpGameMananger } from './game/PumpDumpGameManager';

const PumpDumpAnimation = ({ muteButtonClick }) => {
  const {
    isConnected,
    isMute,
    isSynced,
    volumeLevel,
    musicIndex,
    animationIndex,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
    lastCrashValue,
    nextGameAtTimeStamp,
    gameStartedTimeStamp,
  } = useRosiData();
  const [isPreparingRound, setIsPreparingRound] = useState(!hasStarted);
  const [isAnimationReady, setAnimationReady] = useState(false);
  const canvasRef = useRef(null);

  const [audio, setAudio] = useState(null);

  // OnMount / OnDismount
  useEffect(() => {
    const audioManager = new GameAudioManager();
    setAudio(audioManager);
    if (canvasRef.current) {
      const gameScene = new GameScene();
      PumpDumpGameMananger.initialize(0x12132e, canvasRef.current);
      PumpDumpGameMananger.changeScene(gameScene);
    }
  }, []);

  return (
    <div className={styles.animation}>
      <div className={styles.audioControls}>
        {audio && (
          <GameAudioControls audio={audio} muteButtonClick={muteButtonClick} />
        )}
      </div>      
      <canvas
        className={classNames(styles.canvas)}
        id="pump-dump-game-animation"
        ref={canvasRef}
      />
      {isConnected || <GameOffline />}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    muteButtonClick: () => {
      dispatch(RosiGameActions.muteButtonClick());
    },
  };
};

const Connected = connect(
  null,
  mapDispatchToProps
)(PumpDumpAnimation);
export default memo(Connected);
