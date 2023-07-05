<template>
  <div class="mb-48">
    <div class="text-center landing-title-page mb-5">All References</div>
    <div class="upload-file-docs mt-10 mb-2 px-3">
      <UploadFileButton @upload-file="uploadFile" />
    </div>
    <div>
      <Documents
        :documents="filterDocuments"
        @documents-updated="handleChangeListDocument"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  layout: "base",
  data() {
    return {};
  },
  mounted() {
    this.fetchDocuments();
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
    uploadFile(response) {
      if (response.status == 200) {
        this.fetchDocuments();
      }
    },
    handleChangeListDocument() {
      this.fetchDocuments();
    },
    async fetchDocuments() {
      await Promise.all([
        this.$store.dispatch("documents/fetchDataAllDocuments"),
      ]);
    },
  },
};
</script>
