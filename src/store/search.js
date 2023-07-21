export const state = () => ({
  objectsSearch: null,
});

export const mutations = {
  setObjectsSearch(state, value) {
    state.objectsSearch = value;
  },
};

export const actions = {
  async fetchDocumentsSearchByTag({ commit }, { tagName }) {
    try {
      const response = await this.$axios.get(
        `management/document/tag/find/documents/public?tagName=${tagName}`
      );
      if (response) {
        const documents = response.data.content;
        commit("setObjectsSearch", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentsSearchByTypeDocument({ commit }, { typeName }) {
    try {
      const response = await this.$axios.get(
        `management/document/type/find/documents/public?typeName=${typeName}`
      );
      if (response) {
        const documents = response.data.content;
        commit("setObjectsSearch", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUsersSearchByUsernameOrFullname({ commit }, { name }) {
    try {
      const response = await this.$axios.get(
        `user/find/username?username=${name}`
      );
      if (response) {
        const users = response.data.content;
        commit("setObjectsSearch", users);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUsersSearchByEmail({ commit }, { email }) {
    try {
      const response = await this.$axios.get(
        `user/find/by-email?email=${email}`
      );
      if (response) {
        const users = response.data.content;
        commit("setObjectsSearch", users);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export const getters = {
  getObjectsSearch: (state) => state.objectsSearch,
};
