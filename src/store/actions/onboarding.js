import { makeActionCreator } from '../../helper/Store';

export const OnboardingTypes = {
  START: 'Onboarding/START',
  NEXT: 'Onboarding/NEXT',
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

export const OnboardingActions = {
  start,
  next,
};
