<template>
  <v-app class="h-screen">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="h-[75px]">
          <Header :pageActive="pageActive" />
        </v-col>
        <v-col cols="12" class="mt-0 pt-0">
          <div class="flex gap-[6px]">
            <div class="menu-bar flex-none w-64 bg-[#111827] h-screen">
              <aside
                id="separator-sidebar"
                class="relative z-40 w-64 h-full"
                aria-label="Sidebar"
              >
                <div class="p-0 !fixed !w-64">
                  <v-list
                    class="space-y-2 font-medium border-t border-gray-200 pl-1 !bg-[#111827] h-screen"
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
                      <v-list-item-group
                        color="primary"
                        v-model="subItemSelected"
                        :key="index"
                      >
                        <v-list-item
                          v-for="(subItem, i) in item.actions"
                          v-if="
                            item.title !== 'Collections' ||
                            i !== item.actions.length - 1
                          "
                          :key="i"
                          link
                          class="pl-8"
                          @click="selectItem(index, i)"
                        >
                          <v-list-item-icon class="!mr-4 !mt-[23px]">
                            <v-icon small> {{ subItem[1] }} </v-icon>
                          </v-list-item-icon>
                          <v-list-item-title class="landing-font-14">
                            {{ subItem[0] }}
                          </v-list-item-title>
                          <v-list-item-action
                            v-if="item.title === 'Collections'"
                          >
                            <v-menu open-on-hover right offset-x>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-bind="attrs"
                                  v-on="on"
                                  class="!shadow-none !bg-[#111827]"
                                  icon
                                >
                                  <v-icon color="grey lighten-1" small>
                                    mdi-dots-vertical
                                  </v-icon>
                                </v-btn>
                              </template>
                              <v-list>
                                <v-list-item
                                  @click="renameCollection(subItem[3])"
                                >
                                  <v-list-item-title>
                                    Rename
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                  @click="removeCollection(subItem[3])"
                                >
                                  <v-list-item-title>
                                    Remove
                                  </v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item
                          class="pl-8"
                          v-if="item.title === 'Collections'"
                          @click="createCollection"
                        >
                          <v-list-item-icon class="mr-4 !mt-[23px]">
                            <v-icon small>
                              {{ item.actions[item.actions.length - 1][1] }}
                            </v-icon>
                          </v-list-item-icon>
                          <v-list-item-title
                            v-text="item.actions[item.actions.length - 1][0]"
                            class="landing-font-12 italic"
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
                <NotifySnackbar
                  :notify="notifyCollection"
                  :message="messageNotification"
                  :status="statusCreated"
                />
                <Nuxt />
              </main>
            </div>
          </div>
        </v-col>
      </v-row>
      <CollectionCreateDialog
        :dialog="createDialog"
        :parentCollectionId="null"
        @close-dialog="createDialog = false"
        @create-collection="createSuccessfully"
      />
      <CollectionEditDialog
        v-if="idCollection"
        :id="idCollection"
        :dialog="editDialog"
        @close-dialog="editDialog = false"
        @update-collection="updateRenameCollection"
      />
      <CollectionRemoveDialog
        v-if="idCollection"
        :id="idCollection"
        :dialog="removeDialog"
        @close-dialog="removeDialog = false"
        @update-collection="updateAfterRemoveCollection"
      />
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
    this.subItemSelected = this.selectedItem.itemIndex;
    this.fetchAllCollectionsParent();
  },
  computed: {
    collectionParents() {
      return this.$store.getters["collections/getCollectionsParent"];
    },
    filterCollections() {
      if (this.collectionParents && Array.isArray(this.collectionParents)) {
        return this.collectionParents.map((collection) => {
          return [
            collection.collectionName,
            "mdi-image-multiple",
            `/collections/${collection.id}`,
            collection.id,
          ];
        });
      }
    },
  },
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
        active: false,
      },
      {
        title: "Collections",
        actions: [
          ["New Collection", "mdi-new-box", "/dashboard/share-with-me"],
        ],
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
          ["Profile", "mdi-face-man-profile", "/", false],
          ["Following", "mdi-account-star", "/following", false],
          ["Follower", "mdi-account-heart", "/follower", false],
        ],
        active: false,
      },
    ],
    selectedItem: null,
    subItemSelected: null,
    pageActive: "Dashboard",
    notifyCollection: false,
    messageNotification: null,
    statusCreated: false,
    items: [{ title: "Rename" }, { title: "Remove" }],
    createDialog: false,
    editDialog: false,
    idCollection: null,
    removeDialog: null,
  }),
  watch: {
    collectionParents() {
      if (this.filterCollections) {
        this.menus[1].actions = [
          ["New Collection", "mdi-new-box", "/dashboard/share-with-me"],
        ];
        this.menus[1].actions.unshift(...this.filterCollections);
      }
    },
  },
  methods: {
    selectItem(groupIndex, itemIndex) {
      this.$cookies.set("groupIndex", groupIndex);
      this.$cookies.set("itemIndex", itemIndex);
      this.selectedItem = {
        groupIndex,
        itemIndex,
      };
      if (groupIndex != 3) {
        this.$router.push(this.menus[groupIndex]["actions"][itemIndex][2]);
      } else {
        let username = this.$cookies.get("currentUsername");
        this.$router.push(
          "/profile/" +
            username +
            this.menus[groupIndex]["actions"][itemIndex][2]
        );
      }
    },
    async fetchAllCollectionsParent() {
      await this.$store.dispatch("collections/fetchAllCollectionsParent");
    },
    createCollection() {
      this.createDialog = true;
    },
    createSuccessfully(response) {
      if (response.status == 200) {
        this.fetchAllCollectionsParent();
        this.createDialog = false;
        this.notifyCollection = true;
        this.statusCreated = true;
        this.messageNotification = "Create collection successfully!";
      } else {
        this.createDialog = true;
        this.notifyCollection = true;
        this.statusCreated = false;
        this.messageNotification = "Collection name already exists!";
      }
    },
    renameCollection(item) {
      this.idCollection = item;
      this.editDialog = true;
    },
    removeCollection(item) {
      this.idCollection = item;
      this.removeDialog = true;
    },
    updateRenameCollection() {
      this.fetchAllCollectionsParent();
      this.editDialog = false;
    },
    updateAfterRemoveCollection() {
      this.fetchAllCollectionsParent();
      this.removeDialog = false;
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
