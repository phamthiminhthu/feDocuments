<template>
  <div>
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold mt-24"
      v-if="follower"
    >
      Follower
    </h3>
    <div>
      <FollowUsers
        v-if="follower"
        :username="username"
        :users="follower"
        :countFollower="follower.length"
        :countFollowing="followingCount"
        @update-status="updateDataFollowing"
      />
    </div>
  </div>
</template>
<script>
export default {
  meta: {
    requiresAuth: false,
  },
  layout(context) {
    if (context.params.username === context.$cookies.get('currentUsername')) {
      return 'base';
    }
    return 'guest'
  },
  mounted() {
    this.fetchDataUsersFollower();
    this.fetchDataUsersFollowing();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    follower() {
      return this.$store.getters["user/getFollowers"];
    },
    followingCount() {
      return this.$store.getters["user/getFollowingCount"];
    },
  },
  methods: {
    async fetchDataUsersFollower() {
      await this.$store.dispatch("user/fetchDataUserFollower", {
        username: this.username,
      });
    },
    async fetchDataUsersFollowing() {
      this.$store.dispatch("user/fetchDataUserFollowing", {
        username: this.username,
      });
    },
    updateDataFollowing() {
      this.fetchDataUsersFollower();
      this.fetchDataUsersFollowing();
    },
  },
};
</script>
