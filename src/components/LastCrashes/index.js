import styles from './styles.module.scss';

const LastCrashes = ({ lastCrashes }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Last Crashes</span>
      <div className={styles.crashes}>
        <div className={styles.overlay}></div>
        {lastCrashes.map((crash, i) => (
          /* Crash factors are not guaranteed to be unique, so create a unique key - crash + index */
          <span key={`${crash}${i}`} className={styles.crash}>
            {crash.toFixed(2)}x
          </span>
        ))}
      </div>
    </div>
  );
};

export default LastCrashes;
