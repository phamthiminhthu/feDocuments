<template>
  <div class="mt-24">
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold"
    >
      Profile
    </h3>
    <div v-if="username" class="mt-12">
      <div>
        <UserCommon
          :username="username"
          :countFollower="followerCount"
          :countFollowing="followingCount"
          @update-status-follow="resetCount"
        />
      </div>
      <div class="document-publics w-4/5" style="margin: 0 auto">
        <DocumentShowItems
          :documents="documentsPublic"
          v-if="documentsPublic"
          @document-updated="handleUpdateDocuments"
          class="mt-16"
        />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
export default {
  layout(context) {
    if (context.params.username === context.$cookies.get("currentUsername")) {
      return "base";
    }
    return "guest";
  },
  meta: {
    requiresAuth: false,
  },
  mounted() {
    this.fetchDocumentsPublicByUsername();
    this.getUserFollowing();
    this.getUserFollower();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    documentsPublic() {
      return this.$store.getters["documents/getDocuments"];
    },
    followingCount() {
      return this.$store.getters["user/getFollowingCount"];
    },
    followerCount() {
      return this.$store.getters["user/getFollowersCount"];
    },
  },
  methods: {
    async fetchDocumentsPublicByUsername() {
      await this.$store.dispatch("documents/fetchDocumentsPublicByUsername", {
        username: this.username,
      });
    },
    handleUpdateDocuments() {
      this.fetchDocumentsPublicByUsername();
    },
    async getUserFollower() {
      this.$store.dispatch("user/fetchDataUserFollower", {
        username: this.username,
      });
    },
    async getUserFollowing() {
      this.$store.dispatch("user/fetchDataUserFollowing", {
        username: this.username,
      });
    },
    resetCount() {
      this.getUserFollowing();
      this.getUserFollower();
    },
  },
};
</script>
