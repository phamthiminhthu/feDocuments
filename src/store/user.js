export const state = () => ({
  user: null,
  following: null,
  followers: null,
  followerCount: 0,
  followingCount: 0,
  currentUser: {},
  currentUserName: null,
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
  },
  setCurrentUserName(state, value) {
    state.currentUserName = value;
  },
  setCurrentUser(state, value) {
    state.currentUser = value;
  },
};

export const getters = {
  getUser: (state) => state.user,
  getFollowing: (state) => state.following,
  getFollowers: (state) => state.followers,
  getFollowersCount: (state) => state.followerCount,
  getFollowingCount: (state) => state.followingCount,
  getCurrentUserName: (state) => state.currentUserName,
  getCurrentUser: (state) => state.currentUser,
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
  async fetchDataUserFollowing({ commit }, { username }) {
    try {
      const response = await this.$axios.get(
        `/user/following?username=${username}`
      );
      const following = response.data.content;
      commit("setFollowing", following);
      commit("setFollowingCount", following.length);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDataUserFollower({ commit }, { username }) {
    try {
      const response = await this.$axios.get(
        `/user/follower?username=${username}`
      );
      const follower = response.data.content;
      commit("setFollowers", follower);
      commit("setFollowersCount", follower.length);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchCurrentUserName({ commit }) {
    try {
      const email = this.$cookies.get("email");
      if (email) {
        const response = await this.$axios.get(
          `/user/username/show?email=${email}`
        );
        if (response) {
          const username = response.data.content;
          this.$cookies.set("currentUsername", username);
          commit("setCurrentUserName", username);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchCurrentUser({ commit }) {
    try {
      const response = await this.$axios.get(`/user/information/by-token`);
      if (response) {
        const user = response.data.content;
        this.$cookies.set("email", user.email);
        commit("setCurrentUser", user);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
