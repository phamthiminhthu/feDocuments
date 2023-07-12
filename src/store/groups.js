export const state = () => {
  return {
    groupDetails: null,
    groups: null,
  };
};

export const mutations = {
  setGroupDetails(state, value) {
    state.groupDetails = value;
  },
  setGroups(state, value) {
    state.groups = value;
  },
};

export const getters = {
  getGroupDetails: (state) => state.groupDetails,
  getGroups: (state) => state.groups,
};
export const actions = {
  async fetchAllGroups({ commit }) {
    try {
      const response = await this.$axios.get("/management/group/show/all");
      if (response) {
        commit("setGroups", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDataGroupDetails({ commit }, { groupId }) {
    try {
      const response = await this.$axios.get(
        `/management/group/show/details/${groupId}`
      );
      if (response) {
        commit("setGroupDetails", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
