import { memo } from 'react';
import {connect, useSelector} from 'react-redux';
import styles from './styles.module.scss';
import WfairTokenEmblem from '../../data/images/token/wfair_token_emblem.png';
import LogoFooter from '../../data/icons/wfair-logo-footer.svg';
import SmartsoftLogo from '../../data/icons/footer/smartsoft.png';
import EvoplayLogo from '../../data/icons/footer/evoplay.png';
import bitcoinLogo from '../../data/icons/footer/bitcoin-btc-logo.svg';
import ethereumLogo from '../../data/icons/footer/ethereum-eth-logo.svg';
import maticLogo from '../../data/icons/deposit/matic-logo.svg';
import litecoinLogo from '../../data/icons/footer/litecoin-ltc-logo.svg';
import metamaskLogo from '../../data/icons/footer/metamask-fox.svg';
import usdtLogo from '../../data/icons/footer/tether-usdt-logo.svg';
import usdcLogo from '../../data/icons/footer/usd-coin-usdc-logo.svg';
import daiLogo from '../../data/icons/footer/multi-collateral-dai-dai-logo.svg';
import xrpLogo from '../../data/icons/footer/xrp-xrp-logo.svg';
import mastercardLogo from '../../data/icons/footer/footer-mastercard.svg';
import visaLogo from '../../data/icons/footer/footer-visa.svg';
import applepayLogo from '../../data/icons/footer/footer-applepay.svg';
import googlepayLogo from '../../data/icons/footer/footer-googlepay.svg';
import handshakeIcon from '../../data/icons/footer/handshake-icon.png';
import fair100Icon from '../../data/icons/footer/100-fair-icon.png';
import responsibleGamingIcon from '../../data/icons/footer/responsible-gaming-icon.png';
import adultPlusIcon from '../../data/icons/footer/18-icon.png';
import trustPilotIcon from '../../data/icons/footer/trust_pilot_icon.png';
import { selectUser } from 'store/selectors/authentication';


import classNames from 'classnames';
import { LeaderboardActions } from 'store/actions/leaderboard';
import { useCallback } from 'react';
import { GeneralActions } from 'store/actions/general';
import { Link, Route } from 'react-router-dom';
import Routes from '../../constants/Routes';
import {selectPrices} from '../../store/selectors/info-channel';
import {roundToTwo} from "../../helper/FormatNumbers";
import RealMoneyOnly from 'components/RealMoneyOnly';
import PlayMoneyOnly from 'components/PlayMoneyOnly';
import { GAME_PROVIDERS } from 'constants/Games';

