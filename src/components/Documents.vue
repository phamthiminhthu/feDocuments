<template>
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
      :headers="headers"
      :items="formattedDocuments"
      :search="search"
      show-select
    >
      <template v-slot:item.typeDocumentsList="{ item }">
        <template v-if="item.typeDocumentsList.length > 0">
          <v-chip-group column>
            <v-chip
              v-for="typeDoc in item.typeDocumentsList"
              :key="typeDoc.id"
              class="ma-1"
              outlined
            >
              {{ typeDoc.typeName }}
            </v-chip>
          </v-chip-group>
        </template>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="showDocument(item)">mdi-eye</v-icon>
        <v-icon @click="editDocument(item)">mdi-pencil</v-icon>
      </template>
      <template v-slot:item.stars="{ item }">
        <v-icon>mdi-heart-outline</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { format, isToday } from "date-fns";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "", value: "stars", sortable: false },
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
        createdAt: this.formatDate(document.createdAt),
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
  },
};
</script>
