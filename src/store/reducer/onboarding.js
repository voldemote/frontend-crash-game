import { OnboardingTypes, OnboardingSteps } from '../actions/onboarding';

const initialState = {
  currentStep: null,
  username: null,

};

export const Order = [
  OnboardingSteps.buildAvatar,
  OnboardingSteps.setUsername,
  OnboardingSteps.registerEmail
];

const start = (action, state) => {
  return {
    ...state,
    currentStep: Order[0]
  }
};

const next = (action, state) => {
  var current = Order.findIndex(e => e === state.currentStep) || 0;
  var next = current;
  if(current <= Order.length-1) next = current +1;
  return {
    ...state,
    currentStep: Order[next],
    username: action?.payload?.username ? action.payload.username : state.username
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case OnboardingTypes.START:
      return start(action, state);
    case OnboardingTypes.NEXT:
      return next(action, state);
    default:
      return state;
    // @formatter:on
  }
}
