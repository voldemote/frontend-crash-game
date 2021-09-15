import styles from './styles.module.scss';
import { CURRENCIES } from '../../constants/Currency';
import { useState } from 'react';
import highlightBg from '../../data/backgrounds/highlight-modal-button.svg';
import Dropdown from '../Dropdown';
import { AuthenticationActions } from 'store/actions/authentication';
import { connect, useSelector } from 'react-redux';
import { selectUser } from 'store/selectors/authentication';

const Preferences = ({ close: closeDrawer, updateUser }) => {
  const { currency } = useSelector(selectUser);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const save = () => {
    if (currency !== selectedCurrency) {
      updateUser({
        currency: selectedCurrency,
      });
    }
    closeDrawer();
  };

  return (
    <div className={styles.preferences}>
      <div className={styles.item}>
        <h3 className={styles.label}>Currency</h3>
        <Dropdown
          value={selectedCurrency}
          placeholder="Select currency..."
          setValue={setSelectedCurrency}
          options={CURRENCIES}
        />
      </div>

      <div className={styles.btnContainer} onClick={save}>
        <img src={highlightBg} />
        <span>Save</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: preferences => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData({
          user: { preferences },
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(Preferences);
