import classNames from 'classnames';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect, useMemo, useState } from 'react';

import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import Button from 'components/Button';
import ContentFooter from 'components/ContentFooter';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import {
  resendEmailVerification,
  getRewardsQuestions,
  postRewardAnswer,
} from '../../api';

import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from '../../store/actions/popup';

import CelebrationBadge from '../../data/images/confetti-winnings-badge.svg';

import styles from './styles.module.scss';
import { TOKEN_NAME } from 'constants/Token';
import React from 'react';

const RewardCard = ({
  rewardAmount = 0,
  title = '',
  description = '',
  buttonText = '',
  isDone = false,
  isDisabled = false,
  onClick = () => {},
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardReward}>
        <span>{rewardAmount} WFAIR</span>
      </div>
      <p>{title}</p>
      <div className={styles.cardRewardDescrption}>{description}</div>
      {isDone ? (
        <Button
          className={classNames(styles.cardButton, styles.cardButtonDone)}
          withoutBackground={false}
        >
          Done!
        </Button>
      ) : (
        <Button
          className={styles.cardButton}
          withoutBackground={true}
          disabled={isDisabled}
          onClick={onClick}
        >
          <span>{buttonText}</span>
          <Icon
            className={styles.iconRightSide}
            iconType={IconType.arrowSmallRight}
            iconTheme={IconTheme.black}
          />
        </Button>
      )}
    </div>
  );
};

const RewardCards = ({ user }) => {
  const history = useHistory();

  const [isLoadingResend, setIsLoadingResend] = useState(false);

  const handleResendEmail = () => {
    setIsLoadingResend(true);
    resendEmailVerification().then(
      res => {
        setIsLoadingResend(false);
        // TODO toast?
      },
      () => {
        setIsLoadingResend(false);
      }
    );
  };

  const handleGoToEvents = () => {
    history.push('/events');
  };

  const handleImageUpload = () => {
    console.log('TODO');
  };

  const handleReferFriend = () => {
    console.log('TODO');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.rewardsWrapper}>
      <RewardCard
        rewardAmount={100}
        title="Confirm Email"
        description="Augue Diam Sit Nulla Sagittis Diggnissim Orci Quam."
        buttonText="Resend Email"
        isDisabled={isLoadingResend}
        onClick={handleResendEmail}
        isDone={!!user.emailVerificationState}
      />
      <RewardCard
        rewardAmount={150}
        title="Upload Profile Image"
        description="Augue Diam Sit Nulla Sagittis Diggnissim Orci Quam."
        isDone={!!user.profilePicture}
        onClick={handleImageUpload}
        buttonText="Upload Image"
      />
      <RewardCard
        rewardAmount={250}
        title="Share"
        description="Augue Diam Sit Nulla Sagittis Diggnissim Orci Quam."
        isDone={false}
        onClick={handleGoToEvents}
        buttonText="Go to Events"
      />
      <RewardCard
        rewardAmount={180}
        title="Refer A Friend"
        description="Augue Diam Sit Nulla Sagittis Diggnissim Orci Quam."
        isDone={false}
        onClick={handleReferFriend}
        buttonText="Refer"
      />
    </div>
  );
};

