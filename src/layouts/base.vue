<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <div class="flex gap-[6px]">
          <div class="menu-bar flex-none w-64 bg-[#111827]">
            <aside
              id="separator-sidebar"
              class="relative z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div class="px-2 py-2">
                <div class="fixed top-0 left-0 z-50 w-64 bg-[#111827] py-4">
                  <a href="#" class="flex items-center px-3">
                    <img
                      src="~/assets/image/logo/logo.jpg"
                      class="w-[64px] h-auto border-2 border-slate-300 inline-block"
                      style="border-radius: 50%"
                    />
                    <div class="landing-logo ml-2">Docskanry</div>
                  </a>
                </div>
                <div class="h-screen">
                  <div
                    class="px-0 py-10 h-full overflow-y-auto scrollbar"
                  >
                    <ul
                      class="mt-12 space-y-2 font-medium pl-1 border-t border-gray-200"
                    >
                      <v-list-group
                        :value="true"
                        prepend-icon="mdi-view-dashboard"
                      >
                        <template v-slot:activator>
                          <v-list-item-title class="landing-font-14"
                            >Dashboard</v-list-item-title
                          >
                        </template>
                        <v-list-item
                          v-for="([title, icon], i) in documents"
                          :key="i"
                          link
                          class="pl-8"
                        >
                          <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                          </v-list-item-icon>
                          <v-list-item-title
                            v-text="title"
                            class="landing-font-14"
                          ></v-list-item-title>
                        </v-list-item>
                      </v-list-group>
                    </ul>
                    <ul
                      class="mt-4 space-y-2 font-medium border-t border-gray-200 pl-1"
                    >
                      <v-list-group
                        :value="true"
                        prepend-icon="mdi-bookmark-box-multiple"
                      >
                        <template v-slot:activator>
                          <v-list-item-title class="landing-font-14"
                            >Collections</v-list-item-title
                          >
                        </template>
                      </v-list-group>
                    </ul>
                    <ul
                      class="mt-4 space-y-2 font-medium border-t border-gray-200 pl-1"
                    >
                      <v-list-group
                        :value="true"
                        prepend-icon="mdi-account-multiple"
                      >
                        <template v-slot:activator>
                          <v-list-item-title class="landing-font-14"
                            >Groups</v-list-item-title
                          >
                        </template>
                      </v-list-group>
                    </ul>
                    <ul
                      class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 pl-1"
                    >
                      <v-list-group
                        :value="true"
                        prepend-icon="mdi-account-circle"
                      >
                        <template v-slot:activator>
                          <v-list-item-title class="landing-font-14"
                            >Users</v-list-item-title
                          >
                        </template>
                        <v-list-item
                          v-for="([title, icon], i) in users"
                          :key="i"
                          link
                          class="pl-8"
                        >
                          <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                          </v-list-item-icon>
                          <v-list-item-title
                            v-text="title"
                            class="landing-font-14"
                          ></v-list-item-title>
                        </v-list-item>
                      </v-list-group>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div class="flex-1">
            <Header />
            <main class="mt-12">
              <Nuxt />
            </main>
          </div>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    users: [
      ["Profile", "mdi-face-man-profile"],
      ["Following", "mdi-account-star"],
      ["Follower", "mdi-account-heart"],
    ],
    documents: [
      ["All References", "mdi-file-document-multiple-outline"],
      ["Favorites", "mdi-heart-box"],
      ["Public", "mdi-earth"],
      ["Share with me", "mdi-share-variant"],
      ["Trash", "mdi-delete"],
    ],
  }),
};
</script>

<style lang="scss">
.menu-bar {
  .v-list-item__title {
    color: white;
  }
  .v-list-item__icon {
    .v-icon {
      color: white;
    }
  }
}
</style>
