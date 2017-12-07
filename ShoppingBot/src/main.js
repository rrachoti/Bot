import Vue from 'vue';
import App from './vueSrc/app.vue';
import './libs/jquery.min';
import './libs/semantic/semantic.min';
import './css/global.scss';
import dataHelper from './helpers/data.helper';

dataHelper.start();

new Vue({
  el: 'app',
  template: '<app/>',
  components: { App },
});
