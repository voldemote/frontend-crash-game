import cn from 'classnames';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import { AudioController } from '../RouletteGameAnimation/AnimationController';
import { AnimationController, BackgroundPlinko } from './AnimationController'
import GameAudioControlsLocal from '../GameAudioControlsLocal';

const PlinkoGameAnimation = ({
  connected,
  setSpins,
  amount,
  onInit,
  risk,
  setBet,
  bet
}) => {
  const dispatch = useDispatch();
  const backgroundRef = useRef(null);

  const [audio, setAudio] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [backg, setBackg] = useState(0);
  const [flag, setFlag] = useState(false);
  const [ball, setBall] = useState(null);

  useEffect(() => {
    if(backgroundRef) {
      setWidth(backgroundRef.current.clientWidth)
      setHeight(backgroundRef.current.clientHeight)
    }
    const aud = new AudioController(1)
    setAudio(aud)
    aud.startBgm();
    onInit(aud)
    return () => {
      aud.stopBgm();
    }
  },[])

  useEffect(() => {
    if(bet && !bet.pending && bet.path) spin(bet);
  }, [bet]);

  const spin = async () => {
    setBall({ path: bet.path, winMultiplier: bet.winMultiplier })
    !bet.autobet && setBet((bet) => {return{ball: bet.ball, pending: true, amount: bet.amount, profit: bet.profit, reward: bet.reward}});
  }

  const changeBackground = (count) => {
    if(flag) return
    else setFlag(true)
    setBackg((backg) => backg === 2 ? 0 : backg + 1)
    setTimeout(() => {
      setBackg((backg) => backg === 2 ? 0 : backg + 1)
      count < 30 ? changeBackground(count + 1) : setFlag(false)
    }, 100)
  }

  const handleEnd = (win) => {
    if(win) {
      audio.playWinSound()
      changeBackground(0)
    } else audio.playLoseSound();
    bet.autobet ?
     setBet((bet) => {return{ball: bet.ball-1, pending: true, amount: bet.amount, profit: bet.profit, reward: bet.reward}}) :
     setBet((bet) => {return{...bet, ball: bet.ball-1}})
  }

  return (
    <div ref={backgroundRef} className={styles.animation}>
      {audio && <GameAudioControlsLocal game='plinko' audio={audio} />}
      <BackgroundPlinko state={backg} size={Math.min(width, height)*4} />
      {width && height && <AnimationController risk={risk} amount={amount} ballValue={ball} audio={audio} onEnd={handleEnd} setBall={setBall} />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
  };
};

export default connect(mapStateToProps)(PlinkoGameAnimation);
