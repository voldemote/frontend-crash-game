import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import { AudioController } from '../AudioController';
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
  const [slider, setSlider] = useState(0);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() =>{
    const aud = new AudioController(3)
    setAudio(aud)
    aud.startBgm()
    onInit(aud)
    window.addEventListener('resize', updateSize);
    updateSize()
    return () => {
      aud.stopBgm();
    }
  }, [])

  const updateSize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    if(bet && !bet.ready && bet.amount && !bet.running) spin(bet)
  }, [bet]);

  const spin = () => {
    console.log("Go!")
    setBet((bet) => {return{...bet, running: true, crash: Math.round(Math.random()*100) }})
    setGame('shoot')
    setTimeout(() => {setGame('shoot')}, 400)
    setTimeout(() => {
      setGame('crashed')
      audio.playCrashSound()
      if(bet.profit > 0){
        
        /*
        const spin = bet.profit > 0 ?
          { type: 'win', value: '+' + bet.profit } :
          bet.profit === 0 ? { type: 'even', value: '' + bet.profit } :
          { type: 'loss', value: bet.profit}
        setSpins((spins) => [spin].concat(spins))
        */

      }
      setTimeout(() => {setBet((bet) => {return{...bet, ready: true, running: false}})}, 1000)

    }, 1400)
    setTimeout(() => {setGame('ready')}, 3000)
  }

  const interpolate = (number) => Math.floor((Number(number) + 42)*96/80)

  const interpolateMultiplier = (number) => 100/(100-((Number(number) + 42)*96/80))//Math.floor((Number(number) + 41)*98/80)

  const onSlider = (e) => {
    setBet((bet) => {return {...bet, rollover: interpolate(e.target.value)}})
    setSlider(e.target.value)
  }
  
//1250 width
  console.log("Crash: ", bet);

  return (
    <div
      ref={backgroundRef}
      className={classNames(
        styles.animation,
        (width < 600 || isMobile) && styles.animationMobile,
        (height < width && isMobile) && styles.animationMobilePortrait
      )}
    >
      <img className={styles.background} src={(height < width && isMobile) ? "/images/cannon-games/alpacannon-background-landscape.png" : (width < 600 || isMobile) ? "/images/cannon-games/alpacannon_background_mobile.png": "/images/cannon-games/alpacannon_background_desktop.png"} alt="background" />
      {audio && <GameAudioControlsLocal game='cannon' audio={audio} />}
      <input className={styles.slider}
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
      <div className={styles.alpaResult} style={{ opacity: game === 'crashed' ? 1 : 0,right: ((bet.crash?bet.crash:50) * 5)+10 }}>
        <span>{100 - interpolate(slider)}%</span>
      </div>
      <div className={styles.interpolateMultiplier}>
        <span>{interpolateMultiplier(slider).toFixed(2)}</span>
      </div>

      <div className={styles.fullcannon} style={{transform: `rotate(${slider}deg)`}}>
        <img className={styles.cannon} src="/images/cannon-games/cannon.png" alt="cannon" />
        <img className={styles.alpacaInCannon} style={{opacity: game==='ready'?1:0}} src="/images/cannon-games/alpaca-in-cannon.png" alt="alpaca in cannon" />
        <img className={styles.explotion} style={{ opacity: game === 'shoot' ? 1 : 0 }} src="/images/cannon-games/explotion.svg" alt="explotion" />
      </div>
      <img id="fly" className={styles.alpacaFlying} style={{ opacity: game === 'shoot' ? 1 : 0, bottom: game === 'shoot' && 188, right: game === 'shoot' && ((bet.crash ? bet.crash : 50) * 5) + 40 }} src={bet.crash > 35 ? "/images/cannon-games/alpaca-left.svg" : bet.crash < 65 ? "/images/cannon-games/alpaca-right.svg" : "/images/cannon-games/alpaca-center.svg" } alt="alpaca flying" />
      <img className={styles.alpacaCrash} style={{ opacity: game === 'crashed' ? 1 : 0, right: ((bet.crash ? bet.crash : 50) * 5) + 20 }} src={bet.crash > 35 ? "/images/cannon-games/alpaca-crash-left.png" : bet.crash < 65 ? "/images/cannon-games/alpaca-crash.png" : "/images/cannon-games/alpaca-crash.png"} alt="alpaca crash" />
      <img className={styles.score} style={{ opacity: game === 'crashed' ? 1 : 0, right: ((bet.crash ? bet.crash : 50) * 5) + 20 }} src="/images/cannon-games/score.svg" alt="alpaca crash" />
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
