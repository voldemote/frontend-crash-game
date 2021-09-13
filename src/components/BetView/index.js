// @TODO: this component is WAY TOO BIG IMO, hard to read for new devs and the state logic is very complex,
// would be good to refactor this and break it down in smaller components
import _ from 'lodash';
import Button from '../Button';
import ChoiceSelector from '../ChoiceSelector';
import classNames from 'classnames';
import HighlightTheme from '../Highlight/HighlightTheme';
import HighlightType from '../../components/Highlight/HighlightType';
import moment from 'moment';
import { useCallback } from 'react';
import SleepHelper from '../../helper/Sleep';
import styles from './styles.module.scss';
// import SwitchableContainer from '../SwitchableContainer';
// import SwitchableHelper from '../../helper/SwitchableHelper';
import TimeLeftCounter from '../../components/TimeLeftCounter';
import TokenNumberInput from '../TokenNumberInput';
import { BetActions } from '../../store/actions/bet';
import { connect, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHasMounted } from '../hoc/useHasMounted';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ChoiceSelectorList from '../ChoiceSelectorList';
import Icon from '../Icon';
import LoadingAnimation from '../../data/animations/sending-transaction.gif';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
// import StateBadge from '../StateBadge';
import SummaryRowContainer from '../SummaryRowContainer';
import BetSummaryHelper from '../../helper/BetSummary';
import BetState from '../../constants/BetState';
import BetShareContainer from '../BetShareContainer';
import ShareType from '../BetCard/ShareType';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import ErrorHint from '../ErrorHint';
import { formatToFixed } from '../../helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';
import { GeneralActions } from 'store/actions/general';

