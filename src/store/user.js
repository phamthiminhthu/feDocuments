export const state = () => ({
  user: null,
  following: null,
  followers: null,
  followerCount: 0,
  followingCount: 0
});

export const mutations = {
  setUser(state, value) {
    state.user = value;
  },
  setFollowing(state, value) {
    state.following = value;
  },
  setFollowers(state, value) {
    state.followers = value;
  },
  setFollowersCount(state, value) {
    state.followerCount = value;
  },
  setFollowingCount(state, value) {
    state.followingCount = value;
  }
};

export const getters = {
  getUser: (state) => state.user,
  getFollowing: (state) => state.following,
  getFollowers: (state) => state.followers,
  getFollowersCount: (state) => state.followerCount,
  getFollowingCount: (state) => state.followingCount
};

export const actions = {
  async fetchDataUserByUsername({ commit }, { username }) {
    try {
      const response = await this.$axios.get(`/user/profile/${username}`);
      const user = response.data.content;
      commit("setUser", user);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  },
  async fetchDataUserFollowing({commit}, {username}){
    try{
      const response = await this.$axios.get(`/user/profile/${username}/following`);
      const following = response.data.content;
      console.log(following);
      commit("setFollowing", following);
      commit("setFollowingCount", following.length);
    }catch (error) {
      console.log(error);
    }
  },
  async fetchDataUserFollower({commit}, {username}){
    try{
      const response = await this.$axios.get(`/user/profile/${username}/follower`);
      const follower = response.data.content;
      console.log(follower)
      commit("setFollowers", follower);
      commit("setFollowersCount", follower.length)
    }catch (error) {
      console.log(error);
    }
  },
  
};
