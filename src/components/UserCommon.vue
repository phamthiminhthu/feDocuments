<template>
  <div v-if="user" class="mt-12">
    <div class="avatar text-center">
      <div v-if="user.image == null">
        <img
          src="~/assets/image/avatar/avatar-default.png"
          alt="avatar"
          style="margin: 0 auto"
        />
      </div>
      <div v-else>
        <v-avatar size="240">
          <img :src="user.image" :alt="user.username" />
        </v-avatar>
      </div>
    </div>
    <div class="information-profile text-center">
      <div v-if="user.fullname !== null">
        {{ user.fullname }}
      </div>
      <div class="landing-font-24 mt-3">
        {{ user.username }}
      </div>
      <div>
        <v-btn class="ma-2" outlined color="indigo" @click="changeStatusFollow">
          {{ status }}
        </v-btn>
      </div>
      <div v-if="user.introduce != null" class="landing-font-18 mt-4">
        {{ user.introduce }}
      </div>
      <div>{{ followerCount }} - {{ followingCount }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: null,
    };
  },
  props: {
    username: {
      type: String,
      default: null,
      required: true,
    },
  },
  mounted() {
    this.getUserByUsername();
    this.getInforFollowing();
    this.getUserFollowing();
    this.getUserFollower();
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    followingCount() {
      return this.$store.getters["user/getFollowingCount"];
    },
    followerCount() {
      return this.$store.getters["user/getFollowersCount"];
    },
  },
  methods: {
    async getUserByUsername() {
      await this.$store.dispatch("user/fetchDataUserByUsername", {
        username: this.username,
      });
    },
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
            this.$emit("update-status-follow");
          }
        } else if (this.status === "Unfollow") {
          const response = await this.$axios.post(
            `/user/unfollow?username=${this.username}`
          );
          if (response) {
            this.status = "Follow";
            this.$emit("update-status-follow");
          }
        } else if (this.status === "Edit Profile") {
          this.$router.push(`/profile/${this.username}/edit`);
        }
      } catch (error) {
        console.log(error);
      }
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
  },
};
</script>
