import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import styles from './styles.module.scss';

import Button from "../../components/Button";
import ButtonTheme from '../../components/Button/ButtonTheme';
import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { PopupActions } from "store/actions/popup";
import authState from "constants/AuthState";

import AffiliatesFAQ from "components/FAQ/AffiliatesFAQ";
import { ReactComponent as PaymentMethodIcon } from '../../data/icons/payment-methods.svg';
import { Input } from "components/Form";
import Dropdown from "components/Dropdown";
import { RECAPTCHA_KEY } from "constants/Api";
import { AlertActions } from "store/actions/alert";
import { sendMail } from "api";
import { numberWithCommas } from "utils/common";

const CONTACTTYPE = ['Telegram', 'WhatsApp', 'E-Mail'];

const Affiliates = ({loggedIn, showPopup}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false); 
  const [mailSent, setMailSent] = useState(false);
  const [contactField1, setContactField1] = useState(''); 
  const [contactField2, setContactField2] = useState(''); 
  const [amount, setAmount] = useState(1500); 
  const [total, setTotal] = useState(7500); 
  const [percent, setPercent] = useState(20); 

  const handleReCaptchaVerify = () => {
    return new Promise((resolve, _) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(RECAPTCHA_KEY, { action: 'join' })
          .then(token => {
            resolve(token);
          })
      });
    });
  };

  const selectPerc = (value) => {
    if (value < 1500) {
      return 15;
    } else if (value >= 1500 && value < 3500) {
      return 20;
    } else if (value >= 3500 && value < 8000) {
      return 25;
    } else if (value >= 8000) {
      return 30;
    }
  }

  useEffect(() => {
    if(amount >= 0) {
      const perc = selectPerc(amount)
      setTotal(amount * (100/perc));
      setPercent(perc);
    }    
  }, [amount]);

  const submitForm = useCallback(async () => {
    const recaptchaToken = await handleReCaptchaVerify();
    if (!recaptchaToken) {
      console.log('recaptcha failed!');
      dispatch(AlertActions.showError('Recaptcha verification failed! Please try again!'));
      return;
    }

    const result = await sendMail(
      { 
        subject: `Request - Affiliate Contact`,
        text: `Request - Affiliate Contact - via ${contactField1}: ${contactField2}`, 
        recaptchaToken
    });

    if (result?.response?.data?.status === 'error') {
      console.error(result.response.data.message);

      dispatch(AlertActions.showError({ message: result.response.data.message }));
      return;
    }
    
    setMailSent(true);
  }, [dispatch, contactField1, contactField2]); 

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.affiliates}>
        <h2>THE WALLFAIR AFFILIATE PROGRAM</h2>
        <h1 className={styles.headline}>
          REFER PEOPLE TO WALLFAIR AND <span>MAKE MONEY!</span>
        </h1>

        <div className={styles.container}>

          <div className={styles.calculatorContainer}>
            {!showForm ?
              <div className={styles.contentWrapper}>
                <span className={styles.calculatorTitle}>I WANT TO EARN MONTHLY</span>
                <div className={styles.calculatorValue}>
                  <Input className={styles.inputAmount} type="number" onChange={setAmount} value={amount} />
                   <span className={styles.calculatorCurrency}>USD</span></div>


                <div className={styles.calcResult}>
                  <div className={styles.summaryItem}><span className={styles.label}>Casino Profit Required</span><span className={styles.value}>{numberWithCommas(Math.floor(total))} USD</span></div>
                  <div className={styles.summaryItem}><span className={styles.label}>Commission Plan</span><span className={styles.value}>{percent}%</span></div>
                </div>

                <Button theme={ButtonTheme.primaryButtonM} className={styles.startButton} onClick={() => setShowForm(true)}>
                  Start earning
                </Button>

                <PaymentMethodIcon className={styles.paymentMethods} />
              </div>
            :
              <div className={styles.contentWrapper}>
                {!mailSent ?
                  <>
                    <span className={styles.calculatorTitle}>TELL US HOW TO CONTACT YOU</span>
                    <Dropdown
                      value={contactField1}
                      placeholder="How to contact you..."
                      setValue={setContactField1}
                      options={CONTACTTYPE}
                      className={styles.dropdown}
                      placeholderClassName={styles.dropdownPlaceholder}
                    />
                    <Input className={styles.userPhoneInput} placeholder={'Enter username or phone number...'} onChange={setContactField2} value={contactField2} />
                    
                    <Button 
                      disabled={contactField1.length === 0 || contactField2.length === 0}
                      theme={ButtonTheme.primaryButtonM} className={styles.startButton} onClick={submitForm}>
                      Send
                    </Button>
                  </>
                :
                  <span className={styles.calculatorTitle}>Request sent! We'll contact you soon!</span>
                }

              </div>
            }
          </div>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <span className={styles.icon}>✅</span>
              <span className={styles.title}>JOIN</span>
              <span className={styles.description}>Join for free and get a dedicated account manager to help you.</span>
            </div>
            <div className={styles.step}>
              <span className={styles.icon}>🎮</span>
              <span className={styles.title}>ADVERTISE</span>
              <span className={styles.description}>Refer players to Wallfair on which you get up to 30% profit lifetime.</span>
            </div>
            <div className={styles.step}>
              <span className={styles.icon}>💰</span>
              <span className={styles.title}>MAKE MONEY</span>
              <span className={styles.description}>Get paid every month with no negative carry over.</span>
            </div>
          </div>

          <div className={styles.commissionContainer}>
            <h1>Commision Plan <span>per month</span></h1>
            <span className={styles.commissionDescription}>Based on casino profit your players generate per month</span>

            <div className={styles.commissionsList}>
              <div className={styles.commission}>
                <span className={styles.percentage}>15%</span>
                <span className={styles.condition}>&lt; $5,000</span>
              </div>
                <div className={styles.commission}>
                  <span className={styles.percentage}>20%</span>
                  <span className={styles.condition}>$5,000 to $10,000</span>
                </div>
                <div className={styles.commission}>
                  <span className={styles.percentage}>25%</span>
                  <span className={styles.condition}>$10,000 to $20,000</span>
                </div>
                <div className={styles.commission}>
                  <span className={styles.percentage}>30%</span>
                  <span className={styles.condition}>&gt; $20,000</span>
                </div>
              
            </div>

            <Button 
              theme={ButtonTheme.primaryButtonXL} 
              className={styles.earnButton} 
              onClick={() => {
                setShowForm(true);
                window.scrollTo(0, 0);
              }}
            >
              Start earning
            </Button>
          </div>

          <div className={styles.aboutContainer}>
            {/* <img src={''} alt='' /> */}
            <div className={styles.content}>
              {/* <span>WALLFAIR.IO</span> */}
              <h2>About wallfair.io</h2>
              <p>Wallfair is the entertainment platform for tomorrow available today. We offer licensed crypto gambling with a large number of coins and currencies and exclusive deals for our affiliates: If you decide to join, up to 30% of all deposits will be yours right after your fans and followers have placed their bets. These conditions are unprecedented and we offer them to you on a permanent basis.</p>
            </div>
          </div>

          {/* <div className={styles.statsContainer}>
            <div className={styles.statsDetail}>
              <svg className={styles.statsIcon}></svg>
              <div className={styles.statsBox}>
                <span className={styles.statsTitle}>10 MINUTES</span>
                <span className={styles.statsDescription}>Average Cashout time</span>
              </div>
            </div>

            <div className={styles.statsDetail}>
              <svg className={styles.statsIcon}></svg>
              <div className={styles.statsBox}>
                <span className={styles.statsTitle}>24/7</span>
                <span className={styles.statsDescription}>Live Chat Support</span>
              </div>
            </div>

            <div className={styles.statsDetail}>
              <svg className={styles.statsIcon}></svg>
              <div className={styles.statsBox}>
                <span className={styles.statsTitle}>3,200+</span>
                <span className={styles.statsDescription}>Casino Games</span>
              </div>
            </div>

            <div className={styles.statsDetail}>
              <svg className={styles.statsIcon}></svg>
              <div className={styles.statsBox}>
                <span className={styles.statsTitle}>1,000+</span>
                <span className={styles.statsDescription}>Registered Players</span>
              </div>
            </div>
          </div> */}

        <div className={styles.info}>

          <div className={styles.infoItem}>
            <h4>Product</h4>
            <p>We offer the most insane crypto gambling opportunity with over 3000 games available.</p>
          </div>

          <div className={styles.infoItem}>
            <h4>Deposit</h4>
            <p>It pays off to attract deposits to the platform. Up to 30% of the deposits goes straight to you.</p>
          </div>

          <div className={styles.infoItem}>
            <h4>Restricted Countries</h4>
            <p>Australia, Aruba, Bonaire, Curacao, France, Netherlands, Spain, Saint Marteen (Dutch area), United Kingdom, United States.</p>
          </div>

          <div className={styles.infoItem}>
            <h4>Currencies</h4>
            <p>We enable deposits in WFAIR, BTC, ETH, MATIC, LTC, USDC, USDT, DAI, XRP. In case there is a token or currency you are missing from this list, please let us know, we would love to hear from you.</p>
          </div>

        </div>

          <AffiliatesFAQ />
          
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    loggedIn: state.authentication.authState === authState.LOGGED_IN,
    userId: state.authentication.userId,
  }
}

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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Affiliates);