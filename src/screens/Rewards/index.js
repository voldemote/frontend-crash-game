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

import styles from './styles.module.scss';

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
        <span>{rewardAmount} Wfair</span>
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
          <div>
            <span>{buttonText}</span>
            <Icon
              className={styles.iconRightSide}
              iconType={IconType.arrowSmallRight}
              iconTheme={IconTheme.black}
            />
          </div>
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
  const [checkedOption, setCheckedOption] = useState();
  const [complete, setCompleted] = useState(isComplete);

  useEffect(() => {
    getRewardsQuestions().then(res => {
      setQuestions(res.data);
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
    postRewardAnswer(activeQuestion.id, checkedOption, user.userId).then(
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

  if (!questions.length) {
    // TODO loading layout
    return null;
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

  return (
    <div className={styles.card}>
      <div>
        <span className={styles.questionNumberLabel}>
          {activeQuestionNumber + 1}/5
        </span>
      </div>
      <div className={styles.lotteryGameContent}>
        <p>Lottery Game</p>
        <h3>{activeQuestion.question}</h3>
        <div className={styles.questionOptions}>
          {activeQuestion.answers.map(({ value, name }) => {
            return (
              <label
                key={value}
                onClick={() => setOption(value)}
                className={styles.radioButton}
                checked={checkedOption === value}
              >
                <input
                  type="radio"
                  id="1"
                  name={name}
                  value={value}
                  checked={checkedOption === value}
                />
                {name}
              </label>
            );
          })}
        </div>
        <div className={styles.lotteryGameButtons}>
          <Button
            className={classNames(
              styles.cardButton,
              styles.cardButtonDone,
              styles.skipQuestionBtn
            )}
            withoutBackground={false}
            onClick={nextQuestion}
            disabled={!hasNextQuestion}
          >
            Skip
            <Icon
              className={styles.iconRightSide}
              iconType={IconType.cross}
              iconTheme={IconTheme.black}
            />
          </Button>
          <Button
            className={styles.nextQuestionBtn}
            onClick={handleContinue}
            disabled={!checkedOption}
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
            <h3>
              Activation
              <br />
              Games
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam
              feugiat, turpis at pulvinar vulputate, erat libero tristique
              tellus, nec bibendum odio risus sit amet ante. Fusce consectetuer
              risus a nunc. Cras pede libero, dapibus nec, pretium sit amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam
              feugiat, turpis at pulvinar vulputate, erat libero tristique
              tellus, nec bibendum odio risus sit amet ante.
            </p>
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
