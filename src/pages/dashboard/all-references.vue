<template>
  <div>
    <div class="text-center landing-title-page mb-5">All References</div>
    <div class="upload-file-docs mt-10 mb-2 px-3">
      <v-form @submit.prevent="uploadFile">
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="#111827"
          class="ma-2 white--text"
          @click="triggerFileInput"
        >
          Upload File
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <v-file-input
          ref="fileInput"
          v-model="selectedFile"
          outlined
          show-size
          :rules="rules"
          truncate-length="50"
          accept="application/pdf"
          placeholder="File Document Upload"
          label="File Upload"
          class="px-4"
          hide-input
          prepend-icon=""
          @change="uploadFile"
        ></v-file-input>
      </v-form>
    </div>
    <div>
      <Documents :documents="filterDocuments" @documents-updated="handleChangeListDocument" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  layout: "base",
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
    };
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
    triggerFileInput() {
      this.$refs.fileInput.$el.querySelector("input[type='file']").click();
    },
    async uploadFile() {
      if (this.selectedFile) {
        console.log(this.selectedFile);
        this.loader = "loading";
        const l = this.loader;
        this[l] = !this[l];
        let formData = new FormData();
        formData.append("file", this.selectedFile);
        try {
          const response = await this.$axios.post(
            "management/document/upload",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (response) {
            this.fetchDocuments();
          }
          this[l] = false;
          this.loader = null;
        } catch (error) {
          console.log(error);
          this[l] = false;
          this.loader = null;
        }
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
