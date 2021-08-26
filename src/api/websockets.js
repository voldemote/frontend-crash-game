import { io } from 'socket.io-client';
import ApiConstants from '../constants/Api';

export let websocket = null;
export const createSocket = token => {
  if (!token) {
    console.error('Not auth token given!');
  }

  const socket = io(ApiConstants.getBackendSocketUrl(), {
    query: `token=${token}`,
    transports: ['websocket'],
  });
  websocket = socket;

  return socket;
};

export default {
  websocket,
  createSocket,
};
