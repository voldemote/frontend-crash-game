import styles from './styles.module.scss';
import classNames from 'classnames';
import Input from '../Input';


export const RiskInput = ({risk, setRisk, number}) => {
  return(
    <div className={styles.inputContainer}>
      <label
        className={styles.label}
      >
        Choose Risk Level
      </label>
      <div className={styles.riskSelection}>
        {Array.from({length: number}).map((level, index) =>
          <button
            data-tracking-id={`alpacawheel-change-risk-${index+1}`}
            style={{ background: risk === (index+1) && 'rgba(128, 128, 128, 0.14)' }}
            onClick={() => setRisk(index+1)}
          >
            {index+1}
          </button>
        )}
      </div>
    </div>
  )
}

export const NgamesInput = ({ngame, setNgame, game, text}) => {
  return(
    <div className={styles.inputContainer}>
      <label
        className={styles.label}
      >
        {text}
      </label>
      <div
        className={classNames(
          styles.cashedOutInputContainer,
          styles.demoInput
        )}
      >
        <Input
          className={classNames(styles.input)}
          type={'number'}
          value={ngame}
          onChange={(e) => setNgame(Math.floor(e.target.value))}
          step={1}
          min="1"
          max={'100'}
        />
        <span className={styles.eventTokenLabel}>
          <span>Spins</span>
        </span>
        <div className={styles.buttonWrapper}>
          <span
            className={styles.buttonItem}
            data-tracking-id="alpacawheel-change-spins-minus"
            onClick={() => ngame > 0 && setNgame(ngame - 1)}
          >
            -
          </span>
          <span
            className={styles.buttonItem}
            data-tracking-id="alpacawheel-change-spins-plus"
            onClick={() => ngame < 100 && setNgame(ngame + 1)}
          >
            +
          </span>
          <span
            className={styles.buttonItem}
            data-tracking-id="alpacawheel-change-spins-max"
            onClick={() => setNgame(10)}
          >
            10
          </span>
        </div>
      </div>
      {game.ngame > 0 &&
        <div className={styles.spinsleft}>
          {game.ngame} spins left
        </div>
      }
    </div>
  )
}

export const StandardInput = ({setValue, value, title}) => {
  return(
    <div className={styles.inputContainer}>
      <label
        className={styles.label}
      >
        {title}
      </label>
      <div
        className={classNames(
          styles.cashedOutInputContainer,
          styles.demoInput
        )}
      >
        <Input
          className={styles.input}
          type={'number'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          step={1}
          min="1"
          max={'100'}
        />
        <span className={styles.eventTokenLabel}>
          <span>PFAIR</span>
        </span>
      </div>
    </div>
  )
}

export const ToggleInput = ({setValue, value, setToggle, toggle, title}) => {
  return(
    <div className={styles.inputContainer}>
      <label
        className={classNames(
          styles.label,
        )}
      >
        {title}
      </label>
      <div
        className={classNames(
          styles.cashedOutInputContainer,
          styles.demoInput
        )}
      >
        <div className={styles.toggleButton}>
          <span className={styles.toggleLabel} style={{ color: toggle?'white':'#120e27', marginLeft: toggle?4:53, width: toggle?53:65}}></span>
          <span
            className={styles.buttonItem}
            style={{fontWeight: toggle?'bold':'normal', color: toggle?'black':'white'}}
            onClick={() => setToggle(true)}
          >
            Reset
          </span>
          <span
            className={styles.buttonItem}
            style={{fontWeight: !toggle?'bold':'normal', color: !toggle?'black':'white'}}
            onClick={() => setToggle(false)}
          >
            Increase
          </span>
        </div>
        <Input
          className={classNames(styles.input)}
          type={'number'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          step={1}
          min="0"
          max={'100'}
        />
        <span className={styles.eventTokenLabel}>
          <span>%</span>
        </span>
      </div>
    </div>
  )
}
