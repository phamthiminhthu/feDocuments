<template>
  <div class="mb-48">
    <div class="text-center landing-title-page mb-5">Document Completed</div>
    <Documents
      :documents="filterDocuments"
      @documents-updated="handleChangeListDocument"
    ></Documents>
  </div>
</template>
<script>
export default {
  name: "Compeleted",
  layout: "base",
  mounted() {
    this.fetchDocumentCompleted();
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
    async fetchDocumentCompleted() {
      await this.$store.dispatch("documents/fetchDocumentCompleted");
    },
    handleChangeListDocument() {
      this.fetchDocumentCompleted();
    },
  },
};
</script>
