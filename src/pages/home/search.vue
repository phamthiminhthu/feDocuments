<template>
  <div>
    <div class="text-center landing-title-page mt-36 mb-10">
      Results search by {{ search.typeSearch }} *{{ search.querySearch }}*
    </div>

    <v-container>
      <div>
        <v-spacer></v-spacer>
        <SearchPublicButton
          @search-document-by-tags="searchDocumentByTag"
          @search-document-by-type-docs="searchDocumentByTypeDocs"
          @search-user-by-username-or-fullname="searchUserByUsernameOrFullname"
          @search-user-by-email="searchUserByEmail"
        />
      </div>
      <v-row class="py-16">
        <v-col cols="12">
          <DocumentShowItems
            v-if="
              resultsSearch && resultsSearch instanceof Array &&
              (search.typeSearch === 'tag' || search.typeSearch === 'typeDocs')
            "
            :documents="resultsSearch"
            @document-updated="handleDocumentUpdated"
          />
          <UserItems
            v-else-if="resultsSearch && resultsSearch instanceof Array && search.typeSearch === 'name'"
            :users="resultsSearch"
          />
          <v-list-item v-else-if="resultsSearch && !(resultsSearch instanceof Array) && search.typeSearch === 'email'">
            <v-list-item-avatar>
              <v-img
                v-if="resultsSearch.image != null"
                :src="resultsSearch.image"
              ></v-img>
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
                  v-if="resultsSearch.fullname != null"
                >
                  {{ resultsSearch.fullname }}
                </span>
                <span
                  class="landing-font-14 font-semibold text-slate-500"
                  v-if="resultsSearch.username != null"
                >
                  {{ resultsSearch.username }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle v-if="resultsSearch.introduce != null">{{
                resultsSearch.introduce
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="resultsSearch.follower !== 2">
              <v-btn
                v-if="resultsSearch.follower === 1"
                class="ma-2"
                outlined
                color="indigo"
              >
                Unfollow
              </v-btn>
              <v-btn
                v-if="resultsSearch.follower === 0"
                class="ma-2"
                outlined
                color="indigo"
              >
                Following
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: "guest",
  mounted() {
    if (this.search.typeSearch === "tag") {
      this.fetchDocumentsByTag();
    }
    if (this.search.typeSearch === "typeDocs") {
      this.fetchDocumentsByTypeDocs();
    }
    if (this.search.typeSearch === "name") {
      this.fetchUsersByName();
    }
    if (this.search.typeSearch === "email") {
      this.fetchUsersByEmail();
    }
  },
  computed: {
    search() {
      return {
        typeSearch: this.$route.query.type,
        querySearch: this.$route.query.query,
      };
    },
    resultsSearch() {
      return this.$store.getters["search/getObjectsSearch"];
    },
  },
  watch: {
    search() {
      if (this.search.typeSearch === "tag") {
        this.fetchDocumentsByTag();
      }
      if (this.search.typeSearch === "typeDocs") {
        this.fetchDocumentsByTypeDocs();
      }
      if (this.search.typeSearch === "name") {
        this.fetchUsersByName();
      }
      if (this.search.typeSearch === "email") {
        this.fetchUsersByEmail();
      }
    },
  },
  methods: {
    async fetchDocumentsByTag() {
      if (this.search.querySearch) {
        await this.$store.dispatch("search/fetchDocumentsSearchByTag", {
          tagName: this.search.querySearch,
        });
      }
    },
    async fetchDocumentsByTypeDocs() {
      if (this.search.querySearch) {
        await this.$store.dispatch(
          "search/fetchDocumentsSearchByTypeDocument",
          {
            typeName: this.search.querySearch,
          }
        );
      }
    },
    async fetchUsersByName() {
      if (this.search.querySearch) {
        await this.$store.dispatch(
          "search/fetchUsersSearchByUsernameOrFullname",
          {
            name: this.search.querySearch,
          }
        );
      }
    },
    async fetchUsersByEmail() {
      if (this.search.querySearch) {
        await this.$store.dispatch("search/fetchUsersSearchByEmail", {
          email: this.search.querySearch,
        });
      }
    },

    handleDocumentUpdated() {},

    async searchDocumentByTag(tags) {
      this.$router.push(
        `/home/search?type=tag&query=${encodeURIComponent(tags)}`
      );
    },
    async searchDocumentByTypeDocs(typeDocs) {
      this.$router.push(
        `/home/search?type=typeDocs&query=${encodeURIComponent(typeDocs)}`
      );
    },
    async searchUserByUsernameOrFullname(name) {
      this.$router.push(
        `/home/search?type=name&query=${encodeURIComponent(name)}`
      );
    },
    async searchUserByEmail(email) {
      this.$router.push(
        `/home/search?type=email&query=${encodeURIComponent(email)}`
      );
    },
  },
};
</script>
