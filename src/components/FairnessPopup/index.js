import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import {connect} from 'react-redux';
import {PopupActions} from 'store/actions/popup';
import moment from 'moment';
import {GameApi} from '../../api/casino-games';
import PopupTheme from '../Popup/PopupTheme';
import classNames from 'classnames';
import React, {useState, useEffect} from "react";

import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';

import CryptoJS from 'crypto-js';

const roundToTwo = num => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

const getReadableAmount = amount => {
  const one = 10000;
  return roundToTwo(+amount / one);
};


const FairnessPopup = ({hidePopup, showPopup, data}) => {
  const {game, token} = data;
  const Api = new GameApi(game.url, token);

  const [newClientSeed, setNewClientSeed] = useState();
  const [activeSeeds, setActiveSeeds] = useState({});

  const generateNewClientSeed = () => {
    const randomClientSeed = CryptoJS.lib.WordArray.random(12).toString();
    setNewClientSeed(randomClientSeed);
  }

  const handleRotateSeeds = async () => {
    const response = await Api.updateCurrentFairnessByGame(game.id, {
      clientSeed: newClientSeed
    }).catch(err => {
      console.error('getGameDetailById err', err);
    });
    //const resData = response?.data || null;

    setActiveSeeds({
      clientSeed: newClientSeed,
      nonce: 0,
      hashedServerSeed: activeSeeds.hashedNextServerSeed,
      hashedNextServerSeed: ''
    });
  }

  useEffect(()=> {
    (async () => {
      const response = await Api.getCurrentFairnessByGame(game.id).catch(err => {
        console.error('getGameDetailById err', err);
      });
      const resData = response?.data || null;

      if(resData) {
        const {clientSeed, nonce, hashedServerSeed, hashedNextServerSeed} = resData;
        setActiveSeeds({
          clientSeed, nonce, hashedServerSeed, hashedNextServerSeed
        });
      }

      generateNewClientSeed();
    })().catch(err => {
      console.error('initialNotification error', err);
    });
  }, [])

  console.log('newClientSeed', newClientSeed);


  const handleCrashFactorChange = async (gameHash, type) => {
    // const response = await getGameDetailById(gameHash, gameTypeId, type).catch(err => {
    //   console.error('getGameDetailById err', err);
    // });
    // const details = response?.data || null;
    //
    // if (details.match) {
    //   showPopup(PopupTheme.lastGamesDetail, {
    //     maxWidth: true,
    //     data: {
    //       details,
    //     },
    //   });
    // } else {
    //   hidePopup();
    // }
  };

  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo}/>
      <div className={styles.title}>
        <Icon
          className={styles.balanceIcon}
          iconType={IconType.balanceScaleSolid}
          iconTheme={IconTheme.black}
          height={18}
          width={18}
        /> Fairness
      </div>
      <div className={styles.separator}></div>
      <div className={styles.content}>
        <div className={classNames("global-link-style", styles.verificationTool)}><a
          href={"https://jsfiddle.net/fx1dev/ezx8vp6a/show"} target={"_blank"} rel="noreferrer"><b>Single Game
          Verification Tool</b></a></div>


        <div className={classNames(styles.seedsCurrentForm)}>
          <div>
            <label>
              Active Client Seed
            </label>
            <input
              className={styles.profileInput}
              value={activeSeeds.clientSeed}
              disabled={true}
              // onChange={''}
            />
          </div>

          <div>
            <label>
              Active Server Seed (Hashed SHA-256)
            </label>
            <input
              className={styles.profileInput}
              value={activeSeeds.hashedServerSeed}
              disabled={true}
              // onChange={''}
            />
          </div>

          <div>
            <label>
              Bets made with pair
            </label>
            <input
              className={styles.profileInput}
              value={activeSeeds.nonce}
              disabled={true}
            />
          </div>
        </div>

        <h3 className={classNames(styles.seedsRotateTitle)}>Rotate seed pair</h3>

        <div className={classNames(styles.seedsRotateForm)}>
          <div>
            <label>
              New Client Seed
            </label>
            <input
              className={styles.profileInput}
              value={newClientSeed}
              onChange={(e)=> setNewClientSeed(e.target.value)}
            />
          </div>

          <div>
            <label>
              Next Server Seed (Hashed SHA-256)
            </label>
            <input
              className={styles.profileInput}
              value={activeSeeds.hashedNextServerSeed}
              disabled={true}
            />
          </div>

          <div
            role="button"
            tabIndex="0"
            className={classNames(styles.button)}
            onClick={handleRotateSeeds}
          >
          Rotate
        </div>

        </div>

        <div>
        </div>

      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(FairnessPopup);
