<template>
  <div id = "webchat-container">
    <div class "webchat-view" >
      <div class = "webchat-header">
        <span>Your Shopping Guide</span>
      </div>
      <div class = "webchat-activity">
        <div class = "webchat-message-groups">
          <div class = "webchat-message-wrapper"  v-for="msg in allMessages">
            <div class = "webchat-message" v-bind:class="[isMessageFromMe(msg) ? 'webchat-message-from-me' : 'webchat-message-from-bot']">
              <div class = "webchat-message-content">
                <span>{{msg.text}}</span>
              </div>
            </div>
            <div  v-bind:class="[isMessageFromMe(msg) ? 'webchat-user-info' : 'webchat-bot-info']">
              <span>{{getMessageOwner(msg)}}</span>
            </div>
          </div>
          </br>          
        </div>
      </div>
      <div class ="webchat-console">
        <div class="ui icon input">
          <input type="text" class = "webchat-textbox" v-model="message" placeholder="Type your message here..." @keydown.enter ="handleSendMessage">
          <i class="send link icon" v-on:click="sendMessage"></i>
        </div>
          <button class="webchat-send hidden" aria-label="Send" role="button" tabindex="0">
          </button>
      </div>
    </div>    
  </div>
</template>

<script>

import dataHelper from '../../helpers/data.helper';
import dispatchCenter from '../../helpers/dispatchCenter.helper';

export default {
  name: 'webchat-component',
  components: {
  },
  data() {
    return {
      message: '',
      allMessages: [],
    };
  },
  methods: {
    handleSendMessage: function (e) {
      if (e.keyCode === 13) {
        this.sendMessage();
      }
    },
    sendMessage: function() {
      if (this.message.length === 0) {
        return;
      }
      const msg = dataHelper.messageObject();
      msg.text = this.message;
      dataHelper.sendMessage(msg);
      this.message = '';
    },
    messageReceived: function () {
      const messageReceived = dataHelper.getReceivedMessage();
      if (messageReceived) {
        this.allMessages = messageReceived;
        console.log(this.allMessages);
      }
    },
    isMessageFromMe: function (msg) {
      return msg && msg.from && msg.from.id !== 'FirstBotApplicationExample';
    },
    getMessageOwner: function (msg) {
      return msg && msg.from && msg.from.id !== 'FirstBotApplicationExample' ? 'User' : 'Bot';
    },
  },
  mounted: function () {
    dispatchCenter.messageReceived(this.messageReceived);
  },
};

</script>

<style lang="scss" scoped>
  #webchat-container {
    pointer-events: all;
    position: absolute;
    font-size: 15px;
    font-family: "sans-serif";
    height: 100%;
    width:40%;
    left:30%;
    border: 1px solid black;

    .webchat-view {
    overflow: hidden;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    }
    .webchat-header {
    background-color: #0078d7;
    box-shadow: 0 1px rgba(0, 0, 0, 0.2);
    box-sizing: content-box;
    color: #ffffff;
    font-weight: 500;
    height: 30px;
    left: 0;
    letter-spacing: 0.5px;
    padding: 8px 8px 0 8px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    }
    .webchat-console {
    border: 5px solid #dbdee1;
    bottom: 0;
    box-sizing: border-box;
    height: 50px;
    left: 0;
    position: absolute;
    right: 0;
  }
  .webchat-console .wc-upload {
    cursor: pointer;
    position: relative;
  }
  .webchat-textbox {
    width:100%;
  }
  .webchat-console .wc-mic, .webchat-console .webchat-send {
    background-color: transparent;
    border: 0;
    padding: 0;
    right: 0;
    }
    .webchat-console .wc-mic, .webchat-console .webchat-send {
    background-color: transparent;
    border: 0;
    padding: 0;
    right: 0;
    }
  .webchat-message-wrapper {
    animation: animationFrames 2s;
    animation-iteration-count: 1;
    clear: both;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
  }    
  .webchat-message-from-me {
      float: right;
      margin-right: 6px;
  }
  .webchat-message {
    max-width: 91%;
    position: relative;
  }
  .webchat-message-from-me .webchat-message-content {
      background-color: #0078d7;
      color: #ffffff;
  }
  .webchat-message-content {
      border-radius: 2px;
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
      padding: 8px;
      word-break: break-word;
  }
  .webchat-message-from-bot {
    float: left;
    margin-left: 8px;
  }
  .webchat-message-from-bot .webchat-message-content {
      background-color: #eceff1;
      color: #000000;
  }
  .webchat-activity {
    overflow: auto;
    top: 30px;
    bottom: 50px;
    position: fixed;
    width: 40%;
    margin-top: 10px;
    display: flex;
    flex-direction: column-reverse;
  }
  .webchat-user-info{
    clear: both;
    float: right;
    margin-right: 6px;    
    color: grey;
    font-size: 12px; 
  }
  .webchat-bot-info{
    clear: both;   
    margin-right: 6px;    
    color: grey;
    font-size: 12px; 
    margin-left:8px;
  }  
  div {
    display: block;
  }
}
</style>
