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
    <v-tabs-items v-model="tab" class="mt-36">
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
              <v-col cols="3">
                <div class="following-list !fixed">
                  <v-text-field
                    v-model="searchKey"
                    class="mx-4 w-4/5 mt-6 ml-6"
                    label="Search"
                    append-icon="mdi-magnify"
                  ></v-text-field>
                  <v-list
                    v-if="usersFollowing != null && usersFollowing.length > 0"
                  >
                    <v-subheader>Following</v-subheader>
                    <v-list-item
                      v-for="(userFollowing, index) in usersFollowing"
                      :key="userFollowing.username + index"
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
                        <nuxt-link
                          :to="`/profile/${userFollowing.username}`"
                          class="!text-black landing-font-18 font-semibold"
                        >
                          <v-list-item-title>
                            {{ userFollowing.username }}
                          </v-list-item-title>
                        </nuxt-link>
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
                  @document-updated="handleDocumentUpdatedSuggestedForYou"
                  v-if="suggestedDocs"
                />
              </v-col>
              <v-col cols="3">
                <div class="following-list !fixed">
                  <v-text-field
                    v-model="searchKey"
                    class="mx-4 w-4/5 mt-6 ml-6"
                    label="Search"
                    append-icon="mdi-magnify"
                  ></v-text-field>
                  <v-list
                    v-if="usersSuggested != null && usersSuggested.length > 0"
                  >
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
      itemsTypeSearch: ['Tag', 'Type Document', 'User', 'Title Document'],
      selectedType: null,
      searchKey: null,
    };
  },
  async mounted() {
    await this.fetchCurrentUser();
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
    username() {
      return this.$store.getters["user/getCurrentUserName"];
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
      if (this.$cookies.get("currentUserName") != null) {
        await this.$store.dispatch("user/fetchDataUserFollowing", {
          username: this.$cookies.get("currentUserName"),
        });
      } else {
        await this.$store.dispatch("user/fetchDataUserFollowing", {
          username: this.username,
        });
      }
    },
    async fetchUsersSuggested() {
      await this.$store.dispatch("documents/fetchUsersSuggested");
    },
    async fetchCurrentUser() {
      await this.$store.dispatch("user/fetchCurrentUser");
    },
    handleDocumentUpdated() {
      this.getAllDocumentsFollowing();
    },
    handleDocumentUpdatedSuggestedForYou() {
      this.getAllDocumentsSuggested();
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
