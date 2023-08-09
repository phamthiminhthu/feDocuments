<template>
  <div>
    <div v-if="transformDataTreeGroups != null">
      <h3 class="p-4 landing-title-page text-center">My Groups</h3>
      <div class="w-3/5 mx-auto">
        <v-card class="mx-auto">
          <div v-if="transformDataTreeGroups.length <= 0" class="p-10">
            <span class="landing-font-24"
              >You are not a member of any group. Please create/join new
              groups...</span
            >
          </div>
          <v-treeview v-else :items="transformDataTreeGroups" class="mt-5">
            <template v-slot:prepend="{ item }">
              <v-icon>mdi-folder-open</v-icon>
            </template>
          </v-treeview>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              depressed
              rounded
              text
              @click="createDialogGroup = true"
            >
              Create New Group
            </v-btn>
            <v-btn
              color="green darken-1"
              rounded
              text
              @click="redirectPendingInvitations"
            >
              Pending Invites
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <GroupCreateDialog
      :dialog="createDialogGroup"
      @close-dialog="createDialogGroup = false"
      @create-group="createGroup"
    />
    <NotifySnackbar
      :notify="notifyCollection"
      :message="messageNotification"
      :status="statusCreated"
    />
  </div>
</template>
<script>
export default {
  layout: "base",
  mounted() {
    this.fetchAllGroupsTree();
  },
  data() {
    return {
      createDialogGroup: false,
      notifyCollection: false,
      messageNotification: null,
      statusCreated: false
    };
  },
  computed: {
    groupsTree() {
      return this.$store.getters["groups/getGroupsTree"];
    },
    transformDataTreeGroups() {
      if (this.groupsTree != null && Array.isArray(this.groupsTree)) {
        return this.groupsTree.map((item) => this.transformGroups(item));
      }
    },
    username() {
      return this.$cookies.get("currentUsername");
    },
  },
  methods: {
    async fetchAllGroupsTree() {
      await this.$store.dispatch("groups/fetchAllGroupsTree");
    },
    transformGroups(item) {
      return {
        id: item.id,
        name: item.groupName,
        children: this.transformCollections(item.collectionDtoList),
      };
    },
    transformCollections(children) {
      if (children != null && children.length > 0) {
        return children.map((item) => this.transformCollection(item));
      }
    },
    transformCollection(item) {
      return {
        id: item.id,
        name: item.collectionName,
        children: item.subCollectionDtoList.map((subItem) =>
          this.transformCollection(subItem)
        ),
      };
    },
    redirectPendingInvitations() {
      if (this.username) {
        this.$router.push(`/profile/${this.username}/pending-invites`);
      }
    },
    createGroup(response) {
      if (response.status == 200) {
        this.fetchAllGroupsTree();
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
  },
};
</script>
