export const state = () => {
  return {
    isLoggedIn: false,
    token: null,
  };
};

export const mutations = {
  setIsLoggedIn(state, value) {
    state.isLoggedIn = value;
  },
  setToken(state, token) {
    state.token = token;
  },
};

export const getters = {
  getIsLoggedIn(state) {
    return state.isLoggedIn;
  },
};
export const actions = {
  login({ commit }, { token }) {
    this.$cookies.set("token", token);
    commit("setIsLoggedIn", true);
    commit("setToken", token);
  },
};
