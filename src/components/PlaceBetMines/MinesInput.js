import styles from "./styles.module.scss";
import classNames from "classnames";
import Input from "../Input";

export const MinesInput = ({mines, setMines, game}) => {
  return(
    <div className={classNames(styles.inputContainer)}>
      <div
        className={classNames(
          styles.cashedOutInputContainer,
          styles.demoInput,
          styles.selectMines
        )}
      >
        <Input
          className={classNames(styles.input)}
          type={'number'}
          value={mines}
          onChange={(e) => {
            if(e.target.value < 25 && e.target.value > 0) {
              setMines(Math.floor(e.target.value))
            } else {
              setMines(1)
            }
          }}
          step={1}
          min={1}
          max={24}
        />
        <span className={styles.eventTokenLabel}>
          <span>Mines</span>
        </span>
        <div className={styles.buttonWrapper}>
          <span
            className={classNames(styles.buttonItem, styles.noselect)}
            onClick={() => mines > 1 && setMines(mines - 1)}
          >
            -
          </span>
          <span
            className={classNames(styles.buttonItem, styles.noselect)}
            onClick={() => mines < 24 && setMines(mines + 1)}
          >
            +
          </span>
          <span
            className={classNames(styles.buttonItem, styles.noselect)}
            onClick={() => setMines(24)}
          >24</span>
        </div>
      </div>
    </div>
  )
}
