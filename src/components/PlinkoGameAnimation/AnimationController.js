import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

const rows = 12, ball = 20, row = 30, peg = 10, separation = 30;

const outcomesByRisk = [
  [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
  [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
  [170, 24, 8.1, 2, 0.7, 0.2, 0.2, 0.2, 0.7, 2, 8.1, 24, 170]
]

export const AnimationController = ({risk = 1, ballValue, width, height, onWin, start, setStart, audio}) => {

  const prevOutcomes = outcomesByRisk[0].reduce((outs, out) => {
    return outs.concat({value: out, bright: false})
  }, [])
  const [outcomes, setOutcomes] = useState(prevOutcomes);
  const [nball, setNball] = useState(0);

  const boardref = useRef(null);

  const brightBasket = (winMultiplier) => {
    const right = ballValue.path.filter(n=>n==1).length >= ballValue.path.length/2
    const index = outcomes.findIndex((out, i) => right ? i > 5 && out.value === winMultiplier:out.value === winMultiplier)
    if(index > 0){
      setBox(index)
      winMultiplier > 1 && onWin()
    }
  }

  const setBox = (index) => {
    setOutcomes(outcomes.reduce((outs, out, i) => {return outs.concat(index===i ? {...out, bright: true}:out)}, []))
    setTimeout(() => {
      setOutcomes(outcomes.reduce((outs, out, i) => {return outs.concat(index===i ? {...out, bright: false}:out)}, []))
    }, 2000)
  }

  useEffect(() => {
    if(start) {
      setBall(ballValue, brightBasket, nball, boardref)
      setNball(nball+1)
      setStart(false)
    }
  }, [start])

  useEffect(() => {
    if(risk){
      const prevOutcomes = outcomesByRisk[risk-1].reduce((outs, out, i) => {
        return outs.concat({value: out, bright: outcomes[i].bright})
      }, [])
      setOutcomes(prevOutcomes)
    }
  }, [risk])

  return (
    <div className={styles.board} ref={boardref}>
      {false && <div id="ball" className={styles.ball}></div>}
      {Array.from({length: rows}).map((row, index) =>
        <div className={styles.row}>
          {Array.from({length: index+3}).map((peg) => <div className={styles.peg}></div> )}
        </div>
      )}
      <div className={styles.boxes}>
        {outcomes.map((box, index) => <div className={classNames(styles.box, box.bright && styles.bright)}>{box.value}</div>)}
      </div>
    </div>
  )
}

const setBall = (ballValue, onBuscket, nball, boardref) => {
  let ball1 = document.createElement('div')
  ball1.setAttribute("id", `ball-${nball}`);
  ball1.setAttribute("class", styles.ball)
  boardref.current.appendChild(ball1)
  ball1.style.transform = `translate(0px, 0px)`;
  setTimeout(()=>{
    ball1.style.transform = `translate(0px, ${ball-2}px)`;
    let index = 0
    for(let direction of ballValue.path){
      setTimeout(() => {
        moveBall(direction, `ball-${nball}`)
      }, (index*350))
      index++
    }
    setTimeout(() => {
      fallToBuscket(onBuscket, `ball-${nball}`, ballValue.winMultiplier)
    }, (ballValue.path.length*350+1))
  }, 250)
}

const getXBall = (ball) => parseInt( document.getElementById(ball).style.transform.split("(")[1].split(", ")[0].replace("px",""))
const getYBall = (ball) => parseInt(document.getElementById(ball).style.transform.split("(")[1].split(", ")[1].replace("px",""))

function moveBall(direction, ball) {
  setTimeout(() => {
    const x = getXBall(ball), y = getYBall(ball)
    const rotate = direction === 1 ? '0deg' : '0deg'
    const newX = direction === 1 ? x + separation/2 : x - separation/2
    document.getElementById(ball).style.transform = `translate(${newX}px, ${y+row/4}px) rotate(${rotate})`;
  }, 0)
  setTimeout(() => {
    const x = getXBall(ball), y = getYBall(ball)
    const newX = direction === 1 ? x+peg/2 : x-peg/2
    const rotate = direction === 1 ? '180deg' : '-180deg'
    document.getElementById(ball).style.transform = `translate(${newX}px, ${y+row/4}px) rotate(${rotate})`;
    }, 100)
  setTimeout(() => {
    const x = getXBall(ball), y = getYBall(ball)
    const rotate = direction === 1 ? '360deg' : '-360deg'
    document.getElementById(ball).style.transform = `translate(${x}px, ${y+row/2+1}px) rotate(${rotate})`;
   }, 175)
}
function fallToBuscket(onBuscket, ball, winMultiplier) {
  const x = getXBall(ball), y = getYBall(ball)
  document.getElementById(ball).style.transform = `translate(${x}px, ${y+22}px) rotate(0)`;
  setTimeout(() => onBuscket(winMultiplier), 150)
  setTimeout(() => document.getElementById(ball).style.opacity = 0, 300)
  setTimeout(() => document.getElementById(ball).remove(), 500)
}

export const BackgroundPlinko = ({size, state}) => {
  const colors = ["#d7393f", "#dd8549", "#e6e76a"]
  return(
    <svg className={styles.background} height={size} width={size}>
      <circle r={size/2} cx={size/2} cy={size/2} fill={colors[state % 3]} />
      <circle
        r={size/4}
        cx={size/2}
        cy={size/2}
        fill="transparent"
        stroke={colors[(state+1) % 3]}
        strokeWidth={size/2}
        strokeDasharray="50 100"
      />
      <circle
        r={size/4}
        cx={size/2}
        cy={size/2}
        fill="transparent"
        stroke={colors[(state+2) % 3]}
        strokeWidth={size/2}
        strokeDashoffset={50}
        strokeDasharray="50 100"
      />
    </svg>
  )
};
