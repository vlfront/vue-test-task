import Vue from "vue";
import Vuex from "vuex";

import { API_URL } from "./env";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    loading: false
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload;
    },
    fetchData(state, payload) {
      state.list = payload;
    },
    updateTask(state, {name, due_date, description, id, userId}) {
      const user = state.list.find(user => user.id === userId);
      const task = user.tasks.find(task => task.id === id);
      task.name = name;
      task.due_date = due_date;
      task.description = description;
      task.id = id;
    }
  },
  actions: {
    loading({commit}, payload) {
      commit('loading', payload);
    },
    async fetchData({commit}) {
      commit('loading', true);
      try {
        const response = await Vue.http.get(API_URL);
        const data = JSON.parse(response.body.data);
        commit('fetchData', data);
        commit('loading', false);
      } catch (e) {
        commit('loading', false);
        console.log(e.message);
      }
    },
    updateTask({commit}, {name, due_date, description, id, userId}) {
      commit('updateTask', {
        name,
        due_date,
        description,
        id,
        userId
      });
    }
  },
  getters: {
    list(state) {
      return state.list;
    },
    taskId(state) {
      return (userId, taskId) => {
        const userObject = state.list.find(user => user.id === userId);
        return userObject.tasks.find(task => task.id === taskId);
      };
    },
    loading(state) {
      return state.loading;
    }
  }
});
