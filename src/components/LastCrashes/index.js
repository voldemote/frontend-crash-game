import styles from './styles.module.scss';

const LastCrashes = ({ lastCrashes }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Last Crashes</span>
      <div className={styles.crashes}>
        {lastCrashes.map(crash => (
          <span key={crash} className={styles.crash}>
            {crash.toFixed(2)}x
          </span>
        ))}
      </div>
    </div>
  );
};

export default LastCrashes;
