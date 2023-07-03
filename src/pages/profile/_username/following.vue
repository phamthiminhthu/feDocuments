<template>
  <div>
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold mt-24"
    >
      Following
    </h3>
    <div>
      <FollowUsers
        v-if="following"
        :username="username"
        :users="following"
        :countFollowing="following.length"
        :countFollower="followerCount"
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
    this.fetchDataUsersFollowing();
    this.fetchDataUsersFollower();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    following() {
      return this.$store.getters["user/getFollowing"];
    },
    followerCount() {
      return this.$store.getters["user/getFollowersCount"];
    },
  },
  methods: {
    async fetchDataUsersFollowing() {
      await this.$store.dispatch("user/fetchDataUserFollowing", {
        username: this.username,
      });
    },
    async fetchDataUsersFollower() {
      await this.$store.dispatch("user/fetchDataUserFollower", {
        username: this.username,
      });
    },
    updateDataFollowing() {
      this.fetchDataUsersFollowing();
      this.fetchDataUsersFollower();
    },
  },
};
</script>
