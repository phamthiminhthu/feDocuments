<template>
  <div>
    <v-list v-if="users != null">
      <template v-if="users.length > 0" v-for="(item, index) in users">
        <v-divider v-if="index != 0" :key="index"></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img v-if="item.image != null" :src="item.image"></v-img>
            <img
              v-else
              src="~/assets/image/avatar/avatar-default.png"
              alt="avatar"
              style="margin: 0 auto"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <span
                class="landing-font-16 font-semibold"
                v-if="item.fullname != null"
              >
                {{ item.fullname }}
              </span>
              <span
                class="landing-font-14 font-semibold text-slate-500"
                v-if="item.username != null"
              >
                {{ item.username }}
              </span>
            </v-list-item-title>
            <v-list-item-subtitle v-if="item.introduce != null">{{
              item.introduce
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-if="item.follower !== 2">
            <v-btn
              v-if="item.follower === 1"
              class="ma-2"
              outlined
              color="indigo"
            >
              Unfollow
            </v-btn>
            <v-btn
              v-if="item.follower === 0"
              class="ma-2"
              outlined
              color="indigo"
            >
              Following
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    users: null,
  },
};
</script>
