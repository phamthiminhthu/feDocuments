<template>
  <div class="search-data">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-x
      class="menu-search"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
          class="float-right mr-5"
        >
          <v-icon> mdi-filter-multiple</v-icon>
          <span>Search</span>
        </v-btn>
      </template>

      <v-card class="card-search-data">
        <v-list class="!p-0">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Filter By</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon large @click="menu = false" color="black"
                >mdi-alpha-x</v-icon
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-toolbar color="indigo" dark flat class="!h-[64px]">
          <template v-slot:extension>
            <v-tabs v-model="model" slider-color="yellow">
              <v-tab href="#tab-tags"> Tags </v-tab>
              <v-tab href="#tab-typeDocs"> Type Document </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="model">
          <v-tab-item value="tab-tags">
            <v-card flat>
              <v-card-text>
                <v-text-field
                  v-model="searchByTags"
                  class="mt-3"
                  append-icon="mdi-magnify"
                  placeholder="Search by tags"
                  outlined
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-typeDocs">
            <v-card flat>
              <v-card-text>
                <v-text-field
                  v-model="searchByTypeDocs"
                  class="mt-3"
                  append-icon="mdi-magnify"
                  placeholder="Search by type documents"
                  outlined
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="search"> Search </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    menu: false,
    searchByTags: "",
    searchByTypeDocs: "",
    model: "tab-tags",
  }),
  methods: {
    search() {
      if (this.model == "tab-tags") {
        this.$emit('search-by-tags', this.searchByTags);
      } else if (this.model == "tab-typeDocs") {
        this.$emit('search-by-type-docs', this.searchByTypeDocs);
      }
    }
  }
};
</script>
<style lang="scss">
.card-search-data {
  .v-toolbar__content {
    height: 15px !important;
  }
}
</style>
