export const state = () => {
  return {
    collectionDetails: null,
    collectionsParent: null,
    collection: null,
    collectionsAll: null,
  };
};

export const mutations = {
  setCollection(state, value) {
    state.collection = value;
  },
  setCollectionsParent(state, value) {
    state.collectionsParent = value;
  },
  setCollectionDetails(state, value) {
    state.collectionDetails = value;
  },
  setCollectionsAll(state, value) {
    state.collectionsAll = value;
  },
};

export const getters = {
  getCollection: (state) => state.collection,
  getCollectionsParent: (state) => state.collectionsParent,
  getCollectionDetails: (state) => state.collectionDetails,
  getCollectionsAll: (state) => state.collectionsAll,
};
export const actions = {
  async fetchAllCollectionsParent({ commit }) {
    try {
      const response = await this.$axios.get(
        "/owner/management/collection/parent/show/all"
      );
      if (response) {
        const collectionsParent = response.data.content;
        commit("setCollectionsParent", collectionsParent);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchCollectionDetailsById({ commit }, { id, groupId }) {
    try {
      const response = await this.$axios.get(
        `/owner/management/collection/details/show/all/${id}?groupId=${groupId}`
      );
      if (response) {
        const collectionDetails = response.data.content;
        commit("setCollectionDetails", collectionDetails);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchCollectionById({ commit }, { id }) {
    try {
      const response = await this.$axios.get(
        `/owner/management/collection/show/${id}`
      );
      if (response) {
        const collection = response.data.content;
        commit("setCollection", collection);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllCollections({ commit }) {
    try {
      const response = await this.$axios.get(
        "/owner/management/collection/show/all/name"
      );
      if (response) {
        const collections = response.data.content;
        commit("setCollectionsAll", collections);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
