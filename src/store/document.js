export const state = () => ({
  document: null,
  urls: null,
  // dataPDF: null,
});

export const mutations = {
  setDocument(state, value) {
    state.document = value;
  },
  setUrls(state, value) {
    state.urls = value;
  },
  // setDataPDF(state, value) {
  //   state.dataPDF = value;
  // },
};

export const actions = {
  async fetchDataDocumentByDocumentKey({ commit }, { documentKey }) {
    try {
      const response = await this.$axios.get(
        `/management/document/show/details/${documentKey}`
      );
      if (response) {
        const document = response.data.content;
        commit("setDocument", document);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUrlsDocumentByDocumentKey({ commit }, { documentKey }) {
    try {
      const response = await this.$axios.get(
        `/management/document/url/show/all?documentKey=${documentKey}`
      );
      if (response) {
        const urls = response.data.content;
        commit("setUrls", urls);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDataPDFDocumentByDocumentKey({ commit }, { documentKey }) {
    // try {
    //   const response = await this.$axios.get(
    //     `/management/document/display/${documentKey}`,
    //     { responseType: "arraybuffer" }
    //   );
    //   if (response) {
    //     console.log(response.data);
    //     commit("setDataPDF", response.data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  },
};

export const getters = {
  getDocument: (state) => state.document,
  getUrls: (state) => state.urls,
  // getDataPDF: (state) => state.dataPDF,
};
