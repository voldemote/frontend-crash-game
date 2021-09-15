import styles from './styles.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import highlightBg from '../../data/backgrounds/highlight-modal-button.svg';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import { options as text } from './options';

const EmailNotifications = ({
  close: closeDrawer,
  updateNotificationSettings,
  settings = {
    newBetInEvent: false,
    newRewardReceived: false,
    myBetResolved: false,
    eventOnline: false,
    eventOffline: false,
    placeBet: false,
    cashoutBet: false,
  },
}) => {
  const [options, setOptions] = useState(settings);

  const handleSave = () => {
    updateNotificationSettings(options);
    closeDrawer();
  };

  return (
    <div className={styles.emailNotificationContainer}>
      <h2 className={styles.title}>Inform Me Via Email When?</h2>
      <div className={styles.optionContainer}>
        {Object.keys(options).map(key => {
          return (
            <div
              className={classNames(styles.option, styles.selected)}
              key={key}
              onClick={() => {
                const o = { ...options };
                o[key] = !o[key];
                setOptions(o);
              }}
            >
              {options[key] ? (
                <Icon iconTheme={IconTheme.notification} iconType="checked" />
              ) : (
                <div className={styles.box} />
              )}
              <div className={styles.optionText}>{text[key]}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.btnContainer} onClick={handleSave}>
        <img src={highlightBg} />
        <span>Save</span>
      </div>
    </div>
  );
};

export default EmailNotifications;
