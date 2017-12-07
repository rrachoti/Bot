import axios from 'axios';
import dataHelper from '../helpers/data.helper';
import serverHelper from '../helpers/server.helper';

export default {
  startConversation: () => {
    const key = serverHelper.getBotSecretKey();
    return axios({
      method: 'POST',
      url: serverHelper.getAPI(),
      headers: {
        Authorization: `Bearer ${key}`,
      },
      params: {
        cacheProtect: new Date().getTime(),
      },
      responseType: 'json',
    });
  },

  sendMessage: (msg) => {
    const conv = dataHelper.getConversation();
    if (!conv) {
      return;
    }
    if (!conv.conversationId) {
      return;
    }
    const key = serverHelper.getBotSecretKey();
    
    return axios({
      method: 'POST',
      url: `${serverHelper.getAPI()}/${conv.conversationId}/activities`,
      headers: {
        Authorization: `Bearer ${key}`,
      },
      params: {
        cacheProtect: new Date().getTime(),
      },
      responseType: 'json',
      data: msg,
    });
  },

  getMessage: () => {
    const conv = dataHelper.getConversation();
    if (!conv) {
      return;
    }
    if (!conv.conversationId) {
      return;
    }    
    const key = serverHelper.getBotSecretKey();    
    return axios({
      method: 'GET',
      url: `${serverHelper.getAPI()}/${conv.conversationId}/activities`,
      headers: {
        Authorization: `Bearer ${key}`,
      },
      params: {
        cacheProtect: new Date().getTime(),
      },
      responseType: 'json',
    });
  },
};
