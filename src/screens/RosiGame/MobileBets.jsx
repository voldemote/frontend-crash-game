import { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from 'components/TabPanel';
import GameBets from 'components/GameBets';
import PlaceBet from 'components/PlaceBet';
import Chat from 'components/Chat';
import { ROSI_GAME_EVENT_ID } from 'constants/RosiGame';
import { winners, inGameBets } from './fakeData';
import styles from './styles.module.scss';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';

const useTabsStyles = makeStyles({
  indicator: {
    backgroundColor: '#e2ff54',
  },
  container: {
    marginTop: '20px'
  }
});

const useTabStyles = makeStyles({
  root: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    opacity: 0.5,
    fontSize: '12px',
    '@media screen and (max-width: 768px)': {
      width: '25%',
    },
  },
  selected: {
    color: '#FFFFFF',
  },
  tabPanel: {
    marginTop: '20px'
  }
});

const MobileBets = () => {
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={tabsClasses.container}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        classes={{ indicator: tabsClasses.indicator }}
      >
        <Tab
          label="Trade"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
        <Tab
          label="Chat"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
        <Tab
          label="In Game Bets"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
        <Tab
          label="Cashed Out"
          disableRipple
          classes={{ root: tabClasses.root }}
        />
      </Tabs>
      <TabPanel value={selectedTab} index={0} className={tabClasses.tabPanel}>
        <PlaceBet />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} className={tabClasses.tabPanel}>
        <Chat 
          roomId={{ _id: ROSI_GAME_EVENT_ID }} 
          className={styles.chatContainer} 
          chatMessageType={ChatMessageType.game} 
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={2} className={tabClasses.tabPanel}>
        <GameBets
          label="In Game Bets"
          total="2.700,50"
          bets={inGameBets}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={3} className={tabClasses.tabPanel}>
        <GameBets
          label="Cashed Out"
          total="2.700,50"
          bets={winners}
          showCrashFactor
        />
      </TabPanel>
    </div>
  );
};

export default MobileBets;
