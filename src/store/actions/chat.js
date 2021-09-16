import { makeActionCreator } from '../../helper/Store';

export const ChatTypes = {
  ADD_MESSAGE: 'Chat/ADD_MESSAGE',
  FETCH_BY_ROOM: 'Chat/FETCH_BY_ROOM',
  FETCH_BY_ROOM_SUCCESS: 'Chat/FETCH_BY_ROOM_SUCCESS',
};

const addMessage = makeActionCreator(ChatTypes.ADD_MESSAGE, {
  roomId: null,
  message: null,
});

const fetchByRoom = makeActionCreator(ChatTypes.FETCH_BY_ROOM, {
  roomId: null,
  limit: 100,
  skip: 0,
});

const fetchByRoomSuccess = makeActionCreator(ChatTypes.FETCH_BY_ROOM_SUCCESS, {
  roomId: null,
  messages: [],
});

export const ChatActions = {
  fetch,
  addMessage,
  fetchByRoom,
  fetchByRoomSuccess,
};
