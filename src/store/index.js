import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    actions: [],
    plan: []
  },
  mutations: {
    ADD_ACTION(state, action) {
      state.actions.push(action);
    },
    DELETE_ACTION(state, index) {
      state.actions.splice(index, 1);
    },
    UPDATE_ACTION(state, { action, index }) {
      state.actions.splice(index, 1, action);
    },
    ADD_TO_PLAN(state, action) {
      state.plan.push(action);
    },
    DELETE_FROM_PLAN(state, index) {
      state.plan.splice(index, 1);
    },
    RESET_PLAN(state) {
      state.plan = [];
    }
  },
  actions: {
    add_action({ commit }, action) {
      commit('ADD_ACTION', action);
    },
    delete_action({ commit }, index) {
      commit('DELETE_ACTION', index);
    },
    update_action({ commit }, { action, index }) {
      commit('UPDATE_ACTION', { action, index });
    },
    add_to_plan({ commit }, action) {
      commit('ADD_TO_PLAN', action);
    },
    delete_from_plan({ commit }, index) {
      commit('DELETE_FROM_PLAN', index);
    },
    reset_plan({ commit }) {
      commit('RESET_PLAN');
    }
  },
  getters: {
    actionsGetter: state => {
      return state.actions;
    },
    actionByIdGetter: state => id => {
      return state.actions[id];
    },
    planGetter: state => {
      return state.plan;
    }
  },
  modules: {}
});
