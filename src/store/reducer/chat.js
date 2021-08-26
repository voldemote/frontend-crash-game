import _ from 'lodash';
import update from 'immutability-helper';
import { ChatTypes } from '../actions/chat';

const initialState = {
  messagesByEvent: {},
};

const sortChatMessages = chatMessages =>
  chatMessages.sort((a = {}, b = {}) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    return aDate < bDate ? -1 : aDate === bDate ? 0 : 1;
  });

const addMessages = (state, eventId, messages) => {
  const currentMessages = _.get(state, ['messagesByEvent', eventId], []);
  const sortedChatMessages = sortChatMessages(
    _.uniqWith(
      _.concat(currentMessages, messages)
        .map(m => _.omit(m, ['_id', '__v']))
        .map(m => {
          m.date = new Date(m.date);

          m.date.setMilliseconds(0);

          return m;
        }),
      _.isEqual
    )
  );

  return update(state, {
    messagesByEvent: {
      [eventId]: {
        $set: sortedChatMessages,
      },
    },
  });
};

const fetchSucceeded = (action, state) => {
  const { messages, eventId } = action;

  return addMessages(state, eventId, messages);
};

const addMessage = (action, state) => {
  const { message, eventId } = action;

  return addMessages(state, eventId, [message]);
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case ChatTypes.FETCH_SUCCEEDED:
      return fetchSucceeded(action, state);
    case ChatTypes.FETCH_INITIAL_SUCCEEDED:
      return fetchSucceeded(action, state);
    case ChatTypes.ADD_MESSAGE:
      return addMessage(action, state);
    default:
      return state;
    // @formatter:on
  }
}
