export const state = () => ({
    documents: null
})

export const mutations =  {
    setDocuments(state, value) {
        state.documents = value
    }
}

export const actions = {
    async fetchDataAllDocuments({commit}){
        try{
            const response = await this.$axios.get('/management/document/show/all');
            if(response){
                const documents = response.data.content;
                commit("setDocuments", documents);
            }
        }catch(error){
            console.log(error);
        }
    },

    // async updateLovedDocument({ commit }, documentKey) {
    //     try {
    //         const response = await this.$axios.post(`/management/document/update/loved?documentKey=${documentKey}`);
    //         console.log(response);
    //         if (response) {
    //             const document = response.data
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

export const getters = {
    getDocuments: (state) => state.documents,
}