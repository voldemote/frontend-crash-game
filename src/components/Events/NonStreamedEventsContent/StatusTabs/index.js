import _ from 'lodash';
import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import styles from './styles.module.scss';
import { PopupActions } from 'store/actions/popup';
import classNames from 'classnames';

import { EventActions } from '../../../../store/actions/event';
import SuggestEventButton from 'components/Events/SuggestEventButton';

const TABS = {
  current: 'current',
  past: 'past',
};

const StatusTabs = ({ onSelect = () => {}, preselected = TABS.current }) => {
  const [activeTab, setActiveTab] = useState(preselected);

  const setSelection = selection => {
    setActiveTab(selection);
    onSelect(selection);
  };

  const tabLabels = {
    [TABS.current]: 'Current Events',
    [TABS.past]: 'Past Events',
  };

  return (
    <div className={styles.statusPicker}>
      {Object.keys(TABS).map(tabName => (
        <button
          type="button"
          className={classNames(
            styles.tabButton,
            activeTab === tabName && styles.tabButtonActive
          )}
          onClick={() => setSelection(tabName)}
        >
          {tabLabels[tabName]}
        </button>
      ))}
      <SuggestEventButton externalClassNames={[styles.suggestEventButton]} />
    </div>
  );
};

export default StatusTabs;
