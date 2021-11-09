import cn from 'classnames';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { ROSI_GAME_AFTER_CRASH_DELAY } from 'constants/RosiGame';
import {
  selectHasStarted,
  selectTimeStarted,
  selectLastCrash,
  selectCashedOut,
  selectNextGameAt,
} from 'store/selectors/rosi-game';
//import Timer from './Timer';
//import Counter from './Counter';
import styles from './styles.module.scss';
import { RosiGameActions } from '../../store/actions/rosi-game';
import VolumeSlider from '../VolumeSlider';
import GameAudioControls from '../GameAudioControls';

/*
const PreparingRound = ({ nextGameAt }) => (
  <div className={styles.preparingRound}>
    <div>
      <h2 className={styles.title}>Preparing Round</h2>
      <div className={styles.description}>
        <span>
          Starting in <Counter className={styles.counter} from={nextGameAt} />
        </span>
      </div>
    </div>
  </div>
);

const GameOffline = () => (
  <div className={styles.preparingRound}>
    <div>
      <h2 className={styles.title}>Connecting to the game engine</h2>
      <div className={styles.description}>
        If this takes too long, try reloading the page
      </div>
    </div>
  </div>
);
*/
let sections = [
  '£25',
  '£15',
  '£50',
  '£1000',
  '£25',
  '£500',
  '£15',
  '£100',
  '£1000',
  '£15',
  '£100',
  '£500',
];

let colors = ['#F84', '#8F4', '#48F', '#F8F'];

let wheels = null;
let frame = null;
let angle = 0,
  running = false;
const innerWidth = 340;

