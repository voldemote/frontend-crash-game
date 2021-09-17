import _ from 'lodash';
import update from 'immutability-helper';
import { ChatTypes } from '../actions/chat';

const initialState = {
  messagesByRoom: {},
};

const sortChatMessages = chatMessages =>
  chatMessages.sort((a = {}, b = {}) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    return aDate < bDate ? -1 : aDate === bDate ? 0 : 1;
  });

const addMessages = (state, roomId, messages) => {
  const currentMessages = _.get(state, ['messagesByRoom', roomId], []);
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
    messagesByRoom: {
      [roomId]: {
        $set: sortedChatMessages,
      },
    },
  });
};

const addMessage = (action, state) => {
  const { message, roomId } = action;

  return addMessages(state, roomId, [message]);
};

const fetchByRoomSuccess = (action, state) => {
  return addMessages(state, action.roomId, action.messages);
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case ChatTypes.ADD_MESSAGE:
      return addMessage(action, state);
    case ChatTypes.FETCH_BY_ROOM_SUCCESS:
      return fetchByRoomSuccess(action, state);
    default:
      return state;
    // @formatter:on
  }
}
