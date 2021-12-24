import classNames from 'classnames';
import styles from './styles.module.scss';
import useBonusCounter from 'hooks/useBonusCounter';


const LimitedOfferBanner = ({className}) => {
  const count = useBonusCounter();
  
  return (
    <div className={classNames(styles.bannerWrapper, className)}>
      <p>Limited offer!</p>
      {count != null ? <span>{count} of 1000 Available</span> : null}
    </div>
  );
};

export default LimitedOfferBanner;