const ContentFooter = ({ className = '', disclaimerHidden, setOpenDrawer }) => {
  const openLeaderboard = useCallback(event => {
    window.scrollTo(0, 0);
    setOpenDrawer('leaderboard');
  }, []);

  const prices = useSelector(selectPrices);
  const { gamesCurrency } = useSelector(selectUser);

  const selectedGamesCurrencyPrice = roundToTwo(prices?.[gamesCurrency], 4) || '-';

  return (
    <div className={styles.container}>
      <div className={classNames(styles.footer, className)}>
        {/*<div className={styles.footerSeparator}></div>*/}
        <div className={styles.splittedBlock}>
          <div className={styles.links}>
            <div className={styles.linksGroup}>
              <Link
                data-tracking-id="footer-provablyfair"
                to={Routes.provablyfair}
              >
                <p>{'Provably Fair'}</p>
              </Link>
              <a
                href="https://wfair.io"
                target="_blank"
                rel="noreferrer"
                data-tracking-id="footer-source-code"
              >
                <p>About Us</p>
              </a>

              <a
                href="https://wallfair.medium.com"
                target="_blank"
                rel="noreferrer"
                data-tracking-id="footer-buy-wfair"
              >
                <p>Blog</p>
              </a>
            </div>

            <div className={styles.linksGroup}>
              <Link data-tracking-id="footer-terms" to={Routes.terms}>
                <p>{'Terms & Conditions'}</p>
              </Link>
              <Link data-tracking-id="footer-imprint" to={Routes.imprint}>
                <p>Imprint</p>
              </Link>

              <Link data-tracking-id="footer-privacy" to={Routes.privacy}>
                <p>Privacy Policy</p>
              </Link>
            </div>
            <RealMoneyOnly>
              <div className={styles.linksGroup}>
                {/* <Link
                  data-tracking-id="footer-kyc"
                  to={Routes.kyc}
                >
                  <p>{'KYC Policy'}</p>
                </Link> */}

                <Link
                  data-tracking-id="footer-responsible-gambling"
                  to={Routes.responsibleGambling}
                >
                  <p>{'Responsible Gambling'}</p>
                </Link>

                <Link data-tracking-id="footer-aml" to={Routes.aml}>
                  <p>{'AML Policy'}</p>
                </Link>

                <a
                  href="https://github.com/wallfair-organization"
                  target="_blank"
                  rel="noreferrer"
                  data-tracking-id="footer-source-code"
                >
                  <p>Source Code</p>
                </a>

                {/* <div id="lang-switcher" className={styles.langSwitcher}/> */}
              </div>
            </RealMoneyOnly>
          </div>

          {/* <RealMoneyOnly>
            <div className={styles.trustPilotBlock}>
              <div>
                <a href="https://www.trustpilot.com/review/wallfair.io" target="_blank" rel="noopener noreferrer"><img src={trustPilotIcon} className={styles.trustPilotIcon}/></a>
              </div>

              <div className={"trustpilot-widget"} data-locale="en-US" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="61bd1806444ad2deeadfba8a" data-style-height="24px" data-style-width="100%" data-theme="dark" data-min-review-count="10">
                <a href="https://www.trustpilot.com/review/wallfair.io" target="_blank" rel="noopener noreferrer">Trustpilot</a>
              </div>
            </div>
          </RealMoneyOnly> */}
        </div>

        <div className={styles.logosBlock}>
          <div className={styles.logosSeparator}></div>
          <RealMoneyOnly>
            <div className={styles.centeredBlock}>
              <div className={styles.logoContainer}>
                <span
                  className={styles.wfairTokenEmblem}
                >
                  <img
                    src={WfairTokenEmblem}
                    className={styles.footerLogo}
                    alt={'WFAIR Token emblem'}
                  />
                  <span>WFAIR</span>
                </span>

                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={bitcoinLogo} alt={'Bitcoin logo'} />{' '}
                  <span>Bitcoin</span>
                </span>

                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={ethereumLogo} alt={'Ethereum loco'} />{' '}
                  <span>Ethereum</span>
                </span>
                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={maticLogo} alt={'Matic logo'} />{' '}
                  <span>Matic</span>
                </span>
                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={litecoinLogo} alt={'Litecoin loco'} />{' '}
                  <span>Litecoin</span>
                </span>
                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={usdtLogo} alt={'USDT'} /> <span>USDT</span>
                </span>
                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={usdcLogo} alt={'Litecoin loco'} /> <span>USDC</span>
                </span>
                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={daiLogo} alt={'Litecoin loco'} /> <span>DAI</span>
                </span>
                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={xrpLogo} alt={'Litecoin loco'} /> <span>XRP</span>
                </span>
                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={metamaskLogo} alt={'Metamask'} />{' '}<span>MetaMask</span>
                </span>

                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={mastercardLogo} alt={'Mastercard Logo'} />{' '}<span>Mastercard</span>
                </span>

                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={visaLogo} alt={'Visa logo'} />{' '}<span>Visa</span>
                </span>

                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={applepayLogo} alt={'Apple Pay logo'} />{' '}<span>Apple Pay</span>
                </span>

                <span
                  className={styles.cryptoCoinWrapper}
                >
                  <img src={googlepayLogo} alt={'Google Pay logo'} />{' '}<span>Google Pay</span>
                </span>
                
              </div>
            </div>

            <div className={styles.logosSeparator}></div>

            <div className={styles.centeredBlock}>
              {/* <div className={styles.logoContainer}>
                <iframe className={styles.license} title="license" src="https://licensing.gaming-curacao.com/validator/?lh=58e4868441e3bb0ff2fe2230d82a8091&amp;template=seal" width={125} height={50} style={{border:'none'}} />
                <a href="https://www.smartsoftgaming.com/" rel="noreferrer" target="_blank"><img src={SmartsoftLogo} className={styles.partnerLogoSmartsoft} alt="smartsoft games logo" /></a>
                <a href="https://evoplay.games/" rel="noreferrer" target="_blank"><img src={EvoplayLogo} className={styles.partnerLogoEvoplay} alt="evoplay logo" /></a>
              </div> */}

              <div className={styles.logoContainer}>
                <a
                  href="https://www.trustpilot.com/review/wallfair.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={trustPilotIcon} className={styles.handshakeIcon} />
                </a>
                <iframe
                  className={styles.license}
                  title="license"
                  src="https://licensing.gaming-curacao.com/validator/?lh=58e4868441e3bb0ff2fe2230d82a8091&amp;template=seal"
                  width={125}
                  height={50}
                  style={{ border: 'none' }}
                />
                <Link
                  data-tracking-id="footer-provably-fair"
                  to={Routes.provablyfair}
                >
                  <img
                    src={handshakeIcon}
                    className={styles.handshakeIcon}
                    alt={'handshake icon'}
                  />
                </Link>

                <Link
                  data-tracking-id="footer-provably-fair"
                  to={Routes.provablyfair}
                >
                  <img
                    src={fair100Icon}
                    className={styles.footerGenericIcons}
                    alt={'fair 100 icon'}
                  />
                </Link>

                <Link
                  data-tracking-id="footer-responsible-gambling"
                  to={Routes.responsibleGambling}
                >
                  <img
                    src={responsibleGamingIcon}
                    className={styles.responsibleGamingIcon}
                    alt={'responsible gaming icon'}
                  />
                </Link>
                <Link
                  data-tracking-id="footer-18-plus"
                  to={{
                    pathname: Routes.terms,
                    hash: '#restricted',
                  }}
                >
                  <img
                    src={adultPlusIcon}
                    className={styles.footerGenericIcons}
                    alt={'adult plus icon'}
                  />
                </Link>
              </div>
            </div>
            <div className={styles.logosSeparator}></div>
            <div className={styles.providersList}>
              {GAME_PROVIDERS.map(
                (providerItem, index) =>
                  providerItem.value !== 'all' && (
                    <div key={index} className={styles.providerItem}>
                      <img
                        src={providerItem.image}
                        alt={`${providerItem.label} logo`}
                      />
                    </div>
                  )
              )}
            </div>
            <div className={styles.logosSeparator}></div>
          </RealMoneyOnly>
        </div>
      </div>

      <div className={styles.poweredBy}>
        <a
          href="https://wallfair.io/"
          target="_blank"
          rel="noreferrer"
          data-tracking-id="footer-wfair-logo"
        >
          <img
            src={LogoFooter}
            className={styles.footerLogo}
            alt={'Wallfair Logo'}
          />
        </a>
      </div>

      <div className={styles.copyrightBlock}>
        <div>© 2022 Wallfair N.V. | All rights reserved.</div>
        <RealMoneyOnly>
          <div>
            1 WFAIR = {selectedGamesCurrencyPrice} {gamesCurrency}
          </div>
        </RealMoneyOnly>
      </div>

      <RealMoneyOnly>
        <p className={styles.footerDisclaimer}>
          This website offers gaming with risk experience. To be a user of our
          site you must be over 18 y.o. We are not responsible for the violation
          of your local laws related to i-gaming. Play responsibly and have fun
          on Wallfair. The platform providing the services is owned by Wallfair
          N.V, a limited liability company registered in Curacao with company
          registration number 159041, with its registered office at
          Zuikertuintjeweg Z/N (Zuikertuin Tower), Curacao (“Company”), licensed
          in Curaçao under the Licence no. 365/JAZ Sub-License
          GLH-OCCHKTW0712022021 issued by Gaming Services Provider N.V. for the
          provision of online games of chance.
        </p>
      </RealMoneyOnly>

      <div className={styles.supportBlock}>
        <div>
          Support:{' '}
          <b>
            <a href="ma&#105;lt&#111;&#58;&#115;uppo&#114;t&#64;wallfair.io">
              &#115;uppo&#114;t&#64;wallfair.io
            </a>
          </b>{' '}
          | Partner:{' '}
          <b>
            <a href="&#109;ailto&#58;p%6&#49;%7&#50;tne&#114;s&#64;wallfair&#46;i&#111;">
              p&#97;r&#116;ners&#64;wallfair&#46;i&#111;
            </a>
          </b>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    disclaimerHidden: state.general.disclaimerHidden,
    leaderboardOpen: state.leaderboard.leaderboard.openDrawer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLeaderboardDrawer: open => {
      dispatch(LeaderboardActions.handleDrawer({ open }));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(ContentFooter);
export default memo(Connected);
