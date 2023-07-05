<template>
  <div v-if="collection">
    <div class="text-center landing-title-page mb-16">
      {{ collection["collection"][0].collectionName }}
    </div>
    <div class="mx-auto">
      <v-list subheader two-line>
        <v-subheader inset>
          Folders
          <v-btn
            class="mx-4"
            fab
            dark
            color="indigo"
            small
            @click="createFolder"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-subheader>

        <v-row class="p-4 mt-4" v-if="collection['subCollections'].length > 0">
          <v-col
            cols="4"
            v-for="folder in collection['subCollections']"
            :key="folder.id"
          >
            <v-list-item
              class="rounded-xl"
              style="border: 2px solid #111827"
              @click="redirectSubCollection(folder['id'])"
            >
              <v-list-item-avatar>
                <v-icon class="amber darken-3" dark> mdi-folder </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-text="folder.collectionName"
                ></v-list-item-title>

                <v-list-item-subtitle
                  v-text="folder.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-menu open-on-hover right offset-x>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" class="!shadow-none" icon>
                      <v-icon color="black"> mdi-dots-vertical </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="renameCollection(folder.id)">
                      <v-list-item-title> Rename </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="removeCollection(folder.id)">
                      <v-list-item-title> Remove </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </v-col>
        </v-row>
        <v-subheader inset class="mt-5">
          Files
          <UploadFileButton
            class="mx-3"
            @upload-file="uploadFile"
            :idCollection="idCollection"
          />
        </v-subheader>
        <Documents
          :documents="formattedDocuments"
          @documents-updated="handleChangeListDocument"
        />
        <CollectionCreateDialog
          v-if="idCollection"
          :dialog="createDialog"
          :parentCollectionId="idCollection"
          @close-dialog="createDialog = false"
          @create-collection="createSuccessfully"
        />
        <CollectionEditDialog
          v-if="currentId"
          :id="currentId"
          :dialog="editDialog"
          @update-collection="updateCollection"
          @close-dialog="editDialog = false"
        />
        <CollectionRemoveDialog
          v-if="currentId"
          :id="currentId"
          :dialog="removeDialog"
          @update-collection="updateAfterRemoveCollection"
          @close-dialog="removeDialog = false"
        />
      </v-list>
      <NotifySnackbar :message="message" :status="status" :notify="notify" />
    </div>
  </div>
</template>
<script>
import { format, isToday } from "date-fns";
export default {
  layout: "base",
  data() {
    return {
      files: [
        {
          color: "blue",
          icon: "mdi-clipboard-text",
          subtitle: "Jan 20, 2014",
          title: "Vacation itinerary",
        },
        {
          color: "amber",
          icon: "mdi-gesture-tap-button",
          subtitle: "Jan 10, 2014",
          title: "Kitchen remodel",
        },
      ],
      folders: [
        {
          subtitle: "Jan 9, 2014",
          title: "Photos",
        },
        {
          subtitle: "Jan 17, 2014",
          title: "Recipes",
        },
        {
          subtitle: "Jan 28, 2014",
          title: "Work",
        },
      ],
      createDialog: false,
      editDialog: false,
      removeDialog: false,
      message: null,
      status: false,
      notify: false,
      currentId: null,
    };
  },
  mounted() {
    return this.fetchDataCollection();
  },
  computed: {
    idCollection() {
      return this.$route.params.id;
    },
    collection() {
      return this.$store.getters["collections/getCollectionDetails"];
    },
    formattedDocuments() {
      return this.collection["documents"].map((document) => ({
        ...document,
        id: document.documentKey,
      }));
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isToday(date)) {
        return format(date, "hh:mm");
      } else {
        return format(date, "dd/MM/yyyy");
      }
    },
    async fetchDataCollection() {
      if (this.idCollection) {
        await this.$store.dispatch("collections/fetchCollectionDetailsById", {
          id: this.idCollection,
        });
      }
    },
    redirectSubCollection(id) {
      this.$router.push(`/collections/${id}`);
    },
    createFolder() {
      this.createDialog = true;
    },
    createSuccessfully(respone) {
      if (respone.status == 201) {
        this.fetchDataCollection();
        this.notify = true;
        this.status = true;
        this.message = "Create Collections Successfully!";
        this.createDialog = false;
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Collection name already exists!";
        this.createDialog = true;
      }
    },
    renameCollection(id) {
      this.currentId = id;
      this.editDialog = true;
    },
    updateCollection(response) {
      if (response.status === 200) {
        this.fetchDataCollection();
        this.editDialog = false;
        this.notify = true;
        this.status = true;
        this.message = "Updated Collections Successfully!";
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Collection name already exists!";
        this.editDialog = true;
      }
    },
    removeCollection(id) {
      this.currentId = id;
      console.log(this.currentId);
      this.removeDialog = true;
    },
    updateAfterRemoveCollection(response) {
      if (response.status === 200) {
        this.fetchDataCollection();
        this.notify = true;
        this.status = true;
        this.message = "Delete Collections Successfully!";
        this.removeDialog = false;
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Delete Collection Failed!";
        this.removeDialog = true;
      }
    },
    uploadFile(response) {
      if (response.status === 200) {
        this.fetchDataCollection();
      }
    },
    handleChangeListDocument() {
      this.fetchDataCollection();
    },
  },
};
</script>