const LotteryGame = ({
  initialQuestions = [],
  initialQuestionNumber = 0,
  showPopup,
  isComplete = false,
  user,
}) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState(
    initialQuestionNumber
  );
  const [checkedOption, setCheckedOption] = useState(null);
  const [complete, setCompleted] = useState(isComplete);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRewardsQuestions().then(res => {
      setQuestions(res.data);
      setLoading(false);
    });
  }, []);

  const activeQuestion = useMemo(
    () => questions[activeQuestionNumber],
    [questions, activeQuestionNumber]
  );

  const hasNextQuestion = useMemo(
    () => !!questions[activeQuestionNumber + 1],
    [questions, activeQuestionNumber]
  );

  const nextQuestion = () => setActiveQuestionNumber(activeQuestionNumber + 1);

  const handleContinue = () => {
    postRewardAnswer(activeQuestion._id, checkedOption, user.userId).then(
      res => {
        showPopup(PopupTheme.lotteryGameAnswered, {
          small: true,
          rewardId: res.data.id,
        });
        setCheckedOption(null);

        if (hasNextQuestion) {
          nextQuestion();
        } else {
          setCompleted(true);
        }
      }
    );
  };

  const setOption = value => {
    setCheckedOption(value);
  };

  if (loading) {
    return (
      <div className={classNames(styles.card, styles.cardCenter)}>
        <div className={styles.lotteryGameContent}>
          <span className={styles.loader}></span>
          <p>Looking for open lottery games...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className={classNames(styles.card, styles.cardCenter)}>
        <div className={styles.lotteryGameContent}>
          <p>
            You've completed all existing lottery questions. <br /> Come back
            later for more.
          </p>
        </div>
      </div>
    );
  }

  if (complete) {
    return (
      <div className={classNames(styles.card, styles.cardCenter)}>
        <div className={styles.lotteryGameContent}>
          <p>Thanks for playing the lottery game, come back later!</p>
        </div>
      </div>
    );
  }

  const isSubmitDisabled = checkedOption === null;

  return (
    <div className={styles.card}>
      {!isSubmitDisabled && (
        <div className={styles.celebrationBadge}>
          <img src={CelebrationBadge} alt="celebration" />
          <span>180 {TOKEN_NAME}</span>
        </div>
      )}
      <div>
        <span className={styles.questionNumberLabel}>
          {activeQuestionNumber + 1}/{questions.length}
        </span>
      </div>
      <div className={styles.lotteryGameContent}>
        <p>Lottery Game</p>
        <h3>{activeQuestion.title}</h3>
        <div className={styles.questionOptions}>
          {activeQuestion.questions.map(({ index, name, imageUrl }) => {
            const elementId = `${activeQuestion._id}_${index}`;
            return (
              <React.Fragment key={elementId}>
                <input
                  type="radio"
                  id={elementId}
                  name={activeQuestion._id}
                  value={index}
                  className={styles.checkbox}
                  onChange={() => setOption(index)}
                />
                <label
                  key={elementId}
                  htmlFor={elementId}
                  className={styles.radioButton}
                  checked={checkedOption === index}
                >
                  <span>{name}</span>
                  {!!imageUrl && <img src={imageUrl} alt={name} />}
                </label>
              </React.Fragment>
            );
          })}
        </div>
        <div className={styles.lotteryGameButtons}>
          {hasNextQuestion && (
            <Button
              className={classNames(
                styles.cardButton,
                styles.cardButtonDone,
                styles.skipQuestionBtn
              )}
              withoutBackground={false}
              onClick={nextQuestion}
            >
              Skip
              <Icon
                className={styles.iconRightSide}
                iconType={IconType.cross}
                iconTheme={IconTheme.black}
              />
            </Button>
          )}
          <Button
            className={styles.nextQuestionBtn}
            onClick={handleContinue}
            disabled={isSubmitDisabled}
          >
            {hasNextQuestion ? 'Next Question' : 'Confirm'}
            <Icon
              className={styles.iconRightSide}
              iconType={IconType.arrowSmallRight}
              iconTheme={IconTheme.black}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Rewards = ({ user, showPopup }) => {
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.rewardsInfo}>
            <h3>Activation Games</h3>
            <p>
              Want to earn some extra WFAIR to use in the platform? Our
              activation games are simple, fun and come with extra rewards. Each
              week, we will add new activation games as you complete previous
              levels. This could be anything from verifying your email address,
              refering a friend or even submitting an event proposal.
            </p>
            <p>
              Low on WFAIR and your favourite event is coming up soon? No
              problem! Play our Activation Games &amp; earn quickly, get back in
              the game and don't miss a second.
            </p>
            <p>So how does it work?</p>
            <ul>
              <li>Click one of the green buttons</li>
              <li>Complete the game</li>
              <li>Get WFAIR tokens dropped into your wallet</li>
              <li>Play</li>
            </ul>
            <p>It is really that easy.</p>
          </div>
          <RewardCards user={user} />
        </div>
        <div>
          <LotteryGame user={user} showPopup={showPopup} />
        </div>
        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default connect(
  state => ({
    user: state.authentication,
  }),
  dispatch => ({
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  })
)(Rewards);
