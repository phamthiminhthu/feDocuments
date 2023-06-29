<template>
  <v-container fluid class="mt-8" :key="count">
    <v-row>
      <v-col cols="4">
        <UserCommon :username="username" @update-status-follow="updateFollow" />
      </v-col>
      <v-col cols="8">
        <v-list-item v-for="user in users" :key="user.username" class="w-4/5">
          <v-list-item-avatar>
            <v-img v-if="user.image != null" :src="user.image"></v-img>
            <img
              v-else
              src="~/assets/image/avatar/avatar-default.png"
              alt="avatar"
              style="margin: 0 auto"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <nuxt-link
              :to="`/profile/${user.username}`"
              class="!text-black landing-font-18 font-semibold"
            >
              <v-list-item-title
                v-if="user.fullname != null"
                v-text="user.fullname"
              ></v-list-item-title>

              <v-list-item-subtitle
                v-text="user.username"
              ></v-list-item-subtitle>
            </nuxt-link>
          </v-list-item-content>

          <v-list-item-action v-if="currentUser !== user.username">
            <v-btn
              v-if="user.follower === 1"
              class="ma-2"
              outlined
              color="indigo"
              small
              @click="unfollow(user)"
            >
              Unfollow
            </v-btn>
            <v-btn
              v-else
              class="ma-2"
              outlined
              color="indigo"
              small
              @click="follow(user)"
            >
              Follow
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      currentUser: this.$cookies.get("currentUsername"),
      count: 0,
    };
  },
  props: {
    username: {
      type: String,
      default: null,
      required: true,
    },
    users: {
      type: Array,
      default: null,
      required: true,
    },
  },
  methods: {
    updateFollow() {
      this.$emit("update-status");
    },
    async follow(user) {
      const response = await this.$axios.post(
        `/user/follow?username=${user.username}`
      );
      if (response) {
        this.count += 1;
        user.follower === 0;
      }
    },
    async unfollow(user) {
      const response = await this.$axios.post(
        `/user/unfollow?username=${user.username}`
      );
      if (response) {
        this.count += 1;
        user.follower === 1;
      }
    },
  },
};
</script>
