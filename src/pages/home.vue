<template>
  <v-card class="tabs-home !shadow-none">
    <v-toolbar
      color="#111827"
      dark
      flat
      class="!h-[65px] !border-none !fixed top-[65px] w-full z-50 left-0"
    >
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab" class="mt-[128px]">
      <v-tab-item v-for="item in items" :key="item.title">
        <v-card flat v-if="item === 'Following'">
          <v-container fluid>
            <v-row>
              <v-col cols="9">
                <DocumentShowItems
                  :documents="documents"
                  @document-updated="handleDocumentUpdated"
                  v-if="documents"
                />
              </v-col>
              <v-col
                cols="3"
                v-if="usersFollowing != null && usersFollowing.length > 0"
              >
                <div class="following-list">
                  <v-list>
                    <v-subheader>Following</v-subheader>
                    <v-list-item
                      v-for="userFollowing in usersFollowing"
                      :key="userFollowing.username"
                    >
                      <v-list-item-avatar>
                        <v-img
                          v-if="userFollowing.image != null"
                          :alt="`${userFollowing.username} avatar`"
                          :src="userFollowing.image"
                        ></v-img>
                        <v-icon v-else> mdi-account-circle </v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          <nuxt-link
                            :to="`/profile/${userFollowing.username}`"
                            class="!text-black landing-font-18 font-semibold"
                          >
                            {{ userFollowing.username }}
                          </nuxt-link>
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-icon>
                        <v-btn class="ma-2" outlined color="indigo" small>
                          Following
                        </v-btn>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card flat v-if="item === 'Recommended For You'">
          <v-container fluid>
            <v-row>
              <v-col cols="9">
                <DocumentShowItems
                  :documents="suggestedDocs"
                  v-if="suggestedDocs"
                />
              </v-col>

              <v-col
                cols="3"
                v-if="usersSuggested != null && usersSuggested.length > 0"
              >
                <div class="following-list">
                  <v-list>
                    <v-subheader>Suggestion</v-subheader>
                    <v-list-item
                      v-for="user in usersSuggested"
                      :key="user.username"
                    >
                      <v-list-item-avatar>
                        <v-img
                          v-if="user.image != null"
                          :alt="`${user.username} avatar`"
                          :src="user.image"
                        ></v-img>
                        <v-icon v-else> mdi-account-circle </v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          <nuxt-link
                            :to="`/profile/${user.username}`"
                            class="!text-black landing-font-18 font-semibold"
                          >
                            {{ user.username }}
                          </nuxt-link>
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-icon>
                        <v-btn class="ma-2" outlined color="indigo" small>
                          Follow
                        </v-btn>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  layout: "guest",
  data() {
    return {
      tab: null,
      items: ["Following", "Recommended For You"],
      username: null,
    };
  },
  mounted() {
    this.fetchUserFollowing();
    this.getAllDocumentsFollowing();
    this.getAllDocumentsSuggested();
    this.fetchUsersSuggested();
  },
  computed: {
    documents() {
      return this.$store.getters["documents/getDocuments"];
    },
    suggestedDocs() {
      return this.$store.getters["documents/getSuggestedDocs"];
    },
    usersFollowing() {
      return this.$store.getters["user/getFollowing"];
    },
    usersSuggested() {
      return this.$store.getters["documents/getSuggestedUserList"];
    },
  },
  methods: {
    async getAllDocumentsFollowing() {
      await this.$store.dispatch("documents/fetchDocumentsFollowing");
    },
    async getAllDocumentsSuggested() {
      await this.$store.dispatch("documents/fetchDocumentsSuggested");
    },
    async fetchUserFollowing() {
      if (this.$cookies.get("currentUsername")) {
        this.username = this.$cookies.get("currentUsername");
        await this.$store.dispatch("user/fetchDataUserFollowing", {
          username: this.username,
        });
      } else {
        await this.$store.dispatch("user/fetchCurrentUserName");
        this.username = this.$store.getters["user/getCurrentUserName"];
        await this.$store.dispatch("user/fetchDataUserFollowing", {
          username: this.username,
        });
      }
    },
    async fetchUsersSuggested() {
      await this.$store.dispatch("documents/fetchUsersSuggested");
    },
    handleDocumentUpdated() {
      this.getAllDocumentsFollowing();
    },
  },
};
</script>
<style lang="scss">
.tabs-home {
  .v-toolbar__content {
    height: 15px !important;
  }
}
</style>