const RouletteGameAnimation = ({
  connected,
  muteButtonClick,
  isMute,
  isSynced,
  isLosing,
  volumeLevel,
  musicIndex,
  animationIndex,
  onInit,
}) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const lastCrashValue = useSelector(selectLastCrash);
  const gameStarted = useSelector(selectHasStarted);
  const cashedOut = useSelector(selectCashedOut);
  const nextGameAtTimeStamp = useSelector(selectNextGameAt);
  const gameStartedTimeStamp = useSelector(selectTimeStarted);
  const gameStartedTime = new Date(gameStartedTimeStamp).getTime();

  const [isPreparingRound, setIsPreparingRound] = useState(!gameStarted);
  const [isAnimationReady, setAnimationReady] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    repaint(angle);
  }, []);

  function spinTo(winner, duration) {
    console.log(winner);
    let final_angle = -0.2 - ((0.5 + winner) * 2 * Math.PI) / sections.length;
    let start_angle =
      angle - Math.floor(angle / (2 * Math.PI)) * 2 * Math.PI - 5 * 2 * Math.PI;
    let start = performance.now();
    function frame() {
      let now = performance.now();
      let t = Math.min(1, (now - start) / duration);
      t = 3 * t * t - 2 * t * t * t; // ease in out
      angle = start_angle + t * (final_angle - start_angle);
      repaint(angle);
      if (t < 1) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    running = true;
  }

  function repaint(angle) {
    let g,
      r = (Math.min(innerWidth, innerWidth) / 2.25) | 0;
    if (wheels === null) {
      wheels = [];
      for (let selected = 0; selected < sections.length; selected++) {
        let c = document.createElement('canvas');
        c.width = c.height = 2 * r + 10;
        let ctx = c.getContext('2d'),
          cx = 5 + r,
          cy = 5 + r;
        let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, 'rgba(0,0,0,0.5)');
        for (let i = 0; i < sections.length; i++) {
          let a0 = (2 * Math.PI * i) / sections.length;
          let a1 = a0 + (2 * Math.PI) / (i == 0 ? 1 : sections.length);
          let a = (2 * Math.PI * (i + 0.5)) / sections.length;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, r, a0, a1, false);
          ctx.fillStyle = colors[i % 4];
          ctx.fill();
          ctx.fillStyle = g;
          ctx.fill();
          ctx.save();
          if (i == selected) {
            ctx.fillStyle = '#FFF';
            ctx.shadowColor = '#FFF';
            ctx.shadowBlur = r / 20;
          } else {
            ctx.fillStyle = '#AAA';
            ctx.shadowColor = '#000';
            ctx.shadowBlur = r / 100;
          }
          ctx.font = 'bold ' + (r / sections.length) * 1.6 + 'px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.translate(cx, cy);
          ctx.rotate(a);
          ctx.fillText(sections[i], r * 0.62, 0);
          ctx.restore();
        }
        wheels.push(c);
      }
    }
    if (frame === null) {
      frame = document.createElement('canvas');
      frame.width = frame.height = (10 + 2 * r * 1.25) | 0;
      let ctx = frame.getContext('2d'),
        cx = frame.width / 2,
        cy = frame.height / 2;
      ctx.shadowOffsetX = r / 80;
      ctx.shadowOffsetY = r / 80;
      ctx.shadowBlur = r / 40;
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.025, 0, 2 * Math.PI, true);
      ctx.arc(cx, cy, r * 0.975, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#444';
      ctx.fill();
      ctx.shadowOffsetX = r / 40;
      ctx.shadowOffsetY = r / 40;
      g = ctx.createRadialGradient(cx - r / 7, cy - r / 7, 0, cx, cy, r / 3);
      g.addColorStop(0, '#FFF');
      g.addColorStop(0.2, '#F44');
      g.addColorStop(1, '#811');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r / 3.5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI - 0.2);
      ctx.beginPath();
      ctx.moveTo(-r * 1.1, -r * 0.05);
      ctx.lineTo(-r * 0.9, 0);
      ctx.lineTo(-r * 1.1, r * 0.05);
      ctx.fillStyle = '#F44';
      ctx.fill();
    }
    console.log('canvasRef', canvasRef.current);
    canvasRef.current.width = innerWidth;
    canvasRef.current.height = innerWidth;
    let cx = innerWidth / 2,
      cy = innerWidth / 2;
    let ctx = canvasRef.current.getContext('2d');
    let selected =
      Math.floor(((-0.2 - angle) * sections.length) / (2 * Math.PI)) %
      sections.length;
    if (selected < 0) selected += sections.length;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.translate(-wheels[selected].width / 2, -wheels[selected].height / 2);
    ctx.drawImage(wheels[selected], 0, 0);
    ctx.restore();
    ctx.drawImage(frame, cx - frame.width / 2, cy - frame.height / 2);
  }
  /*
  useEffect(() => {
    let audioInstance = null;
    if (canvasRef.current) {
      const { audio } = RosiGameAnimationController.init(canvasRef.current, {
        animationIndex,
        volumeLevel,
        musicIndex,
      });
      setAudio(audio);
      audioInstance = audio;
      onInit(audio);
      RosiGameAnimationController.load(() => {
        setAnimationReady(true);
        if (isPreparingRound) {
          RosiGameAnimationController.preparingRound.show();
        }
      });
    }
    return () => audioInstance.stopBgm();
  }, []);

  useEffect(() => {
    if (!isAnimationReady) {
      return;
    }

    if (gameStarted) {
      setIsPreparingRound(false);
      RosiGameAnimationController.start(gameStartedTime, musicIndex);

      if (cashedOut.length > 0) {
        for (const cashOut of cashedOut) {
          RosiGameAnimationController.doCashedOutAnimation(cashOut);
        }
      }

      return;
    }

    if (!gameStarted && !isPreparingRound) {
      RosiGameAnimationController.end(isLosing);
      // leave some time for player to see crash value
      setTimeout(() => {
        RosiGameAnimationController.preparingRound.show(animationIndex);
        setIsPreparingRound(true);
      }, ROSI_GAME_AFTER_CRASH_DELAY);
    }
  }, [gameStarted, isAnimationReady]); // eslint-disable-line

  useEffect(() => {
    if (!isAnimationReady || !gameStarted) {
      return;
    }

    const freshCashOuts = cashedOut.filter(({ isFresh }) => isFresh === true);
    for (const cashOut of freshCashOuts) {
      RosiGameAnimationController.doCashedOutAnimation(cashOut);
    }
  }, [isAnimationReady, gameStarted, cashedOut]); // eslint-disable-line
  */
  /*
  function render() {
    if (!connected) return <GameOffline />;

    if (isPreparingRound) {
      return <PreparingRound nextGameAt={nextGameAtTimeStamp} />;
    }

    return (
      <div
        className={cn(styles.timer, { [styles.flashAnimation]: !gameStarted })}
      >
        {gameStarted && (
          <>
            <Timer pause={!gameStarted} startTimeMs={gameStartedTime} />
            <span>x</span>
          </>
        )}
        {!gameStarted && !!lastCrashValue && (
          <>
            <span>{lastCrashValue?.crashFactor?.toFixed(2)}</span>
            <span>x</span>
          </>
        )}
      </div>
    );
  }
*/
  return (
    <div className={styles.animation}>
      <canvas
        className={styles.canvas}
        onClick={() => spinTo((Math.random() * sections.length) | 0, 5000)}
        ref={canvasRef}
      ></canvas>
      {/*  <div className={styles.audioControls}>
        audio && (
          <GameAudioControls audio={audio} muteButtonClick={muteButtonClick} />
        )
      </div>
      <canvas
        className={classNames(
          styles.canvas,
          !connected || !isSynced ? styles.gameOffline : null
        )}
        id="rosi-game-animation"
        ref={canvasRef}
      />
      {isAnimationReady && isSynced ? render() : <GameOffline />*/}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    isMute: state.rosiGame.volumeLevel == 0,
    volumeLevel: state.rosiGame.volumeLevel,
    musicIndex: state.rosiGame.musicIndex,
    isSynced: state.rosiGame.timeStarted || state.rosiGame.nextGameAt,
    animationIndex: state.rosiGame.animationIndex,
    isLosing: state.rosiGame.userBet && !state.rosiGame.isCashedOut,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    muteButtonClick: () => {
      dispatch(RouletteGameAnimation.muteButtonClick());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouletteGameAnimation);
