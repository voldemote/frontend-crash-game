export const makeActionCreator = (type, props = {}) => {
  const action = { type, ...props };

  return args => {
    if (args) {
      return {
        ...action,
        ...args,
      };
    }

    return action;
  };
};
