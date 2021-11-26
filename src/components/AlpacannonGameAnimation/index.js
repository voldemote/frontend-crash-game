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
    if(bet && !bet.ready && bet.amount) spin(bet)
  }, [bet]);
  console.log("bet", bet)
  const spin = () => {
    console.log("Go!")
    setBet((bet) => {return{...bet, ready: true, crash: Math.round(Math.random()*100) }})
    setGame('shoot')
    setTimeout(() => {setGame('shoot')}, 400)
    setTimeout(() => {setGame('crashed')}, 1400)
    setTimeout(() => {setGame('ready')}, 3000)
  }

/*
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

  // const spin = async () => {
  //   setBall({ path: bet.path, winMultiplier: bet.winMultiplier })
  //   !bet.autobet && setBet((bet) => {return{ball: bet.ball, pending: true, amount: bet.amount, profit: bet.profit, reward: bet.reward}});
  // }
/*

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

  const interpolate = (number) => Math.floor((Number(number) + 42)*96/80)

  const interpolateMultiplier = (number) => 100/(100-((Number(number) + 42)*96/80))//Math.floor((Number(number) + 41)*98/80)

  const onSlider = (e) => {
    setBet((bet) => {return {...bet, rollover: interpolate(e.target.value)}})
    setSlider(e.target.value)
  }

  return (
    <div
      ref={backgroundRef}
      className={classNames(
        styles.animation,
        isMobile && styles.animationMobile
      )}
    >
      {audio && <GameAudioControlsLocal game='cannon' audio={audio} />}
      <input
          className={styles.slider}
          value={slider}
          onChange={onSlider}
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
  )
}

const mapStateToProps = state => {
  return {
    userId: state.authentication.userId,
    activities: state.notification.activities,
    connected: state.websockets.connected
  }
}

export default connect(mapStateToProps)(AlpacannonGameAnimation);
