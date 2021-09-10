import styles from './styles.module.scss';
import _ from 'lodash';
import { useState } from 'react';
import classNames from 'classnames';
import highlightBg from '../../data/backgrounds/highlight-modal-button.svg';

const EmailNotifications = ({ close: closeDrawer }) => {
  const options = {
    1: 'One of my trades has been resolved',
    2: 'One of my trades has been resolved',
    3: 'One of my trades has been resolved',
  };

  const [selectedOption, setSelectedOption] = useState(1);

  const handleSave = () => {
    //To do: api connection
    closeDrawer();
  };

  return (
    <div className={styles.emailNotificationContainer}>
      <h2 className={styles.title}>Inform Me Via Email When?</h2>
      <div className={styles.optionContainer}>
        {Object.keys(options).map(key => {
          return (
            <div
              className={classNames(
                styles.option,
                selectedOption == key && styles.selected
              )}
              key={key}
              onClick={() => setSelectedOption(key)}
            >
              <div className={styles.optionIcon}>
                <div className={styles.optionIconCore}></div>
              </div>
              <div className={styles.optionText}>{options[key]}</div>
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
