import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import moment from 'moment';
import { getSingleGameDetailById } from '../../api/casino-games';
import PopupTheme from '../Popup/PopupTheme';
import classNames from 'classnames';
import _ from "lodash";

import InputBox from '../InputBox';
import InputBoxTheme from '../InputBox/InputBoxTheme';

const roundToTwo = num => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

const SingleGameDetailPopup = ({ hidePopup, showPopup, data }) => {
  const { game, resData } = data;

  const matchDate = resData?.created_at;

  const date = matchDate
    ? moment(matchDate).format('HH:mm:ss | DD/MM/YYYY')
    : '---';

  const handleCrashFactorChange = async (gameHash, type) => {
    // const response = await getSingleGameDetailById(gameHash, gameTypeId, type).catch(err => {
    //   console.error('getGameDetailById err', err);
    // });
    // const resData = response?.data || null;
    //
    // console.log('resData', resData);

    console.log("get detail type", type);

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

  const profit = resData?.profit;
  const hashed = _.has(resData, 'hashedServerSeed');

  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo} />
      <div className={styles.title}>
        Game details
        <div
          className={styles.nextGame}
          onClick={() => {
            handleCrashFactorChange('HASH', 'next');
          }}
        >
          {'<'} Next
        </div>
        <div
          className={styles.prevGame}
          onClick={() => {
            handleCrashFactorChange('HASH', 'prev');
          }}
        >
          Prev {'>'}
        </div>
      </div>
      <div className={styles.separator}></div>
        <div className={styles.gameDate}>
            <span>{date}</span>
        </div>
      <div className={styles.content}>
        <div className={classNames("global-link-style", styles.verificationTool)}><a href={game?.verificationTool} target={"_blank"} rel="noreferrer"><b>{game?.name} - Verification Tool</b></a></div>
          <div>
              <b>Multiplier:</b>{' '}
              <span>{roundToTwo(resData?.crashFactor).toFixed(2)}</span>
          </div>
          <div>
              <b>Game Hash:</b>{' '}
              <span>{resData?.gameHash}</span>
          </div>
          <div>
              <b>Staked amount:</b>{' '}
              <span>{resData?.stakedAmount}</span>
          </div>
          <div>
              <b>Profit:</b>{' '}
              <span className={profit > 0 ? 'global-cashout-profit' : 'global-cashout-loss'}>{profit > 0 ? '+' + profit : profit}</span>
          </div>

          <div className={styles.copyInputBlock}>
              <label className={hashed && styles.disabled}>Server seed ({hashed ? "Hashed - please rotate your seeds pair to reveal it" : "Revealed"})</label>
              <InputBox
                  type={'text'}
                  value={hashed ? resData.hashedServerSeed : resData.serverSeed}
                  setValue={_.noop}
                  className={hashed && styles.disabled}
                  theme={InputBoxTheme.copyToClipboardInput}
                  onClick={(e, val) => {
                      // e.currentTarget.style.backgroundColor = '#c0f1c0';
                      // document.getSelection().removeAllRanges();
                  }}
              />
          </div>

          <div className={styles.copyInputBlock}>
              <label>Client seed</label>
              <InputBox
                  type={'text'}
                  value={resData.clientSeed}
                  setValue={_.noop}
                  theme={InputBoxTheme.copyToClipboardInput}
                  onClick={(e, val) => {}}
              />
          </div>

          <div className={styles.copyInputBlock}>
              <label>Game Nonce (Bet number using this pair)</label>
              <InputBox
                  type={'text'}
                  value={resData.nonce}
                  setValue={_.noop}
                  theme={InputBoxTheme.copyToClipboardInput}
                  onClick={(e, val) => {
                      // setCopied(true);
                      // e.currentTarget.style.backgroundColor = '#c0f1c0';
                      // document.getSelection().removeAllRanges();
                  }}
              />
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

export default connect(null, mapDispatchToProps)(SingleGameDetailPopup);
