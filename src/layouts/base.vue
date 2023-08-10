<template>
  <v-app class="h-screen">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="h-[75px]">
          <Header :pageActive="pageActive"/>
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
                        v-model="item.selectedItem"
                        :key="index"
                      >
                        <v-list-item
                          v-for="(subItem, i) in item.actions"
                          v-if="
                            (item.title !== 'Collections' &&
                              i !== item.actions.length - 1) ||
                            (item.title !== 'Groups' &&
                              i !== item.actions.length - 1) ||
                            item.title === 'Users' ||
                            item.title === 'Dashboard'
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
                          <v-list-item-action v-if="item.title === 'Groups'">
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
                                <v-list-item @click="renameGroup(subItem[3])">
                                  <v-list-item-title>
                                    Rename
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="manageGroup(subItem[3])">
                                  <v-list-item-title>
                                    Manage Group
                                  </v-list-item-title>
                                </v-list-item>
                                <v-divider />
                                <v-list-item
                                  v-if="subItem[4] == 1"
                                  @click="removeGroup(subItem[3])"
                                >
                                  <v-list-item-title>
                                    Remove
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                  v-if="subItem[4] == 0"
                                  @click="leaveGroup(subItem[3])"
                                >
                                  <v-list-item-title>
                                    Leave Group
                                  </v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item
                          class="pl-8"
                          v-if="item.title === 'Collections'"
                          @click="createDialog = true"
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
                        <v-list-item
                          class="pl-8"
                          v-if="item.title === 'Groups'"
                          @click="createDialogGroup = true"
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
        @create-collection="createCollection"
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
        @remove-collection="updateAfterRemoveCollection"
      />
      <GroupCreateDialog
        :dialog="createDialogGroup"
        @close-dialog="createDialogGroup = false"
        @create-group="createGroup"
      />
      <GroupEditDialog
        v-if="idGroup"
        :id="idGroup"
        :dialog="editDialogGroup"
        @close-dialog="editDialogGroup = false"
        @update-group="updateGroup"
      />
      <GroupRemoveDialog
        v-if="idGroup"
        :id="idGroup"
        :dialog="deleteDialogGroup"
        @close-dialog="deleteDialogGroup = false"
        @delete-group="deleteGroup"
      />
      <GroupManageDialog
        v-if="idGroup"
        :groupId="idGroup"
        :dialog="manageGroupDialog"
        @close-dialog="manageGroupDialog = false"
      />
      <GroupLeaveDialog
        v-if="idGroup"
        :dialog="leaveGroupDialog"
        :groupId="idGroup"
        @leave-group="updateleaveGroup"
        @close-dialog="leaveGroupDialog = false"
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
    this.menus[this.selectedItem.groupIndex].selectedItem =
      this.selectedItem.itemIndex;
    this.fetchAllCollectionsParent();
    this.fetchAllGroups();
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
    groups() {
      return this.$store.getters["groups/getGroups"];
    },
    filterGroups() {
      if (this.groups && Array.isArray(this.groups)) {
        return this.groups.map((group) => {
          return [
            group.groupName,
            "mdi-account-multiple-plus-outline",
            `/groups/${group.id}`,
            group.id,
            group.statusOwner,
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
        selectedItem: 0,
      },
      {
        title: "Collections",
        actions: [["New Collection", "mdi-new-box"]],
        active: false,
        selectedItem: 0,
      },
      {
        title: "Groups",
        actions: [["New Group", "mdi-new-box"]],
        active: false,
        selectedItem: 0,
      },
      {
        title: "Users",
        actions: [
          ["Profile", "mdi-face-man-profile", "/", false],
          ["Following", "mdi-account-star", "/following", false],
          ["Follower", "mdi-account-heart", "/follower", false],
          ["Pending Invites", " mdi-account-plus", "/pending-invites", false],
        ],
        active: false,
        selectedItem: 0,
      },
    ],
    pageActive: "Dashboard",
    notifyCollection: false,
    messageNotification: null,
    statusCreated: false,
    items: [{ title: "Rename" }, { title: "Remove" }],
    createDialog: false,
    createDialogGroup: false,
    editDialog: false,
    editDialogGroup: false,
    deleteDialogGroup: false,
    idCollection: null,
    idGroup: null,
    removeDialog: null,
    manageGroupDialog: false,
    leaveGroupDialog: false,
    selectedItem: null,
  }),
  watch: {
    collectionParents() {
      if (this.filterCollections) {
        this.menus[1].actions = [["New Collection", "mdi-new-box"]];
        this.menus[1].actions.unshift(...this.filterCollections);
      }
    },
    groups() {
      if (this.filterGroups) {
        this.menus[2].actions = [["New Group", "mdi-new-box"]];
        this.menus[2].actions.unshift(...this.filterGroups);
      }
    },
  },
  methods: {
    selectItem(groupIndex, itemIndex) {
      this.$cookies.set("groupIndex", groupIndex);
      this.$cookies.set("itemIndex", itemIndex);
      if (groupIndex != 3) {
        this.menus[groupIndex].selectedItem = itemIndex;
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
    async fetchAllGroups() {
      await this.$store.dispatch("groups/fetchAllGroups");
    },
    createCollection(response) {
      if (response.status == 200) {
        this.fetchAllCollectionsParent();
        this.createDialog = false;
        this.notifyCollection = true;
        this.statusCreated = true;
        this.messageNotification = "Create collection successfully!";
      } else {
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
    createGroup(response) {
      if (response.status == 200) {
        this.fetchAllGroups();
        this.createDialogGroup = false;
        this.notifyCollection = true;
        this.statusCreated = true;
        this.messageNotification = "Create group successfully!";
      } else {
        this.createDialogGroup = true;
        this.notifyCollection = true;
        this.statusCreated = false;
        this.messageNotification = "Can not create group!";
      }
    },
    renameGroup(id) {
      this.idGroup = id;
      this.editDialogGroup = true;
    },
    updateGroup(response) {
      if (response.status == 200) {
        this.editDialogGroup = false;
        this.fetchAllGroups();
      } else {
        this.editDialogGroup = true;
        this.notifyCollection = true;
        this.statusCreated = false;
        this.messageNotification = "Can not update group!";
      }
    },
    removeGroup(id) {
      this.idGroup = id;
      this.deleteDialogGroup = true;
    },
    deleteGroup(respone) {
      if (respone.status == 200) {
        this.deleteDialogGroup = false;
        this.fetchAllGroups();
      }
    },
    manageGroup(id) {
      this.idGroup = id;
      this.manageGroupDialog = true;
    },
    leaveGroup(id) {
      this.idGroup = id;
      this.leaveGroupDialog = true;
    },
    updateleaveGroup(response) {
      if (response.status == 200) {
        this.fetchAllGroups();
        this.leaveGroupDialog = false;
        this.notifyCollection = true;
        this.statusCreated = true;
        this.messageNotification = "Leave group successfully!";
        this.push('/groups');
      } else {
        this.leaveGroupDialog = true;
        this.notifyCollection = true;
        this.statusCreated = false;
        this.messageNotification = "Leave group failed!";
      }
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
