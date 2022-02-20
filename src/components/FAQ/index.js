import styles from './styles.module.scss';
import classNames from 'classnames';
import FAQItem from './FAQItem';

const FAQ = ({className}) => {

  return (
    <div className={classNames(styles.container, className)}>
      <h2>FAQ</h2>
      <div className={styles.faqContainer}>
        
        <FAQItem title="What is WALLFAIR Play?" answer="The WALLFAIR Play platform is a play-money platform which serves as a showcase of the upcoming real money platform" />
        <FAQItem title="What is PFAIR?" answer="PFAIR is the play-money token that powers the WALLFAIR Play Platform. You can claim 100 free play-money tokens once a day to bet on fun events and play our house games." />
        <FAQItem title="What is the WFAIR Token?" answer="WFAIR is the native token that powers the Wallfair ecosystem by serving as a multifunctional digital currency for speculation, governance, staking, gaming and 3rd party specialized use-cases." />
        <FAQItem title="How can I buy WFAIR?" answer="WFAIR is available on Ethereum and Polygon networks. You can buy WFAIR from a CEX like <a href='https://www.bitmart.com/trade/en?layout=basic&amp;symbol=WFAIR_USDT' target='_blank' rel='noreferrer'>Bitmart</a>. You have the possibility of swapping your current crypto on <a href='https://app.uniswap.org/#/swap?chain=mainnet&amp;outputCurrency=0xC6065B9fc8171Ad3D29bad510709249681758972' target='_blank' rel='noreferrer'>Uniswap</a> or <a href='https://quickswap.exchange/#/swap?outputCurrency=0xb6B5CDF74606181a1b05bfC0B9F17fC2A64B0cD5' target='_blank' rel='noreferrer'>Quickswap</a>." />
        <FAQItem title="Why should I buy WFAIR?" answer="WFAIR token holders will have the possibility of investing early in WALLFAIR and later have an active role on the upcoming DAO and other advantages. Stay tunned! You can see WALLFAIR roadmap on <a href='https://wallfair.io' target='_blank' rel='noreferrer'>wallfair.io</a>" />
        <FAQItem align="left" title="What's the WFAIR token address?" answer="WFAIR token address on Ethereum: <a href='https://etherscan.io/token/0xC6065B9fc8171Ad3D29bad510709249681758972'>0xC6065B9fc8171Ad3D29bad510709249681758972</a><br/>WFAIR token address on Polygon network: <a href='https://polygonscan.com/token/0xb6B5CDF74606181a1b05bfC0B9F17fC2A64B0cD5'>0xb6B5CDF74606181a1b05bfC0B9F17fC2A64B0cD5</a>" />

      </div>
    </div>
  );
};

export default FAQ;