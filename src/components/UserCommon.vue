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
      <div v-if="user.fullname !== null" class="mt-5 landing-font-24 font-bold">
        {{ user.fullname }}
      </div>
      <div class="landing-font-20 mt-3 font-semibold">
        <nuxt-link :to="`/profile/${user.username}`">
          {{ user.username }}
        </nuxt-link>
      </div>
      <div v-if="user.introduce != null" class="landing-font-18 mt-4">
        {{ user.introduce }}
      </div>
      <div class="mt-6">
        <v-chip class="ma-2" color="amber darken-4" label text-color="white">
          <nuxt-link :to="`/profile/${user.username}/follower`">
            <v-icon left color="white"> mdi-account-heart </v-icon>
            <span style="color: white">
              <strong>{{ countFollower }}</strong>
              <span class="ml-2 subheading"> Follower </span>
            </span>
          </nuxt-link>
        </v-chip>
        <v-icon>mdi-minus</v-icon>
        <v-chip class="ma-2" color="amber darken-1" label text-color="white">
          <nuxt-link :to="`/profile/${user.username}/following`">
            <v-icon left color="white"> mdi-account-star </v-icon>
            <span style="color: white">
              <strong> {{ countFollowing }}</strong>
              <span class="ml-2"> Following </span></span
            >
          </nuxt-link>
        </v-chip>
      </div>
      <div class="mt-5">
        <v-btn class="ma-2" outlined color="amber darken-4" @click="changeStatusFollow">
          {{ status }}
        </v-btn>
      </div>
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
    countFollowing: {
      type: Number,
      default: 0,
    },
    countFollower: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.getUserByUsername();
    this.getInforFollowing();
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
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
          this.$cookies.set("groupIndex", 3);
          this.$cookies.set("itemIndex", 0);
          this.$router.push(`/profile/${this.username}/edit`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
