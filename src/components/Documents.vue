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
          class="!fixed right-0"
        >
          <v-btn>
            <span>Recents</span>

            <v-icon>mdi-history</v-icon>
          </v-btn>

          <v-btn>
            <span>Favorites</span>

            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn @click="deleteDocument">
            <span>Move To Trash</span>

            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </div>
      <div class="text-center" v-else>
        <v-bottom-navigation
          color="primary"
          v-if="sheet"
          class="!fixed right-0"
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
          console.log(response.data);
          const updatedItem = this.formattedDocuments.find(
            (item) => item.id === itemId
          );
          if (updatedItem) {
            updatedItem.loved = loved;
            this.$emit("documents-updated");
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
      try {
        const response = await this.$axios.post(
          "/management/document/delete/trash",
          documentsMoveToTrash
        );
        if (response) {
          this.sheet = false;
          this.$emit("documents-updated");
        }
      } catch (error) {
        console.log(error);
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
