<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="h-[75px]">
          <Header :pageActive="pageActive"/>
        </v-col>
        <v-col cols="12" class="mt-0 pt-0">
          <div class="flex gap-[6px]">
            <div class="menu-bar flex-none w-64 bg-[#111827]">
              <aside
                id="separator-sidebar"
                class="relative z-40 w-64 h-screen"
                aria-label="Sidebar"
              >
                <div class="p-0 !fixed !w-64">
                  <v-list
                    class="space-y-2 font-medium border-t border-gray-200 pl-1 !bg-[#111827]"
                  >
                    <v-list-group
                      v-for="(item, index) in menus"
                      v-model="item.active"
                      prepend-icon="mdi-view-dashboard"
                      :key="item.title"
                    >
                      <template v-slot:activator>
                        <v-list-item-content>
                          <v-list-item-title class="landing-font-14">
                            {{ item.title }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </template>
                      <v-list-item-group color="primary" v-model="subItemSelected" :key="index">
                        <v-list-item
                          v-for="(subItem, i) in item.actions"
                          :key="i"
                          link
                          class="pl-8"
                          @click="selectItem(index, i)"
                        >
                          <v-list-item-icon>
                            <v-icon>{{ subItem[1] }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title
                            v-text="subItem[0]"
                            class="landing-font-14"
                          ></v-list-item-title>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list-group>
                  </v-list>
                </div>
              </aside>
            </div>
            <div class="flex-1">
              <main class="mt-24">
                <Nuxt />
              </main>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  mounted() {
    this.selectedItem = {
      groupIndex:
        this.$cookies.get("groupIndex") !== undefined
          ? this.$cookies.get("groupIndex")
          : 0,
      itemIndex:
        this.$cookies.get("itemIndex") !== undefined
          ? this.$cookies.get("itemIndex")
          : 0,
    };
    this.menus[this.selectedItem.groupIndex].active = true;
    this.subItemSelected = this.selectedItem.itemIndex

  },
  data: () => ({
    menus: [
      {
        title: "Dashboard",
        actions: [
          [
            "All References",
            "mdi-file-document-multiple-outline",
            "/dashboard/all-references"
          ],
          ["Favorites", "mdi-heart-box", "/dashboard/favorites"],
          ["Completed", "mdi-book-check", "/dashboard/completed"],
          ["Public", "mdi-earth", "/dashboard/public"],
          ["Share with me", "mdi-share-variant", "/dashboard/share-with-me"],
          ["Trash", "mdi-delete", "/dashboard/trash"],
        ],
        active: false,
      },
      {
        title: "Collections",
        actions: [],
        active: false,
      },
      {
        title: "Groups",
        actions: [],
        active: false,
      },
      {
        title: "Users",
        actions: [
          ["Profile", "mdi-face-man-profile", "/profile/phamthiminhthu/edit", false],
          ["Following", "mdi-account-star", "profile/phamthiminhtu/following", false],
          ["Follower", "mdi-account-heart", "profile/phamthiminhtu/follower", false],
        ],
        active: false,
      },
    ],
    selectedItem: null,
    subItemSelected: null,
    pageActive: "Dashboard",
  }),
  methods: {
    selectItem(groupIndex, itemIndex) {
      this.$cookies.set("groupIndex", groupIndex);
      this.$cookies.set("itemIndex", itemIndex);
      this.selectedItem = {
        groupIndex,
        itemIndex,
      };
      this.$router.push(this.menus[groupIndex]["actions"][itemIndex][2]);
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
