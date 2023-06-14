<template>
  <div>
    <div class="text-center">Homepage</div>
    <div>
      <Documents :documents="filterDocuments" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  layout: "base",
  async mounted() {
    await Promise.all([this.$store.dispatch("document/fetchDataAllDocuments")]);
  },
  computed: {
    documents() {
      return this.$store.getters["document/getDocuments"];
    },
    filterDocuments() {
      if (this.documents && Array.isArray(this.documents)) {
        return this.documents.map((document) => {
          return {
            authors: document.authors,
            title: document.title,
            publishingYear: document.publishingYear,
            createdAt: document.createdAt,
            typeDocumentsList: document.typeDocumentsList,
          };
        });
      }
    },
  },
};
</script>
