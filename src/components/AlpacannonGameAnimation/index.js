import cn from 'classnames';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import { AudioController } from '../AudioController';
import { BackgroundPlinko } from './AnimationController'//AnimationController
import GameAudioControlsLocal from '../GameAudioControlsLocal';
import { isMobile } from 'react-device-detect';

const AlpacannonGameAnimation = ({
  connected,
  amount,
  activities,
  onInit,
  risk,
  setBet,
  userId,
  setSpins,
  bet
}) => {
  const dispatch = useDispatch();
  const backgroundRef = useRef(null);
  const canvasRef = useRef(null);

  const [audio, setAudio] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [backg, setBackg] = useState(0);
  const [lastgame, setLastgame] = useState(null);
  const [shadow, setShadow] = useState(null);
  //const [backgr, setBackgr] = useState(backgroundString(0));
  const [flag, setFlag] = useState(false);
  const [ball, setBall] = useState(null);
/*
  useEffect(() => {
    const lastnewgame = activities[activities.length-1]?.data
    if(activities?.length > 0 && lastgame != lastnewgame.gameHash && lastnewgame.gameName == "GAME_PLINKO" && lastnewgame.userId != userId){
      lastgame && setShadow(lastnewgame.path)
      setLastgame(lastnewgame.gameHash)
    }
  }, [activities])

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
  */

  // const spin = async () => {
  //   setBall({ path: bet.path, winMultiplier: bet.winMultiplier })
  //   !bet.autobet && setBet((bet) => {return{ball: bet.ball, pending: true, amount: bet.amount, profit: bet.profit, reward: bet.reward}});
  // }
/*
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
    const spin = bet.profit > 0 ?
      { type: 'win', value: '+' + bet.profit } :
      bet.profit === 0 ? { type: 'even', value: '' + bet.profit } :
      { type: 'loss', value: bet.profit}
    setSpins((spins) => [spin].concat(spins))
    bet.autobet ?
     setBet((bet) => {return {ball: bet.ball-1, pending: true, amount: bet.amount, profit: bet.profit, reward: bet.reward}}) :
     setBet((bet) => {return {...bet, ball: bet.ball-1}})
  }
  */
  // return (
  //   <div ref={backgroundRef} className={styles.animation}>
  //     {audio && <GameAudioControlsLocal game='plinko' audio={audio} />}
  //     {false && <BackgroundPlinko state={backg} width={width} height={height} size={Math.sqrt(width*width+height*height)*1.1} />}
  //     {/*false && width && height && <AnimationController risk={risk} amount={bet.autobet ? bet.amount:amount} ballValue={ball} audio={audio} onEnd={handleEnd} setBall={setBall} shadow={shadow} setShadow={setShadow} />*/}
  //   </div>
  // );
  return (
    <div
      ref={backgroundRef}
      className={classNames(
        styles.animation,
        isMobile && styles.animationMobile
      )}
    >
      <div className={styles.audioControls}>
        {audio && <GameAudioControlsLocal audio={audio} />}
      </div>
      <canvas id="" className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
};

 const mapStateToProps = state => {
   return {
     userId: state.authentication.userId,
     activities: state.notification.activities,
     connected: state.websockets.connected
   };
 };

export default connect(mapStateToProps)(AlpacannonGameAnimation);
