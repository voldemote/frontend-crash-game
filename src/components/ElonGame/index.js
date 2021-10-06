import React from 'react';

import styles from './styles.module.scss';
import RosiImg from '../../data/backgrounds/games/rosi-games-banner.png';
import { ELON_GAME_STEPS } from 'constants/ElonGame';
import Routes from 'constants/Routes';
import { Link } from 'react-router-dom';

const ElonGame = props => {
  return (
    <div className={styles.elonGameWrapper}>
      <div className={styles.headerTitle}>
        Elon Game <span className={styles.howItWorks}> How does it work?</span>
      </div>
      <div className={styles.elonGameContainer}>
        <div className={styles.leftColumn}>
          <img src={RosiImg} alt="elon" />
          <div className={styles.buttonWrapper}>
            <Link to={Routes.rosiGame}>
              <button className={styles.button}>Play now</button>
            </Link>
          </div>
        </div>

        <div className={styles.rightColumn}>
          {ELON_GAME_STEPS.map(step => (
            <div className={styles.stepContainer} key={step.number}>
              <div className={styles.numberStep}>{step.number}</div>
              <div
                className={styles.textContainer}
                style={{ marginLeft: step.marginLeftText }}
              >
                <div className={styles.title}>{step.title}</div>
                <div className={styles.description}>{step.description}</div>
              </div>
              <div
                className={styles.imageContainer}
                style={{ marginLeft: step.marginLeftImage }}
              >
                {step.svg}
                {/* <img src={step.image} /> */}
                {step.imageText && (
                  <div className={styles.imageText}>{step.imageText}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElonGame;
