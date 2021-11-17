import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';

const rows = 12, ball = 20, row = 30, peg = 10, separation = 30;
const risks = [44.4, 11, 5, 3, 1.2, 1.01, 0.6, 0.25, 0.6, 1.01, 1.2, 3, 5, 11, 44.4]
export const Plinko = ({width, height, onWin, start, setStart}) => {
  // console.log("size", width, height)
  useEffect(() => {
    if(start) {
      setBall('110011011000', onWin)
      setStart(false)
    }
  }, [start])

  return (
    <div className={styles.board}>
      <div id="ball" className={styles.ball}></div>
      {Array.from({length: rows}).map((row, index) =>
        <div className={styles.row}>
          {Array.from({length: index+3}).map((peg) => <div className={styles.peg}></div> )}
        </div>
      )}
      <div className={styles.boxes}>
        {risks.map((box) => <div className={styles.box}>{box}</div>)}
      </div>
    </div>
  )
}

const setBall = (path, onBuscket) => {
  document.getElementById("ball").style.transform = `translate(0px, 0px)`;
  setTimeout(()=>{
    document.getElementById("ball").style.transform = `translate(0px, ${ball-2}px)`;
    for(let [index, direction] of path.split('').entries()){
      setTimeout(() => {
        moveBall(direction)
      }, (index*350))
    }
    setTimeout(() => {
      fallToBuscket(onBuscket)
    }, (path.split('').length*350+1))
  }, 250)
}

const getXBall = () => parseInt( document.getElementById("ball").style.transform.split("(")[1].split(", ")[0].replace("px",""))
const getYBall = () => parseInt(document.getElementById("ball").style.transform.split("(")[1].split(", ")[1].replace("px",""))

function moveBall(direction) {
  setTimeout(() => {
    const x = getXBall(), y = getYBall()
    const rotate = direction === '1' ? '0deg' : '0deg'
    const newX = direction === '1' ? x + separation/2 : x - separation/2
    document.getElementById("ball").style.transform = `translate(${newX}px, ${y+row/4}px) rotate(${rotate})`;
  }, 0)
  setTimeout(() => {
    const x = getXBall(), y = getYBall()
    const newX = direction === '1' ? x+peg/2 : x-peg/2
    const rotate = direction === '1' ? '180deg' : '-180deg'
    document.getElementById("ball").style.transform = `translate(${newX}px, ${y+row/4}px) rotate(${rotate})`;
    }, 100)
  setTimeout(() => {
    const x = getXBall(), y = getYBall()
    const rotate = direction === '1' ? '360deg' : '-360deg'
    document.getElementById("ball").style.transform = `translate(${x}px, ${y+row/2}px) rotate(${rotate})`;
   }, 175)
}
function fallToBuscket(onBuscket) {
  const x = getXBall(), y = getYBall()
  document.getElementById("ball").style.transform = `translate(${x}px, ${y+34}px) rotate(0)`;
  setTimeout(() => onBuscket(), 150)

}
