<template>
  <div class="upload-file-docs">
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
      <v-alert
        dense
        outlined
        type="error"
        v-model="notify"
        dismissible
        class="w-2/5"
      >
        {{ errorMessages }}
      </v-alert>
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
        hide-input
        class="px-4"
        prepend-icon=""
        @change="uploadFile"
      ></v-file-input>
    </v-form>
    <div>
      <v-snackbar
        v-if="selectedFile"
        :timeout="-1"
        v-model="snackbar"
        bottom
        color="indigo"
        tile
        right
      >
        Uploading
        <strong> {{ selectedFile.name }} </strong> ...
      </v-snackbar>

      <v-snackbar
        v-if="selectedFile"
        :timeout="5000"
        v-model="snackbarSuccess"
        bottom
        color="success"
        tile
        right
      >
        Uploaded file <strong> {{ selectedFile.name }} </strong> Successfully !
      </v-snackbar>

      <v-snackbar
        v-model="snackbarFileExists"
        bottom
        color="orange darken-3"
        tile
        right
        :timeout="-1"
        :vertical="vertical"
        class="snack-same-file"
      >
        <span class="landing-font-14 font-semibold">
          <v-icon>mdi-alert</v-icon> You have previously uploaded this document
          to the system! Do you want to compare?</span
        >

        <div class="mt-2 !pb-0">
          <v-list-item
            v-for="docs in documentSameExists"
            :key="docs.documentKey"
          >
            <v-list-item-avatar>
              <v-icon class="grey lighten-1" dark> mdi-clipboard-text </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-if="docs.title != null">{{
                docs.title
              }}</v-list-item-title>

              <v-list-item-subtitle v-if="docs.docsName">{{
                docs.docsName
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-card-actions>
              <v-btn icon @click="compareFile(docs.documentKey)">
                <v-icon color="white">mdi-file-compare</v-icon>
              </v-btn>
              <v-btn icon @click="compareClose(docs.documentKey)">
                <v-icon color="white">mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-list-item>
        </div>
        <template v-slot:action="{ attrs }">
          <v-btn
            class="mr-3"
            color="white"
            text
            v-bind="attrs"
            @click="snackbarFileExists = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
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
          value.size < 18000000 ||
          "File size should be less than 18 MB!",
      ],
      errorMessages: "",
      snackbar: false,
      snackbarSuccess: false,
      snackbarFileExists: false,
      notify: false,
      documentSameExists: null,
      currentDocumentKey: null,
      vertical: true,
    };
  },
  props: {
    idCollection: {
      type: String,
      default: null,
    },
    groupId: {
      type: String,
      default: null,
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.$el.querySelector("input[type='file']").click();
    },
    async uploadFile() {
      if (this.idCollection == null && this.groupId == null) {
        this.uploadFileDocument();
      } else if (this.groupId == null && this.idCollection != null) {
        this.uploadFileCollection();
      } else if (this.groupId != null) {
        this.uploadFileOnGroup();
      }
    },
    async uploadFileDocument() {
      if (this.selectedFile && this.selectedFile.type != "application/pdf") {
        this.errorMessages = "Only allow PDF files !";
        this.notify = true;
      } else if (this.selectedFile && this.selectedFile.size <= 18000000) {
        console.log(this.selectedFile.type);
        this.snackbarSuccess = false;
        this.snackbar = true;
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
            this.$emit("upload-file", response);
            const data = response.data.content;
            this[l] = false;
            this.loader = null;
            this.snackbar = false;
            this.currentDocumentKey = data.documentKey;
            if (data != null && data.documentsDtoSameHashcode != null) {
              this.snackbarFileExists = true;
              this.documentSameExists = data.documentsDtoSameHashcode;
            } else if (data != null) {
              this.snackbarSuccess = true;
            }
          }
        } catch (error) {
          this.$emit("upload-file", error);
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = false;
        }
      } else if (this.selectedFile && this.selectedFile.size > 18000000) {
        this.errorMessages = "File size should be less than 18 MB!";
        this.notify = true;
      }
    },
    async uploadFileCollection() {
      if (this.selectedFile && this.selectedFile.type != "application/pdf") {
        this.errorMessages = "Only allow PDF files !";
        this.notify = true;
      } else if (
        this.selectedFile &&
        this.idCollection &&
        this.selectedFile.size <= 18000000
      ) {
        this.snackbarSuccess = false;
        this.snackbar = true;
        this.loader = "loading";
        const l = this.loader;
        this[l] = !this[l];
        let formData = new FormData();
        formData.append("file", this.selectedFile);
        try {
          const response = await this.$axios.post(
            `/owner/management/collection/document/create?collectionId=${this.idCollection}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (response) {
            this.$emit("upload-file", response);
            const data = response.data.content;
            this[l] = false;
            this.loader = null;
            this.snackbar = false;
            this.currentDocumentKey = data.documentKey;
            if (data != null && data.documentsDtoSameHashcode != null) {
              this.snackbarFileExists = true;
              this.documentSameExists = data.documentsDtoSameHashcode;
            } else if (data != null) {
              this.snackbarSuccess = true;
            }
          }
        } catch (error) {
          this.$emit("upload-file", error);
          console.log(error);
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = false;
        }
      } else if (
        this.selectedFile &&
        this.idCollection &&
        this.selectedFile.size > 18000000
      ) {
        this.errorMessages = "File size should be less than 18 MB!";
        this.notify = true;
      }
    },
    async uploadFileOnGroup() {
      if (
        this.groupId &&
        this.selectedFile &&
        this.selectedFile.size <= 18000000
      ) {
        this.snackbarSuccess = false;
        this.snackbar = true;
        this.loader = "loading";
        const l = this.loader;
        this[l] = !this[l];
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        try {
          this.idCollection = this.idCollection ? this.idCollection : null;
          const response = await this.$axios.post(
            `/management/group/${this.groupId}/document/create?collectionId=${this.idCollection}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (response) {
            this.$emit("upload-file", response);
            this[l] = false;
            this.loader = null;
            this.snackbar = false;
            const data = response.data.content;
            this.currentDocumentKey = data.documentKey;
            if (data != null && data.documentsDtoSameHashcode != null) {
              this.snackbarFileExists = true;
              this.documentSameExists = data.documentsDtoSameHashcode;
            } else if (data != null) {
              this.snackbarSuccess = true;
            }
          }
        } catch (error) {
          this.$emit("upload-file", error);
          console.log(error);
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = false;
        }
      } else if (
        this.groupId &&
        this.selectedFile &&
        this.selectedFile.size > 18000000
      ) {
        this.errorMessages = "File size should be less than 18 MB!";
        this.notify = true;
      }
    },
    compareFile(documentKey) {
      if (documentKey != null && this.currentDocumentKey != null) {
        const url = `/document/compare?document1=${documentKey}&document2=${this.currentDocumentKey}`;
        window.open(url, "_blank");
      }
    },
    compareClose(documentKey) {
      let index = this.documentSameExists.findIndex(
        (item) => item.documentKey === documentKey
      );
      this.documentSameExists.splice(index, 1);
      if (this.documentSameExists.length === 0) {
        this.snackbarFileExists = false;
      }
    },
  },
};
</script>
<style lang="scss">
.snack-same-file .v-snack__content {
  padding-bottom: 0px !important;
}
</style>
