<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
        ></v-text-field>
      </v-card-title>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="formattedDocuments"
        :search="search"
        item-key="id"
        v-model="selected"
        @input="enterSelect()"
        :show-select="status !== 'share'"
      >
        <template v-slot:item.typeDocumentsList="{ item }">
          <template
            v-if="
              item.typeDocumentsList != null &&
              item.typeDocumentsList.length > 0
            "
          >
            <v-card class="mx-0 !shadow-none">
              <v-list class="hover:bg-gray-50!">
                <v-list-item-group>
                  <v-list-item
                    class="!p-0 !min-h-[30px]"
                    v-for="typeDoc in item.typeDocumentsList"
                    :key="typeDoc.id"
                  >
                    <v-chip color="green" outlined small>{{
                      typeDoc.typeName
                    }}</v-chip>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </template>
        </template>
        <template v-slot:item.actions="{ item }" v-if="status != 'trash'">
          <v-chip-group multiple active-class="primary--text">
            <v-chip
              color="#111827"
              v-for="action in actions"
              :key="item.id + action.text"
              v-if="
                status != 'share' ||
                (status == 'share' && action.text != 'Edit')
              "
            >
              <v-dialog
                v-model="item.dialog[action.text.toLowerCase()]"
                persistent
                max-width="680px"
                :retain-focus="false"
              >
                <template v-slot:activator="{ on: dialog, attrs: attrDialog }">
                  <v-tooltip bottom>
                    <template
                      v-slot:activator="{ on: tooltip, attrs: attrTooltip }"
                    >
                      <v-icon
                        small
                        dark
                        v-bind="{ ...attrDialog, ...attrTooltip }"
                        v-on="{ ...tooltip, ...dialog }"
                        :key="item.id + action.text"
                        @click="handleDocumentSelected(item)"
                        color="white"
                      >
                        {{ action.icon }}
                      </v-icon>
                    </template>
                    <span>{{ action.text }}</span>
                  </v-tooltip>
                </template>
                <component
                  :key="item.id + action.text"
                  :is="action.component"
                  @close-dialog="closeDialog(item, action.text)"
                  @document-update="handleDocumentUpdated"
                  @users-updated="notifyUsersUpdated"
                  :document="document"
                  :users="users"
                  :action="status"
                  v-if="document.documentKey"
                >
                </component>
              </v-dialog>
            </v-chip>
          </v-chip-group>
        </template>
        <template v-slot:item.favorite="{ item }" v-if="status == null">
          <v-chip color="#111827">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  :color="item.loved === 1 ? 'yellow' : 'white'"
                  small
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="handleChange(item)"
                >
                  mdi-heart-outline
                </v-icon>
              </template>
              <span v-if="item.loved === 0">Love</span>
              <span v-else>Unlove</span>
            </v-tooltip>
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
    <div class="actions-docs">
      <div class="text-center" v-if="status != 'trash'">
        <v-bottom-navigation
          color="primary"
          v-if="sheet"
          class="!fixed right-0 z-50"
        >
          <v-menu top :offset-y="offset" rounded="lg">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                <span>Organize</span>
                <v-icon>mdi-apple-keyboard-control</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link @click="addToCollection">
                <v-list-item-title>Add To Collection</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                @click="addToCollectionGroup"
                v-if="groupId != null"
              >
                <v-list-item-title>Add To Group's Collection</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title @click="addToGroup">
                  Add To Group
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu top :offset-y="offset" rounded="lg" v-if="status != 'group'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                <span>Mark as</span>
                <v-icon>mdi-apple-keyboard-control</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link @click="markAsLoved">
                <v-list-item-title>Favorite</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="markAsPublic">
                <v-list-item-title>Public</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title @click="maskAsCompleted">
                  Completed
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn @click="deleteDocumentFromGroup" v-if="groupId != null">
            <span>Delete</span>
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
          <v-btn @click="deleteDocument" v-if="groupId == null">
            <span>Move To Trash</span>
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </div>
      <div class="text-center" v-else>
        <v-bottom-navigation
          color="primary"
          v-if="sheet"
          class="!fixed right-0 z-50"
        >
          <v-btn @click="putBackDocs">
            <span>Put Back</span>

            <v-icon>mdi-file-undo</v-icon>
          </v-btn>

          <v-btn @click="deletePermanently">
            <span>Delete Permanently</span>

            <v-icon>mdi-delete-forever-outline</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </div>
      <CollectionShowAllDialog
        v-if="collections"
        :dialog="addCollectionDialog"
        :items="collections"
        @colse-dialog="addCollectionDialog = false"
        @add-document-collection="addDocumentCollection"
      />
      <GroupShowAllDialog
        v-if="groups"
        :dialog="addGroupDialog"
        :items="groups"
        @colse-dialog="addGroupDialog = false"
        @add-document-group="addDocumentGroup"
      />
    </div>
  </div>
