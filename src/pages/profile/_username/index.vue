<template>
  <div class="pt-36">
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold"
    >
      Profile
    </h3>
    <div v-if="user" class="mt-12">
      <div class="avatar text-center">
        <div v-if="user.image == null">
          <img src="~/assets/image/avatar/avatar-default.png" alt="avatar" style="margin: 0 auto;"/>
        </div>
        <div v-else>
          <v-avatar size="240">
            <img :src="user.image" :alt="user.username" />
          </v-avatar>
        </div>
      </div>
      <div class="information-profile text-center">
        <div v-if="user.fullname != null">
          {{ user.fullname }}
        </div>
        <div class="landing-font-24 mt-3">
          {{ user.username }}
        </div>
        <div>
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            @click="changeStatusFollow"
          >
            {{ status }}
          </v-btn>
        </div>
        <div v-if="user.introduce != null" class="landing-font-18 mt-4">
          {{ user.introduce }}
        </div>
        <div>{{ followerCount }} - {{ followingCount }}</div>
      </div>
      <div class="document-publics w-4/5" style="margin: 0 auto;">
        <DocumentShowItems
          :documents="documentsPublic"
          v-if="documentsPublic"
          class="mt-16"
        />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
export default {
  layout: "guest",
  meta: {
    requiresAuth: false,
  },
  data() {
    return {
      status: "",
    };
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("user/fetchDataUserByUsername", {
        username: this.username,
      }),
      this.$store.dispatch("user/fetchDataUserFollower", {
        username: this.username,
      }),
      this.$store.dispatch("user/fetchDataUserFollowing", {
        username: this.username,
      }),
    ]);
    this.getInforFollowing();
    this.fetchDocumentsPublicByUsername();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    user() {
      return this.$store.getters["user/getUser"];
    },
    followingCount() {
      return this.$store.getters["user/getFollowingCount"];
    },
    followerCount() {
      return this.$store.getters["user/getFollowersCount"];
    },
    documentsPublic() {
      return this.$store.getters["documents/getDocuments"];
    },
  },
  methods: {
    async getInforFollowing() {
      try {
        const response = await this.$axios.get(
          `/user/status/following?username=${this.username}`
        );
        if (response) {
          this.status = response.data.content;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async changeStatusFollow() {
      try {
        if (this.status === "Follow") {
          const response = await this.$axios.post(
            `/user/follow?username=${this.username}`
          );
          if (response) {
            this.status = "Unfollow";
          }
        } else if (this.status === "Unfollow") {
          const response = await this.$axios.post(
            `/user/unfollow?username=${this.username}`
          );
          if (response) {
            this.status = "Follow";
          }
        } else if (this.status === "Edit Profile") {
          this.$router.push(`/profile/${this.username}/edit`);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDocumentsPublicByUsername() {
      await this.$store.dispatch("documents/fetchDocumentsPublicByUsername", {
        username: this.username,
      });
    },
  },
};
</script>
