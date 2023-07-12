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
      snackbar: false,
      snackbarSuccess: false,
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
      if (this.selectedFile) {
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
          }
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = true;
        } catch (error) {
          this.$emit("upload-file", error);
          console.log(error);
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = false;
        }
      }
    },
    async uploadFileCollection() {
      if (this.selectedFile && this.idCollection) {
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
          }
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = true;
        } catch (error) {
          this.$emit("upload-file", error);
          console.log(error);
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = false;
        }
      }
    },
    async uploadFileOnGroup() {
      if (this.groupId && this.selectedFile) {
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
          }
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = true;
        } catch (error) {
          this.$emit("upload-file", error);
          console.log(error);
          this[l] = false;
          this.loader = null;
          this.snackbar = false;
          this.snackbarSuccess = false;
        }
      }
    },
  },
};
</script>
