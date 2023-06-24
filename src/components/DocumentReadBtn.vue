<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon class="blue white--text"> mdi-clipboard-text </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ document.docsName }}</v-list-item-title>

        <v-list-item-subtitle>{{ createdAt() }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import { format, isToday } from "date-fns";
export default {
  props: {
    document: Object,
    default: null,
  },
  data() {
    return {
      pdfSrc: null,
        pdfPageCount: 0,
      currentPage: 1
    };
  },
  methods: {
    createdAt: function () {
      var date = this.document.createdAt;
      if (date != undefined) {
        return this.formatDate(date);
      }
      return date;
    },
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
