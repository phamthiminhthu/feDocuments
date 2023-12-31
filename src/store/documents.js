export const state = () => ({
  documents: null,
  suggestedDocs: null,
  suggestedUserList: null
});

export const mutations = {
  setDocuments(state, value) {
    state.documents = value;
  },
  setSuggestedDocs(state, value) {
    state.suggestedDocs = value;
  },
  setSuggestedUserList(state, value) {
    state.suggestedUserList = value;
  },
};

export const actions = {
  async fetchDataAllDocuments({ commit }) {
    try {
      const response = await this.$axios.get("/management/document/show/all");
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async fetchDocumentsLoved({ commit }) {
    try {
      const response = await this.$axios.get("/management/document/loved");
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async fetchDocumentsPublic({ commit }) {
    try {
      const response = await this.$axios.get(
        "/management/document/show/public"
      );
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentsPublicByUsername({ commit }, { username }) {
    try {
      const response = await this.$axios.get(
        `/management/document/show/public/by-username?username=${username}`
      );
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentSharedWithMe({ commit }) {
    try {
      const response = await this.$axios.get("/management/document/shared/me");
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentCompleted({ commit }) {
    try {
      const response = await this.$axios.get(
        "/management/document/completed/show/all"
      );
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentsOnTrash({ commit }) {
    try {
      const response = await this.$axios.get(
        "/management/document/trash/show/all"
      );
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentsFollowing({ commit }) {
    try {
      const response = await this.$axios.get(
        "/management/document/following/show/all"
      );
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentsSuggested({ commit }) {
    try {
      const response = await this.$axios.get(
        "/management/document/suggest/show/all"
      );
      if (response) {
        const documents = response.data.content;
        commit("setSuggestedDocs", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUsersSuggested({ commit }) {
    try {
      const response = await this.$axios.get(
        "/management/document/suggest/user/show/all"
      );
      if (response) {
        const documents = response.data.content;
        commit("setSuggestedUserList", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentsByTag({ commit }, { tagName }) {
    try {
      const response = await this.$axios.get(
        `/management/document/tag/find/documents/all?tagName=${tagName}`
      );
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDocumentsByTypeDocs({ commit }, { typeName }) {
    try {
      const response = await this.$axios.get(
        `/management/document/type/find/documents/all?typeName=${typeName}`
      );
      if (response) {
        const documents = response.data.content;
        commit("setDocuments", documents);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export const getters = {
  getDocuments: (state) => state.documents,
  getSuggestedDocs: (state) => state.suggestedDocs,
  getSuggestedUserList: (state) => state.suggestedUserList,
};
