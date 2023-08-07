<template>
  <v-toolbar color="#111827" dark class="!fixed top-0 z-50 w-full !h-[75px]">
    <v-toolbar-title class="mt-2">
      <v-btn @click="redirectDashboard" class="!h-[75px] !bg-[#111827]">
        <img
          src="~/assets/image/logo/logo.jpg"
          class="w-[56px] h-auto border-2 border-slate-300 inline-block"
          style="border-radius: 50%"
        />
        <span class="landing-logo ml-2">Docskanry</span>
      </v-btn>
    </v-toolbar-title>

    <!-- <span class="subheading">Dashboard</span> -->

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text class="mt-[5px]" @click="redirectHome">
        <span
          :class="
            pageActive === 'Introduce' ? 'color-active' : 'color-no-active'
          "
        >
          Introduce
        </span>
      </v-btn>
      <v-divider vertical></v-divider>

      <v-btn v-if="loggedIn" text class="mt-[5px]" @click="redirectDashboard">
        <span
          :class="
            pageActive === 'Dashboard' ? 'color-active' : 'color-no-active'
          "
        >
          Dashboard
        </span>
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text class="mt-[5px]" v-if="loggedIn">
        <nuxt-link
          to="/home"
          :class="pageActive === 'Home' ? 'color-active' : ''"
        >
          Home
        </nuxt-link>
      </v-btn>
      <v-btn v-if="!loggedIn" text class="mt-[5px]">
        <nuxt-link to="/login"> Login </nuxt-link>
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn v-if="!loggedIn" text class="mt-[5px]">
        <nuxt-link to="/signup"> Create Account </nuxt-link>
      </v-btn>

      <v-btn text v-if="loggedIn">
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="brown" size="48" v-if="user['image'] != null">
                <v-img :src="user['image']"></v-img>
              </v-avatar>
              <v-avatar v-else>
                <img
                  src="~/assets/image/avatar/avatar-default.png"
                  alt="avatar"
                  style="margin: 0 auto"
                />
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="brown" v-if="user['image'] != null">
                  <v-img :src="user['image']"></v-img>
                </v-avatar>
                <v-avatar v-else>
                  <img
                    src="~/assets/image/avatar/avatar-default.png"
                    alt="avatar"
                    style="margin: 0 auto"
                  />
                </v-avatar>
                <h3 v-if="user['username'] != null">{{ user["username"] }}</h3>
                <p class="text-caption mt-1">
                  {{ user["email"] }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  @click="redirectProfile(user['username'])"
                >
                  <v-icon dense> mdi-account-edit </v-icon>
                  <span class="ml-1"> Profile </span>
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click="logout">
                  <v-icon dense> mdi-logout </v-icon>
                  <span class="ml-1">Sign Out</span>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    pageActive: {
      type: String,
      default: null,
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.getCurrentUser();
    }
  },
  computed: {
    loggedIn() {
      console.log(this.$store.getters["auth/getIsLoggedIn"]);
      return this.$store.getters["auth/getIsLoggedIn"];
    },
    user() {
      if (this.loggedIn) {
        let user = this.$store.getters["user/getCurrentUser"];
        this.$cookies.set("currentUsername", user["username"]);
        return user;
      }
    },
  },
  methods: {
    async getCurrentUser() {
      await this.$store.dispatch("user/fetchCurrentUser");
    },
    async logout() {
      this.$cookies.removeAll();
      this.$router.push("/login");
    },
    redirectDashboard() {
      if (this.$cookies.get("token")) {
        this.$cookies.set("groupIndex", 0);
        this.$cookies.set("itemIndex", 0);
        this.$router.push("/dashboard/all-references");
      } else {
        this.$router.push("/login");
      }
    },
    redirectProfile(username) {
      if (this.$cookies.get("token")) {
        this.$cookies.set("groupIndex", 3);
        this.$cookies.set("itemIndex", 0);
        this.$router.push("/profile/" + username);
      }
    },
    redirectHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style>
.color-active {
  color: white !important;
}

.color-no-active {
  color: #757575 !important;
}
</style>
