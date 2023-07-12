<template>
  <div class="mb-48 all-references">
    <div class="text-center landing-title-page mb-5">All References</div>
    <div class="upload-file-docs mt-10 mb-2 px-3">
      <UploadFileButton @upload-file="uploadFile" />
      <v-spacer></v-spacer>
      <div class="search-items">
        <SearchDocument
          @search-by-tags="onSearchByTags"
          @search-by-type-docs="onSearchByTypeDocs"
        />
      </div>
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
    async onSearchByTags(tag) {
      await this.$store.dispatch("documents/fetchDocumentsByTag", {
        tagName: tag,
      });
    },
    async onSearchByTypeDocs(typeName) {
      await this.$store.dispatch("documents/fetchDocumentsByTypeDocs", {
        typeName: typeName,
      });
    },
  },
};
</script>
<style lang="scss">
.all-references {
  .search-data {
    > button {
      margin-top: -40px;
    }
  }
}
</style>
