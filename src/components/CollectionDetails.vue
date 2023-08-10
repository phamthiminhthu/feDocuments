<template>
  <div v-if="collection">
    <div class="text-center mb-16">
      <span class="landing-font-32">Collection</span> <strong class="landing-title-page">"{{ collection.collectionName }}"</strong>
    </div>
    <BreadCrumbs :idCollection="idCollection" :idGroup="groupId" />
    <div class="mx-auto">
      <v-list subheader two-line>
        <v-subheader inset class="ml-2">
          Collections
          <v-btn
            class="mx-4"
            fab
            dark
            color="indigo"
            small
            @click="createDialog = true"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-subheader>

        <v-row
          class="p-4 mt-4"
          v-if="collection.subCollectionDtoList.length > 0"
        >
          <v-col
            cols="4"
            v-for="folder in collection.subCollectionDtoList"
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
        <v-subheader inset class="mt-5 ml-2">
          Files
          <UploadFileButton
            class="mx-3"
            @upload-file="uploadFile"
            :idCollection="idCollection"
            :groupId="groupId"
          />
        </v-subheader>
        <Documents
          :documents="formattedDocuments"
          :groupId="groupId"
          :collectionId="idCollection"
          :status="typeStatusDocs"
          @documents-updated="handleChangeListDocument"
          @delete-documents-group="deleteDocumentGroup"
        />
        <CollectionCreateDialog
          v-if="idCollection"
          :dialog="createDialog"
          :parentCollectionId="idCollection"
          :groupId="groupId"
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
          @remove-collection="updateAfterRemoveCollection"
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
      createDialog: false,
      editDialog: false,
      removeDialog: false,
      message: null,
      status: false,
      notify: false,
      currentId: null,
      typeStatusDocs: this.groupId ? "group" : null,
    };
  },
  props: {
    idCollection: {
      type: String,
      default: null,
      requried: true,
    },
    groupId: null,
  },
  mounted() {
    return this.fetchDataCollection();
  },
  computed: {
    collection() {
      return this.$store.getters["collections/getCollectionDetails"];
    },
    formattedDocuments() {
      return this.collection.documentDtoList.map((document) => ({
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
          groupId: this.groupId ? this.groupId : null,
        });
      }
    },
    redirectSubCollection(id) {
      if (this.groupId == null) {
        this.$router.push(`/collections/${id}`);
      } else {
        this.$router.push(`/groups/${this.groupId}/collections/${id}`);
      }
    },
    async createSuccessfully(respone) {
      if (respone.status == 200) {
       await this.fetchDataCollection();
        this.notify = true;
        this.status = true;
        this.message = "Create Collections Successfully!";
        this.createDialog = false;
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Collection name already exists!";
      }
    },
    renameCollection(id) {
      this.currentId = id;
      this.editDialog = true;
    },
    async updateCollection(response) {
      if (response.status === 200) {
        await this.fetchDataCollection();
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
      this.removeDialog = true;
    },
    async updateAfterRemoveCollection(response) {
      if (response.status === 200) {
        await this.fetchDataCollection();
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
    async deleteDocumentGroup(documentKeys) {
      if (this.groupId != null && documentKeys != null) {
        try {
          const id = this.idCollection ? this.idCollection : null;
          const response = await this.$axios.post(
            `/management/group/${this.groupId}/document/delete?collectionId=${id}`,
            documentKeys
          );
          if (response) {
            console.log(response);
            await this.fetchDataCollection();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
