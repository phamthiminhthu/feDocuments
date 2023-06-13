export const state = () => ({
    isLoggedIn: false,
    jwt: null,
  });
  
  export const mutations = {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setJwt(state, token) {
      state.jwt = token;
    },
  };
  
  export const getters = {
    getIsLoggedIn(state) {
      return state.isLoggedIn
    }
  }
  export const actions = {
    login({ commit }, { jwt }) {
      this.$cookies.set('jwt', jwt);
      commit('setLoggedIn', true);
      commit('setJwt', jwt);
    },
  };
  