</template>
<script>
import { format, isToday } from "date-fns";
export default {
  data() {
    return {
      selectedFile: null,
      loading: false,
      loader: null,
      rules: [
        (value) =>
          !value ||
          value.size < 16000000 ||
          "Avatar size should be less than 9 MB!",
      ],
      search: "",
      selected: [],
      document: {},
      users: [],
      headers: [
        { text: "", value: "favorite", sortable: false },
        {
          text: "Authors",
          align: "start",
          sortable: false,
          value: "authors",
        },
        {
          text: "Title",
          sortable: false,
          value: "title",
        },
        { text: "Year", value: "publishingYear" },
        { text: "Added", value: "createdAt" },
        { text: "Type Document", sortable: false, value: "typeDocumentsList" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      actions: [
        {
          text: "Show",
          icon: "mdi-eye",
          component: "DocumentShowCard",
        },
        {
          text: "Edit",
          icon: "mdi-pencil",
          component: "DocumentEditCard",
        },
        {
          text: "Share",
          icon: "mdi-share",
          component: "DocumentShareCard",
        },
      ],
      sheet: false,
      moveItems: ["Add To Collection", "Add To Group"],
      offset: true,
      addCollectionDialog: false,
      collections: [],
      addGroupDialog: false,
      groups: [],
      addToCollectionGroupDialog: false,
    };
  },
  props: {
    documents: {
      type: Array,
      default: () => [],
    },
    status: {
      type: String,
      default: null,
    },
    groupId: null,
    collectionId: null
  },
  computed: {
    formattedDocuments() {
      return this.documents.map((document) => ({
        ...document,
        id: document.id,
        createdAt: this.formatDate(document.createdAt),
        dialog: {
          show: false,
          edit: false,
          share: false,
        },
      }));
    },
    formatDocumentsToCollections() {
      return this.selected.map((document) => document.id);
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isToday(date)) {
        return format(date, "hh:mm aa");
      } else {
        return format(date, "dd/MM/yyyy");
      }
    },
    enterSelect() {
      if (this.selected.length == this.itemsPerPage) {
        alert("selected all");
      }
      if (this.selected.length > 0) {
        this.sheet = true;
      } else {
        this.sheet = false;
      }
    },
    handleChange(item) {
      item.loved = item.loved === 1 ? 0 : 1;
      this.updateLovedStatus(item.id, item.loved);
    },
    async updateLovedStatus(itemId, loved) {
      try {
        const response = await this.$axios.post(
          `/management/document/loved/update?documentKey=${itemId}`
        );
        if (response) {
          const updatedItem = this.formattedDocuments.find(
            (item) => item.id === itemId
          );
          if (updatedItem) {
            updatedItem.loved = loved;
            this.$emit("documents-updated");
            this.selected = [];
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    closeDialog(item, text) {
      item.dialog[text.toLowerCase()] = false;
    },
    async handleDocumentSelected(item) {
      await this.$store.dispatch("document/fetchDataDocumentByDocumentKey", {
        documentKey: item.id,
      });
      this.document = this.$store.getters["document/getDocument"];

      await this.$store.dispatch(
        "document/fetchDataUsersSharedDocumentByDocumentKey",
        { documentKey: this.document.documentKey }
      );
      this.users = this.$store.getters["document/getUsers"];
    },
    handleDocumentUpdated() {
      this.$emit("documents-updated");
    },
    notifyUsersUpdated(e) {
      this.users = e;
    },
    async deleteDocument() {
      let documentsMoveToTrash = this.selected.map((doc) => doc.id);
      if (this.groupId == null && this.collectionId == null) {
        try {
          const response = await this.$axios.post(
            "/management/document/delete/trash",
            documentsMoveToTrash
          );
          if (response) {
            this.sheet = false;
            this.$emit("documents-updated");
            this.selected = [];
          }
        } catch (error) {
          console.log(error);
        }
      }else if(this.groupId == null && this.collectionId != null){
        try {
          const response = await this.$axios.post(
            `/owner/management/collection/document/delete?collectionId=${this.collectionId}`,
            documentsMoveToTrash
          );
          if (response) {
            this.sheet = false;
            this.$emit("documents-updated");
            this.selected = [];
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteDocumentFromGroup() {
      if (this.groupId != null) {
        let documentsMoveToTrash = this.selected.map((doc) => doc.id);
        this.$emit("delete-documents-group", documentsMoveToTrash);
        this.selected = [];
      }
    },
    async putBackDocs() {
      let documentsPutPack = this.selected.map((doc) => doc.id);
      try {
        const response = await this.$axios.post(
          "/management/document/undo",
          documentsPutPack
        );
        if (response) {
          this.sheet = false;
          this.$emit("documents-updated");
          this.selected = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deletePermanently() {
      let documentsDeletePermanently = this.selected.map((doc) => doc.id);
      try {
        const response = await this.$axios.post(
          "/management/document/delete",
          documentsDeletePermanently
        );
        if (response) {
          this.sheet = false;
          this.$emit("documents-updated");
          this.selected = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addToCollection() {
      await this.getAllCollections();
      this.collections = this.$store.getters["collections/getCollectionsAll"];
      this.addCollectionDialog = true;
    },
    async getAllCollections() {
      await this.$store.dispatch("collections/fetchAllCollections");
    },
    async addDocumentCollection(collections) {
      if (this.groupId == null) {
        if (
          collections.length > 0 &&
          this.formatDocumentsToCollections.length > 0
        ) {
          try {
            const response = await this.$axios.post(
              "/owner/management/collection/document/move/documents",
              {
                idCollections: collections,
                documentKeys: this.formatDocumentsToCollections,
              }
            );
            if (response) {
              this.addCollectionDialog = false;
              this.selected = [];
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        if (
          collections.length > 0 &&
          this.formatDocumentsToCollections.length > 0
        ) {
          try {
            const response = await this.$axios.post(
              `/management/group/${this.groupId}/collection/move/documents`,
              {
                idCollections: collections,
                documentKeys: this.formatDocumentsToCollections,
              }
            );
            if (response) {
              this.addCollectionDialog = false;
              this.selected = [];
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    async addToGroup() {
      await this.fetchAllGroups();
      this.groups = this.$store.getters["groups/getGroups"];
      this.addGroupDialog = true;
    },
    async addDocumentGroup(groups) {
      try {
        const response = await this.$axios.post(
          `management/group/document/move`,
          {
            idGroups: groups,
            documentKeys: this.formatDocumentsToCollections,
          }
        );
        if (response) {
          this.addGroupDialog = false;
          this.selected = [];
        }
      } catch (error) {}
    },
    async fetchAllGroups() {
      await this.$store.dispatch("groups/fetchAllGroups");
    },
    async addToCollectionGroup() {
      await this.fetchCollectionsGroup();
      this.collections = this.$store.getters["groups/getCollectionsGroup"];
      this.addCollectionDialog = true;
    },
    async fetchCollectionsGroup() {
      if (this.groupId) {
        await this.$store.dispatch("groups/fetchCollectionGroup", {
          groupId: this.groupId,
        });
      }
    },
    async markAsLoved() {
      let documents = this.selected.map((doc) => doc.id);
      try {
        const response = await this.$axios.post(
          "management/document/update/multi-documents/loved",
          documents
        );
        if (response) {
          this.selected = [];
          this.$emit("documents-updated");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async markAsPublic() {
      let documents = this.selected.map((doc) => doc.id);
      try {
        const response = await this.$axios.post(
          "management/document/update/multi-documents/public",
          documents
        );

        if (response) {
          this.selected = [];
          this.$emit("documents-updated");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async maskAsCompleted() {
      let documents = this.selected.map((doc) => doc.id);
      try {
        const response = await this.$axios.post(
          "management/document/update/multi-documents/completed",
          documents
        );
        if (response) {
          this.selected = [];
          this.$emit("documents-updated");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
.v-overlay__scrim {
  background-color: transparent !important;
}
</style>
