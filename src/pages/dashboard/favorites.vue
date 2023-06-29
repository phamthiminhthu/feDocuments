<template>
  <div class="mb-48">
    <div class="text-center landing-title-page mb-5">My Favorites</div>
    <Documents
      :documents="filterDocuments"
      @documents-updated="handleChangeListDocument"
    ></Documents>
  </div>
</template>
<script>
export default {
  name: "Favorites",
  layout: "base",
  mounted() {
    this.fetchDocumentLoved();
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
    async fetchDocumentLoved() {
      await this.$store.dispatch("documents/fetchDocumentsLoved");
    },
    handleChangeListDocument() {
      this.fetchDocumentLoved();
    },
  },
};
</script>
