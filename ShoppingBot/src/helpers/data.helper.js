import Q from 'q';
import directLineService from '../services/directLineService';
import dispatchCenter from '../helpers/dispatchCenter.helper';

let conversationResponse = null;
let sendMessageResponse = null;
let receivedMessage = null;
let intervalHandle = null;
let currentWatermark = 0;

const msgObject = {
  type: 'message',
  from: {
    id: 'user1',
  },
  text: '',
};

const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
};

const start = () => {
  const promise = Q.fcall(directLineService.startConversation).then(parseConversationResponse);
  return promise;
}
const sendMessage = (message ) => Q.fcall(directLineService.sendMessage(message)).then(parseSendMessageResponse);
const getMessage = () => Q.fcall(directLineService.getMessage).then(parseReceivedMessage);

const parseConversationResponse = (response) => {
  conversationResponse = typeof (response.data) === 'string' ? parseJSON(response.data) : response.data;
};

const parseSendMessageResponse = (response) => {
  sendMessageResponse = typeof (response.data) === 'string' ? parseJSON(response.data) : response.data;
  startTimer();
};

const parseReceivedMessage = (response) => {
  let responseData = typeof (response.data) === 'string' ? parseJSON(response.data) : response.data;
  if (responseData && responseData.watermark) {
    if (responseData.watermark !== currentWatermark) {
      currentWatermark = responseData.watermark;
      if (Array.isArray(responseData.activities)) {
        // receivedMessage = responseData.activities.filter((obj) => { return obj.from.id === 'FirstBotApplicationExample'; });
        receivedMessage = responseData.activities;
      }
    }
  }
};

const startTimer = () => {
  intervalHandle = setInterval(pollDirectLineAPI, 2000);
};

const stopTimer = () => {
  if (intervalHandle) {
    clearInterval(intervalHandle);
  }
};

const pollDirectLineAPI = () => {
  const promise = getMessage();
  promise.then(() => {
    dispatchCenter.messageReceived();
  });
};

export default {
  start,
  sendMessage,
  getConversation: () => conversationResponse,
  getReceivedMessage: () => receivedMessage,
  startTimer,
  stopTimer,
  messageObject: () => msgObject,
};