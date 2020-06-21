import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/services.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      uf: '',
      city: '',
    },
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
  },
  actions: {
    getUser(context, payload) {
      return api.get(`/user/${payload}`).then((response) => {
        context.commit('UPDATE_USER', response.data);
        context.commit('UPDATE_LOGIN', true);
      });
    },
    createUser(context, payload) {
      context.commit('UPDATE_USER', { id: payload.email });
      return api.post('/user', payload);
    },
    logout(context) {
      context.commit('UPDATE_USER', {
        id: '',
        name: '',
        email: '',
        password: '',
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        uf: '',
        city: '',
      });
      context.commit('UPDATE_LOGIN', false);
    },
  },
  modules: {},
});
