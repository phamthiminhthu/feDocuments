<template>
  <div v-if="transformDataTreeCollections != null">
    <h3 class="p-4 landing-title-page text-center">My Collections</h3>
    <div class="w-3/5 mx-auto">
      <v-card class="mx-auto">
        <div v-if="transformDataTreeCollections.length <= 0" class="p-10">
          <span class="landing-font-24"
            >You don't have any collections yet. Please create more collections
            for yourself...</span
          >
        </div>
        <v-treeview v-else :items="transformDataTreeCollections" class="mt-5">
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
            @click="createDialogCollection = true"
          >
            Create New Collection
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <CollectionCreateDialog
      :dialog="createDialogCollection"
      :parentCollectionId="null"
      @close-dialog="createDialogCollection = false"
      @create-collection="createCollection"
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
  data() {
    return {
      createDialogCollection: false,
      notifyCollection: false,
      messageNotification: null,
      statusCreated: false,
    };
  },
  mounted() {
    return this.getTreeCollections();
  },
  computed: {
    subCollectionDtoList() {
      return this.$store.getters["collections/getTreeCollections"];
    },
    transformDataTreeCollections() {
      if (this.subCollectionDtoList && Array.isArray(this.subCollectionDtoList)) {
        return this.subCollectionDtoList.map((item) =>
          this.transformCollection(item)
        );
      }
    },
  },
  methods: {
    async getTreeCollections() {
      await this.$store.dispatch("collections/fetchTreeCollections");
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
    async createCollection(response) {
      if (response.status == 200) {
        await this.getTreeCollections();
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
  },
};
</script>
