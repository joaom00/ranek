import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Loading from '@/components/Loading';
import LoadingButton from '@/components/LoadingButton';
import ErrorNotification from '@/components/ErrorNotification';

Vue.config.productionTip = false;

Vue.component('Loading', Loading);
Vue.component('LoadingButton', LoadingButton);
Vue.component('ErrorNotification', ErrorNotification);

Vue.filter('priceConvert', (value) => {
  value = Number(value);
  if (!isNaN(value)) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  } else {
    return '';
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
