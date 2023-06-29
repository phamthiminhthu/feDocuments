<template>
  <div>
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold"
    >
      Follower
    </h3>
    <div>
      <FollowUsers
        v-if="follower"
        :username="username"
        :users="follower"
        @update-status="updateDataFollowing"
      />
    </div>
  </div>
</template>
<script>
export default {
  layout: "guest",
  meta: {
    requiresAuth: false,
  },
  mounted() {
    this.fetchDataUsersFollower();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    follower() {
      return this.$store.getters["user/getFollowers"];
    },
  },
  methods: {
    async fetchDataUsersFollower() {
      await this.$store.dispatch("user/fetchDataUserFollower", {
        username: this.username,
      });
    },
    updateDataFollowing() {
      this.fetchDataUsersFollower();
    },
  },
};
</script>
