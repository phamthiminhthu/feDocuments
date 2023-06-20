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
        show-select
      >
        <template v-slot:item.typeDocumentsList="{ item }">
          <template v-if="item.typeDocumentsList.length > 0">
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
        <template v-slot:item.actions="{ item }">
          <v-chip-group multiple active-class="primary--text">
            <v-chip
              color="#111827"
              v-for="action in actions"
              :key="item.id + action.text"
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
                  :is="action.component"
                  @close-dialog="closeDialog(item, action.text)"
                  @document-update="handleDocumentUpdated"
                  :document="document"
                >
                </component>
              </v-dialog>
            </v-chip>
          </v-chip-group>
        </template>
        <template v-slot:item.favorite="{ item }">
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
    };
  },
  props: {
    documents: {
      type: Array,
      default: () => [],
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
    },
    handleDocumentUpdated(updateDocument) {
      this.$emit("documents-updated");
    }
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
</style>
