import { makeActionCreator } from '../../helper/Store';

export const OnboardingTypes = {
  START: 'Onboarding/START',
  NEXT: 'Onboarding/NEXT',
  GET_USERNAME: 'Onboarding/GET_USERNAME',
};

export const OnboardingSteps = {
  buildAvatar: "buildAvatar",
  registerEmail: "registerEmail",
  setUsername: "setUsername",
  // welcomeScreen: "welcomeScreen",
  wallet: "wallet",
};

const start = makeActionCreator(OnboardingTypes.START, {});

const next = makeActionCreator(OnboardingTypes.NEXT, {});
const getUsername = makeActionCreator(OnboardingTypes.GET_USERNAME,
  {username: null});

export const OnboardingActions = {
  start,
  next,
  getUsername
};
