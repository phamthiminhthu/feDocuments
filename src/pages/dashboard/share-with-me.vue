<template>
  <div class="mb-48">
    <div class="text-center landing-title-page mb-5">Share With Me</div>
    <Documents
      :documents="filterDocuments"
      @documents-updated="handleChangeListDocument"
      :status="share"
    ></Documents>
  </div>
</template>
<script>
export default {
  name: "Public",
  layout: "base",
  data() {
    return {
      share: "share",
    };
  },
  mounted() {
    this.fetchDocumentSharedMe();
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
    async fetchDocumentSharedMe() {
      await this.$store.dispatch("documents/fetchDocumentSharedWithMe");
    },
    handleChangeListDocument() {
      this.fetchDocumentSharedMe();
    },
  },
};
</script>
