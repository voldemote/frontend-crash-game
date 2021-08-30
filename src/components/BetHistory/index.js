import { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from 'components/TabPanel';
import Chat from 'components/Chat';
import { ReactComponent as UserAvatarIcon } from 'data/icons/user.svg';
import useBreakpoint from 'hooks/useBreakpoint';
import { lastCrashes, inGameBets } from './fakeData';
import styles from './BetHistory.module.scss';
import { TOKEN_NAME } from '../../constants/Token';

const useTabsStyles = makeStyles({
  indicator: {
    backgroundColor: '#e2ff54',
  },
});

const useTabStyles = makeStyles({
  root: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    opacity: 0.5,
    '@media screen and (max-width: 768px)': {
      width: '33.33%',
    },
    '@media screen and (min-width: 786px)': {
      width: '50%',
    },
  },
  selected: {
    color: '#FFFFFF',
  },
});

const BetHistory = () => {
  const breakpoint = useBreakpoint();
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={styles.container}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        classes={{ indicator: tabsClasses.indicator }}
      >
        <Tab
          label="Last crashes"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
        <Tab
          label="In game bets"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
        {breakpoint > 'sm' && (
          <Tab label="Chat" disableRipple classes={{ root: tabClasses.root }} />
        )}
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <div className={styles.lastCrashes}>
          {lastCrashes.map(crash => (
            <div key={crash.id} className={styles.lastCrash}>
              <span>Last Crash @</span>
              <span>{crash.value}</span>
            </div>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <div className={styles.inGameBets}>
          <div className={styles.totalContainer}>
            <div className={styles.label}>In Total</div>
            <div className={styles.total}>{TOKEN_NAME}&nbsp;2.700,50</div>
          </div>
          <div className={styles.bets}>
            {inGameBets.map(bet => (
              <div key={bet.username} className={styles.inGameBet}>
                <div className={styles.user}>
                  <UserAvatarIcon />
                  {bet.username}
                </div>
                <span>{TOKEN_NAME} {bet.tokens}</span>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
      {breakpoint > 'sm' && (
        <TabPanel value={selectedTab} index={2}>
          <Chat
            className={styles.chatContainer}
            inputClassName={styles.chatInput}
          />
        </TabPanel>
      )}
    </div>
  );
};

export default BetHistory;
