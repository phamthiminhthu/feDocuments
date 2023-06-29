<template>
  <div class="mb-48">
    <div class="text-center landing-title-page mb-5">Trash</div>
    <Documents
      :documents="filterDocuments"
      @documents-updated="handleChangeListDocument"
      :status="trash"
    ></Documents>
  </div>
</template>
<script>
export default {
  name: "Trash",
  layout: "base",
  data() {
      return {
        trash: "trash",
    };
  },
  mounted() {
    this.fetchDocumentsOnTrash();
  },
  computed: {
    documents() {
      return this.$store.getters["documents/getDocuments"];
    },
    filterDocuments() {
      if (this.documents && Array.isArray(this.documents)) {
        return this.documents.map((document) => {
          return {
            id: document.documentKey,
            authors: document.authors,
            title: document.title,
            publishingYear: document.publishingYear,
            createdAt: document.createdAt,
            typeDocumentsList: document.typeDocumentsList,
            loved: document.loved,
          };
        });
      }
    },
  },
  methods: {
    async fetchDocumentsOnTrash() {
      await this.$store.dispatch("documents/fetchDocumentsOnTrash");
    },
    handleChangeListDocument() {
      this.fetchDocumentsOnTrash();
    },
  },
};
</script>
