import React from 'react'
import styles from './styles.module.scss'
import {ReactComponent as IceCreamSvg} from '../../data/icons/common-games/ice-cream.svg'
import { ReactComponent as BlueShipSvg } from '../../data/icons/common-games/blue-ship.svg';
import { ReactComponent as DiamonsSvg } from '../../data/icons/common-games/diamons.svg';
import { ReactComponent as YellowShipSvg } from '../../data/icons/common-games/yellow-ship.svg';
import { ReactComponent as StartSvg } from '../../data/icons/common-games/star.svg';
import { ReactComponent as PinkShipSvg } from '../../data/icons/common-games/pink-ship.svg';
import classNames from 'classnames';

const Card = ({ title, content, children, className}) => {
  return (
    <div className={classNames(styles.cardContainer, className)}>
      <h3>{title}</h3>
      <p>{content}</p>
      {children}
    </div>
  );
}

const GameContentCards = () => {
  return (
    <div className={styles.container}>
      <Card
        title="SOCIAL"
        content="It’s simple: Alpacas are social animals = Alpacasino is a social Betwork. Alpacas from all over the world meet to chat ..."
      >
        <IceCreamSvg className={styles.iceCream} />
        <BlueShipSvg className={styles.blueShip} />
      </Card>
      <Card
        className={styles.secondCard}
        title="FAIR"
        content="Alpacas are sometimes funny and misbehaving but always fair. We believe in a maximum of transparency ..."
      >
        <DiamonsSvg className={styles.diamons} />
        <YellowShipSvg className={styles.yellowShip} />
      </Card>
      <Card
        title="DECENTRAL"
        content="Alpacas are self governing animals. Wallfair is a combination of smart contracts running on decentralized Polygon blockchain ...."
      >
        <StartSvg className={styles.star} />
        <PinkShipSvg className={styles.pinkShip} />
      </Card>
    </div>
  );
}

export default GameContentCards