const BetView = ({
  betId,
  eventId,
  openBets,
  actionIsInProgress,
  closed,
  isPopup = false,
  forceSellView,
  disableSwitcher = false,
  showEventEnd,
  balance,
  wfairValue,
  events,
  rawOutcomes,
  rawSellOutcomes,
  choice,
  commitment,
  setChoice,
  setCommitment,
  placeBet,
  pullOutBet,
  showPopup,
  isTradeViewPopup,
  handleChartDirectionFilter,
  setOpenDrawer,
  fetchSellOutcomes,
}) => {
  const maxBetAmount = 2800;
  const defaultBetValue = _.min([balance, maxBetAmount * 0.1]);
  const event = _.find(events, {
    _id: eventId,
  });
  const bet = _.find(_.get(event, 'bets', []), {
    _id: betId,
  });
  const state = _.get(bet, 'status');
  const outcomes = _.get(rawOutcomes, betId, []);
  const sellOutcomes = _.get(rawSellOutcomes, betId, []);

  const [currentTradeView, setCurrentTradeView] = useState(
    forceSellView ? 1 : 0
  );
  const [validInput, setValidInput] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [commitmentErrorText, setCommitmentErrorText] = useState('');
  const [tokenNumber, setTokenNumber] = useState(commitment);
  const [menuOpened, setMenuOpened] = useState(false);
  const [openBetsRef, setOpenBetsRef] = useState(openBets);
  const [showAllEvidence, setShowAllEvidence] = useState(false);
  const hasMounted = useHasMounted();

  const userLoggedIn = useSelector(
    state => state.authentication.authState === 'LOGGED_IN'
  );
  const validateInput = () => {
    const betEndDate = _.get(bet, 'endDate');
    const current = moment(new Date());
    const isSell = hasSellView();
    let valid = true;

    if (current.isAfter(betEndDate)) {
      // TODO valid = false;
    }

    if (choice === null) {
      valid = false;
    }

    if (!commitment && !isSell) {
      valid = false;
    }

    if (
      userLoggedIn &&
      _.toNumber(commitment) > _.toNumber(balance) &&
      !isSell
    ) {
      valid = false;

      setCommitmentErrorText('Not enough balance.');
    } else if (!userLoggedIn) {
      valid = false;
      setCommitmentErrorText('Sign in to start trading.');
    } else {
      setCommitmentErrorText('');
    }

    setValidInput(valid);

    return valid;
  };

  async function loadAfterMount() {
    await SleepHelper.sleep(100);

    setCommitment(defaultBetValue, betId);
    openBets.map(openBet => {
      fetchSellOutcomes(openBet.outcomeAmount, openBet.betId);
    });
  }

  useEffect(
    () => {
      if (hasMounted) {
        setCurrentTradeView(forceSellView ? 1 : 0);

        loadAfterMount();
      }
    },
    // @TODO: this possibly needs refactoring and or adding remaining deps,
    // the functions that do not depend on state or props should move out of the component.
    // for the other functions useCallback() would make sense to prevent unnecessary rerenders
    [hasMounted, closed]
  );

  useEffect(
    () => {
      if (!closed) {
        validateInput();
      }
    },
    // @TODO: this possibly needs refactoring and or adding remaining deps
    [choice, commitment, currentTradeView]
  );

  useEffect(() => {
    setShowLoadingAnimation(actionIsInProgress);

    if (!actionIsInProgress) {
      setChoice(null);
    }
  }, [actionIsInProgress]);

  useEffect(() => {
    if (JSON.stringify(openBets) != JSON.stringify(openBetsRef)) {
      openBets.map(openBet => {
        fetchSellOutcomes(openBet.outcomeAmount, openBet.betId);
      });
    }
    setOpenBetsRef(openBets);
  }, [openBets]);

  const hasSellView = () => {
    return (currentTradeView === 1 || forceSellView) && _.size(openBets);
  };

  const getFinalOutcome = () => {
    const finalOutcome = _.get(bet, 'finalOutcome', false);

    return finalOutcome;
  };

  const onTradeButtonConfirm = () => {
    const validInput = validateInput();

    if (validInput) {
      placeBet(betId, commitment, choice);
    }
  };

  const sellBet = () => {
    pullOutBet(betId, choice, getOpenBetsValue(choice));
  };

  const onChoiceSelect = (id, enabled) => {
    return () => {
      if (enabled) {
        setChoice(id);
      }
    };
  };

  useEffect(() => setTokenNumber(commitment), [commitment]);

  const debouncedSetCommitment = useCallback(
    _.debounce(number => setCommitment(number, betId), 200),
    []
  );

  const onTokenNumberChange = number => {
    setTokenNumber(number);
    debouncedSetCommitment(number);
  };

  const getOpenBet = index => {
    return _.find(openBets, {
      outcome: index,
    });
  };

  const getOpenBetsValue = index => {
    const openBet = getOpenBet(index);

    if (openBet) {
      return _.get(openBet, 'outcomeAmount');
    }

    return 0;
  };

  const getOutcome = index => {
    const isSell = hasSellView();
    const outcomeForValue = _.get(
      isSell ? sellOutcomes : outcomes,
      isSell ? getOpenBetsValue(index) : commitment,
      {}
    );

    return _.get(outcomeForValue, [index, 'outcome']);
  };

  const isChoiceSelectorEnabled = index => {
    if (state !== BetState.active) {
      return false;
    }

    const isSell = hasSellView();

    return !isSell || getOpenBetsValue(index) > 0;
  };

  // const switchableChange = index => {
  //   setChoice(null);
  //   setCurrentTradeView(index);
  // };

  // const renderSwitchableView = () => {
  //   // @TODO: this is not very readable, couldn't we use a "standard" tab interface, would be good for a11y as well
  //   // like e.g. react-aria tablist
  //   // @see: https://react-spectrum.adobe.com/react-aria/useTabList.html
  //   if (_.size(openBets) && !disableSwitcher) {
  //     const switchableViews = [
  //       SwitchableHelper.getSwitchableView('Buy'),
  //       SwitchableHelper.getSwitchableView('Sell'),
  //     ];

  //     return (
  //       <div className={styles.switchableContainer}>
  //         <SwitchableContainer
  //           switchableViews={switchableViews}
  //           currentIndex={currentTradeView}
  //           setCurrentIndex={switchableChange}
  //           underlineInactive={true}
  //           handleChartDirectionFilter={handleChartDirectionFilter}
  //         />
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  const renderChoiceSelector = (
    index,
    name,
    choiceSelectorTheme,
    styles,
    resolved = false,
    forceSelect = false
  ) => {
    const enabled = isChoiceSelectorEnabled(index);

    return (
      <ChoiceSelector
        key={index}
        theme={choiceSelectorTheme}
        className={styles.choice}
        name={name}
        winAmount={getOutcome(index)}
        commitment={tokenNumber}
        selected={choice === index || forceSelect}
        onClick={!resolved ? onChoiceSelect(index, enabled) : _.noop}
        hideAmount={resolved}
        disabled={!enabled}
      />
    );
  };

  const renderTokenSelection = () => {
    const isSell = hasSellView();

    if (isSell) {
      return null;
    }

    return (
      <>
        <label className={styles.label}>You trade:</label>
        <TokenNumberInput
          value={tokenNumber}
          setValue={onTokenNumberChange}
          errorText={commitmentErrorText}
          maxValue={+balance}
        />
      </>
    );
  };

  const renderSellInformation = () => {
    const openBet = getOpenBet(choice);

    if (openBet) {
      const investmentAmount = _.get(openBet, 'investmentAmount');
      const summaryRows = [
        BetSummaryHelper.getKeyValue(
          'Your Investment',
          investmentAmount + ' ' + TOKEN_NAME
        ),
        BetSummaryHelper.getDivider(),
      ];

      return (
        <div className={styles.summaryRowContainer}>
          <SummaryRowContainer summaryRows={summaryRows} />
        </div>
      );
    }
  };

  const renderTradeDesc = () => {
    if (!bet.evidenceDescription) {
      return null;
    }
    const shortLength = 200;
    const isDescShort = bet.evidenceDescription.length <= shortLength;
    return (
      <>
        <p
          className={classNames(
            styles.tradeDesc,
            isDescShort && styles.tradeShortDesc
          )}
        >
          {showAllEvidence || isDescShort
            ? bet.evidenceDescription
            : bet.evidenceDescription
            ? bet.evidenceDescription.substring(0, shortLength) + '...'
            : ''}
        </p>
        {!isDescShort && (
          <button
            className={styles.seeMore}
            onClick={() => setShowAllEvidence(!showAllEvidence)}
          >
            {showAllEvidence ? 'SHOW LESS' : 'SEE MORE'}
          </button>
        )}
      </>
    );
  };

  const renderTradeButton = enabled => {
    const isSell = hasSellView();
    const finalOutcome = getFinalOutcome();

    if (!isSell && !finalOutcome) {
      const tradeButtonDisabled = !(validInput && enabled);
      let tradeButtonTheme = null;

      if (tradeButtonDisabled) {
        tradeButtonTheme = HighlightTheme.fillGray;
      }

      return (
        <>
          {renderTradeDesc()}
          <Button
            className={classNames(styles.betButton)}
            onClick={!tradeButtonDisabled ? onTradeButtonConfirm : _.noop}
            highlightType={HighlightType.highlightHomeCtaBet}
            highlightTheme={tradeButtonTheme}
            disabled={tradeButtonDisabled}
            disabledWithOverlay={false}
          >
            Trade!
          </Button>
        </>
      );
    }
    if (isSell && !finalOutcome && validInput) {
      const outcome = _.floor(getOutcome(choice), 2).toFixed(2);

      return (
        <>
          {renderSellInformation()}
          <Button
            className={classNames(styles.betButton, styles.sellButton)}
            highlightType={HighlightType.highlightHomeCtaBet}
            onClick={sellBet}
            disabledWithOverlay={false}
          >
            Cashout {formatToFixed(outcome)} {TOKEN_NAME}
          </Button>
        </>
      );
    }
  };

  const renderChoiceSelectors = (resolved = false, forceSelect) => {
    const outcomes = bet.outcomes;

    return (
      <ChoiceSelectorList
        outcomes={outcomes}
        resolved={resolved}
        forceSelect={forceSelect}
        renderChoiceSelector={renderChoiceSelector}
      />
    );
  };

  const renderPlaceBetContentContainer = enabled => {
    return (
      <>
        {/* {renderSwitchableView()} */}
        <div className={styles.placeBetContentContainer}>
          {renderTokenSelection()}
          <div
            className={classNames(
              styles.buttonContainer,
              hasSellView() ? styles.sellButtonContainer : null
            )}
          >
            <label className={styles.label}>Pick outcome</label>
            <div className={styles.choiceContainer}>
              {renderChoiceSelectors(enabled)}
            </div>
          </div>
        </div>
        {state === BetState.canceled && (
          <div className={styles.canceledErrorContainer}>
            <ErrorHint
              className={styles.canceledErrorText}
              errorText={'All participants will be refunded.'}
            />
          </div>
        )}
      </>
    );
  };

  const getLoadingAnimationStyle = () => {
    return {
      backgroundImage: 'url("' + LoadingAnimation + '")',
    };
  };

  const renderLoadingAnimation = () => {
    if (showLoadingAnimation) {
      return (
        <div className={classNames(styles.loadingAnimationContainer)}>
          <div className={styles.loadingAnimationBackground}></div>
          <div
            className={styles.loadingAnimation}
            style={getLoadingAnimationStyle()}
          ></div>
        </div>
      );
    }

    return null;
  };

  const renderMenuContainerWithCurrentBalance = () => {
    return (
      <div
        className={classNames(
          styles.menuContainer,
          isPopup ? styles.popupMenuContainer : null
        )}
      >
        {/* {renderCurrentBalance()} */}
        {renderMenu()}
      </div>
    );
  };

  const renderMenu = () => {
    const renderMenuInfoIcon = () => {
      return (
        <Icon
          className={styles.menuInfoIcon}
          iconType={IconType.info}
          iconTheme={null}
          width={16}
        />
      );
    };
    const openInfoPopup = popupType => {
      return () => {
        const options = {
          tradeId: betId,
          eventId: _.get(event, '_id'),
        };

        showPopup(popupType, options);
      };
    };

    return (
      <div className={styles.menu}>
        <Icon
          className={styles.menuIcon}
          iconType={IconType.menu}
          iconTheme={null}
          onClick={() => setMenuOpened(!menuOpened)}
        />
        <div
          className={classNames(
            styles.menuBox,
            menuOpened ? styles.menuBoxOpened : null
          )}
        >
          <div
            className={styles.menuItem}
            onClick={openInfoPopup(PopupTheme.eventDetails)}
          >
            {renderMenuInfoIcon()}
            <span>
              See <strong>Event</strong> Details
            </span>
          </div>
          <div
            className={styles.menuItem}
            onClick={openInfoPopup(PopupTheme.tradeDetails)}
          >
            {renderMenuInfoIcon()}
            <span>
              See <strong>Trade</strong> Details
            </span>
          </div>
        </div>
      </div>
    );
  };

  // const renderCurrentBalance = () => {
  //   return (
  //     <div className={classNames(styles.currentBalanceContainer)}>
  //       <Icon
  //         className={styles.currentBalanceIcon}
  //         iconTheme={IconTheme.primaryLightTransparent}
  //         iconType={IconType.wallet2}
  //       />
  //       {formatToFixed(balance)}
  //     </div>
  //   );
  // };

  const renderStateConditionalContent = () => {
    const interactionEnabled = state === BetState.active;

    if (
      state === BetState.active ||
      state === BetState.canceled ||
      state === BetState.closed
    ) {
      return (
        <>
          {renderPlaceBetContentContainer()}
          <div className={styles.betButtonContainer}>
            {renderTradeButton(interactionEnabled)}
          </div>
        </>
      );
    } else if (state === BetState.resolved) {
      const overallTrades = 0;
      const tokensTraded = 0;
      const tokensWon = 0;
      const hasWon = tokensWon > 0;
      const finalOutcome = _.get(bet, [
        'outcomes',
        _.get(bet, 'finalOutcome'),
        'name',
      ]);
      // console.debug(bet);
      const summaryRows = [
        BetSummaryHelper.getDivider(),
        BetSummaryHelper.getKeyValue('Overall trades', overallTrades),
        BetSummaryHelper.getKeyValue(
          TOKEN_NAME + ' tokens traded',
          tokensTraded + ' ' + TOKEN_NAME
        ),
        BetSummaryHelper.getKeyValue('Outcome', finalOutcome),
        BetSummaryHelper.getDivider(),
        BetSummaryHelper.getKeyValue(
          TOKEN_NAME + ' tokens won',
          tokensWon + ' ' + TOKEN_NAME,
          false,
          false,
          true,
          null,
          false,
          hasWon ? HighlightType.highlightMenuAddEventOrBet : null
        ),
      ];

      return (
        <>
          <div className={styles.summaryRowContainer}>
            <SummaryRowContainer summaryRows={summaryRows} />
            <div
              className={styles.walletLink}
              onClick={() => setOpenDrawer('wallet')}
            >
              Go to my Wallet
              <Icon
                className={styles.walletLinkIcon}
                iconType={IconType.arrowTopRight}
                iconTheme={IconTheme.primary}
              />
            </div>
            {hasWon && (
              <>
                <span className={styles.confettiLeft}>
                  <Icon iconType={IconType.confettiLeft} iconTheme={null} />
                </span>
                <span className={styles.confettiRight}>
                  <Icon iconType={IconType.confettiRight} iconTheme={null} />
                </span>
              </>
            )}
          </div>
          <BetShareContainer
            shareIconTypes={[
              ShareType.twitter,
              ShareType.whatsapp,
              ShareType.facebook,
            ]}
            url={window.location.href}
          />
        </>
      );
    }
  };

  if (!event || !bet) {
    return null;
  }

  const endDate = _.get(bet, 'endDate');

  return (
    <>
      <div
        className={classNames(
          styles.placeBetParentContainer,
          styles[state + 'Status'],
          isTradeViewPopup ? styles.isPopup : null
        )}
      >
        <div
          className={classNames(
            styles.placeBetContainer,
            isTradeViewPopup ? styles.isPopup : null
          )}
        >
          {renderLoadingAnimation()}
          {!isTradeViewPopup && renderMenuContainerWithCurrentBalance()}
          <div className={styles.betMarketQuestion}>{bet.marketQuestion}</div>
          {renderStateConditionalContent()}
        </div>
      </div>
      {showEventEnd && (
        <div
          className={classNames(
            styles.timeLeftCounterContainer,
            isTradeViewPopup ? styles.fixedTimer : null
          )}
        >
          <span>Event ends in:</span>
          <TimeLeftCounter endDate={endDate} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    actionIsInProgress: state.bet.actionIsInProgress,
    balance: formatToFixed(state.authentication.balance, 0),
    choice: state.bet.selectedChoice,
    commitment: _.get(state, 'bet.selectedCommitment', 0),
    events: state.event.events,
    wfairValue: formatToFixed(state.bet.wfairValue, 2),
    openBets: state.bet.openBets,
    rawOutcomes: state.bet.outcomes,
    rawSellOutcomes: state.bet.sellOutcomes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChoice: choice => {
      dispatch(BetActions.selectChoice({ choice }));
    },
    setCommitment: (commitment, betId) => {
      dispatch(BetActions.setCommitment({ commitment, betId }));
    },
    fetchSellOutcomes: (amount, betId) => {
      dispatch(BetActions.fetchSellOutcomes({ amount, betId }));
    },
    placeBet: (betId, amount, outcome) => {
      dispatch(BetActions.place({ betId, amount, outcome }));
    },
    pullOutBet: (betId, outcome, amount) => {
      dispatch(BetActions.pullOutBet({ betId, outcome, amount }));
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    setOpenDrawer: drawer => {
      dispatch(GeneralActions.setDrawer(drawer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BetView);
