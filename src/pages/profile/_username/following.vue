<template>
  <div>
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold mt-28"
    >
      Following
    </h3>
    <div>
      <FollowUsers
        :username="username"
        :users="following"
        v-if="following"
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
  layout: 'guest',
  data() {
    return {
      ownerStatus: false,
    };
  },
  mounted() {
    this.fetchDataUsersFollowing();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    following() {
      return this.$store.getters["user/getFollowing"];
    },
  },
  methods: {
    async fetchDataUsersFollowing() {
      await this.$store.dispatch("user/fetchDataUserFollowing", {
        username: this.username,
      });
    },
    updateDataFollowing() {
      this.fetchDataUsersFollowing();
    },
  },
};
</script>
