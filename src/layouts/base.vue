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
                  <div class="px-0 py-10 h-full overflow-y-auto scrollbar">
                    <v-list
                      class="mt-10 space-y-2 font-medium border-t border-gray-200 pl-1 !bg-[#111827]"
                    >
                      <v-list-group
                        v-for="(item, index) in menus"
                        :value="isSelected(index)"
                        prepend-icon="mdi-view-dashboard"
                        :key="item.title"
                      >
                        <template v-slot:activator>
                          <v-list-item-content>
                            <v-list-item-title class="landing-font-14">{{
                              item.title
                            }}</v-list-item-title>
                          </v-list-item-content>
                        </template>
                        <v-list-item-group color="primary">
                          <v-list-item
                            v-for="([title, icon], i) in item.actions"
                            :key="i"
                            link
                            class="pl-8"
                            @click="selectItem(index, i)"
                          >
                            <v-list-item-icon>
                              <v-icon v-text="icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title
                              v-text="title"
                              class="landing-font-14"
                            ></v-list-item-title>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list-group>
                    </v-list>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div class="flex-1">
            <Header />
            <main class="mt-24">
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
    menus: [
      {
        title: "Dashboard",
        actions: [
          [
            "All References",
            "mdi-file-document-multiple-outline",
            "/dashboard/all-references",
          ],
          ["Favorites", "mdi-heart-box", "/dashboard/favorites"],
          ["Completed", "mdi-book-check", "/dashboard/completed"],
          ["Public", "mdi-earth", "/dashboard/public"],
          ["Share with me", "mdi-share-variant", "/dashboard/share-with-me"],
          ["Trash", "mdi-delete", "/dashboard/trash"],
        ],
      },
      {
        title: "Collections",
        actions: [],
      },
      {
        title: "Groups",
        actions: [],
      },
      {
        title: "Users",
        actions: [
          ["Profile", "mdi-face-man-profile"],
          ["Following", "mdi-account-star"],
          ["Follower", "mdi-account-heart"],
        ],
      },
    ],
    selectedItem: {
       groupIndex : 0,
      itemIndex: 0,
    },
  }),
  methods: {
    isSelected(groupIndex) {
      return (
        this.selectedItem !== null &&
        this.selectedItem.groupIndex === groupIndex
      );
    },
    selectItem(groupIndex, itemIndex) {
      this.selectedItem = {
        groupIndex,
        itemIndex,
      };
      this.$router.push(this.menus[groupIndex]["actions"][itemIndex][2]);
      console.log(this.selectedItem);
    },
  },
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
  .v-list-item-group .v-list-item--active {
    background-color: white;
    color: #111827;
    .v-list-item__icon .v-icon {
      color: #111827;
    }
    .v-list-item__title {
      color: #111827;
    }
  }
}
</style>
