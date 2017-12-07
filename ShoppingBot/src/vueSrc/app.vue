<template>
  <div id="app">
    <webchat-component></webchat-component>
  </div>
</template>

<script>

import webchatComponent from './components/webchat.component.vue';
import dataHelper from '../helpers/data.helper';


export default {
  name: 'app',
  components: {
    webchatComponent,
  },
  created: function() {
    const promise = dataHelper.start();
    promise.then(() => {
      const resp = dataHelper.getConversation();
      console.log(resp);
      dataHelper.startTimer();
    });
  },
  destroyed: function() {
    dataHelper.stopTimer();
  },
};
</script>

<style>
#app {
  pointer-events: none;
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: default;
}
</style>
