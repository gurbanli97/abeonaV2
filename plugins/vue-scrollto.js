import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';


Vue.use(VueScrollTo, {
    container: 'body',
    duration: 1000,
    easing: 'linear',
    offset: 0,
    force: true,
    cancelable: false,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
  });