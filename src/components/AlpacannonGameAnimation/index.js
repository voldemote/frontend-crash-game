import cn from 'classnames';
import classNames from 'classnames';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import { AudioController } from '../AudioController';
//import AnimationController from './AnimationController'//AnimationController
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

  const [game, setGame] = useState('ready');

  const [audio, setAudio] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [backg, setBackg] = useState(0);
  const [lastgame, setLastgame] = useState(null);
  const [shadow, setShadow] = useState(null);

  const [slider, setSlider] = useState(0);

  useEffect(() =>{
    //AnimationController.init({ref: backgroundRef})
  },[])

  useEffect(() => {
    if(bet && !bet.ready && bet.amount) spin(bet);
  }, [bet]);

  const spin = () => {
    console.log("Go!")
    setBet({ ready: true, crash: Math.round(Math.random()*100) })
    setGame('shoot')
    setTimeout(() => {setGame('shoot')}, 400)
    setTimeout(() => {setGame('crashed')}, 1400)
    setTimeout(() => {setGame('ready')}, 3000)
  }

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
  const interpolate = (number) => Math.floor((Number(number) + 41)*98/80)

  const interpolateMultiplier = (number) => 100/(100-((Number(number) + 41)*98/80))//Math.floor((Number(number) + 41)*98/80)

  const dragSlider = (e) => setSlider(e.target.value)

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
      <input
          className={styles.slider}
          value={slider}
          onChange={dragSlider}
          style={{zIndex: game==='ready'&&4, background: `linear-gradient(90deg, rgba(240,0,0,1) ${interpolate(slider)}%, rgba(0,255,0,1) ${interpolate(slider)}%)`}}
          type="range"
          step={1}
          min={-40}
          max={40} />
      <div className={styles.chance}>
        <span>{100-interpolate(slider)}%</span>
      </div>
      <div className={styles.interpolateMultiplier}>
        <span>{interpolateMultiplier(slider).toFixed(2)}</span>
      </div>
      <div className={styles.fullcannon} style={{transform: `rotate(${slider}deg)`}}>
        <img className={styles.cannon} src="/images/cannon-games/cannon.svg" alt="cannon" />
        <img className={styles.alpacaInCannon} style={{opacity: game==='ready'?1:0}} src="/images/cannon-games/alpaca_in_cannon.svg" alt="alpaca in cannon" />
        <img className={styles.explotion} style={{opacity: game==='shoot'?1:0}} src="/images/cannon-games/explotion.svg" alt="explotion" />
      </div>
      <img className={styles.alpacaFlying} style={{ opacity: game==='shoot'?1:0, bottom: game==='shoot' && 188, right: game==='shoot' && (bet.crash*5) + 20 }} src="/images/cannon-games/alpaca_flying.svg" alt="alpaca flying" />
      <img className={styles.alpacaCrash} style={{ opacity: game==='crashed'?1:0, right: (bet.crash*5) + 20 }} src="/images/cannon-games/alpaca_crash.svg" alt="alpaca crash" />
    </div>
  );
};
//crash
 const mapStateToProps = state => {
   return {
     userId: state.authentication.userId,
     activities: state.notification.activities,
     connected: state.websockets.connected
   };
 };

export default connect(mapStateToProps)(AlpacannonGameAnimation);
