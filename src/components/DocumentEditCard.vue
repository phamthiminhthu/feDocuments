<template>
  <v-card class="edit-card-document" v-if="document">
    <v-card-title>
      <span class="text-h5">Edit Information</span>
      <v-spacer></v-spacer>
      <v-icon large @click="closeDialog" color="black">mdi-alpha-x</v-icon>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" class="chips-items">
            <span class="subheading" v-if="typeDocs.length > 0"
              >Type Document</span
            >
            <v-combobox
              v-model="typeDocs"
              :items="itemTypeDocument"
              chips
              clearable
              label="Type Document"
              multiple
              solo
              class="mt-2"
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="removeTypeDocs(item)"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12">
            <span class="subheading">Document's Title</span>
            <v-text-field
              v-model="newDocument.title"
              label="Title"
              outlined
              clearable
              class="mt-2"
            ></v-text-field>
            <span class="subheading">Document's Authors</span>
            <v-text-field
              v-model="newDocument.authors"
              label="Authors"
              outlined
              clearable
              class="mt-2"
            ></v-text-field>
            <span class="subheading">Document's Name </span>
              <v-text-field
                v-model="newDocument.docsName"
                label="DocsName"
                outlined
                clearable
                class="mt-2"
                required
              ></v-text-field>
            <span class="subheading">Document's Summary</span>
            <v-textarea
              v-model="newDocument.summary"
              label="Summary"
              outlined
              clearable
              class="mt-2 textarea-input"
            ></v-textarea>
            <span class="subheading">Document's Note</span>
            <v-textarea
              v-model="newDocument.note"
              label="Note"
              outlined
              clearable
              class="mt-2 textarea-input"
            ></v-textarea>
          </v-col>
          <v-col cols="12" class="chips-items">
            <span class="subheading" v-if="tags.length > 0">Tag Document</span>
            <v-combobox
              v-model="tags"
              :items="itemTags"
              chips
              clearable
              label="Tag Document"
              multiple
              solo
              class="mt-2"
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="removeTagDocs(item)"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12">
            <span class="subheading">Urls References</span>
            <v-btn
              class="mx-2"
              dark
              fab
              small
              color="indigo"
              @click="showContent = showContent === true ? false : true"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
            <div v-if="urls.length > 0" class="urls-references">
              <v-list-item v-for="url in urls" :key="url.id">
                <v-list-item-content>
                  <a
                    :href="url.url"
                    target="_blank"
                    class="v-list-item-content"
                  >
                    <v-list-item-title>{{ url.url }}</v-list-item-title>
                  </a>
                  <v-list-item-subtitle
                    v-if="url.description != null"
                    v-text="url.description"
                    class="!whitespace-normal"
                  >
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="deleteUrl(url.id)">
                    <v-icon color="primary">mdi-trash-can</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </div>
            <div v-if="showContent">
              <form @submit.prevent="createReferences">
                <v-text-field
                  v-model="urlReference.url"
                  label="Link"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="urlReference.description"
                  label="Description"
                  required
                ></v-text-field>
                <v-btn color="warning" elevation="2" small type="submit">
                  Save
                </v-btn>
              </form>
            </div>
            <v-divider class="mt-2"></v-divider>
          </v-col>
          <v-col cols="12">
            <div class="document-checkbox">
              <small>*Anyone can view your document</small>
              <v-checkbox
                :false-value="0"
                :true-value="1"
                v-model="newDocument.docsPublic"
                label="Share document with others"
              ></v-checkbox>
              <small>*Degree of completion</small>
              <v-checkbox
                :false-value="0"
                :true-value="1"
                v-model="newDocument.docsStatus"
                label="Document Completed"
              ></v-checkbox>
            </div>
          </v-col>
          <v-col col="12"> </v-col>
        </v-row>
      </v-container>
      <!-- <small>*indicates required field</small> -->
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
      <v-btn color="success darken-1" text @click="saveNewDataDocument">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    document: Object,
    default: null,
  },
  data() {
    return {
      typeDocs: [],
      urls: [],
      urlReference: {
        url: "",
        description: "",
      },
      itemTypeDocument: [
        "Journal Articles",
        "Monographs",
        "Conference Proceedings",
        "Theses and Dissertations",
        "Technical Reports",
        "Textbooks and Manuals",
        "Newsletters and Review Articles",
        "Preprints",
        "E-journals",
        "Whitepapers"
      ],
      newDocument: {
        title: "",
        publishingYear: "",
        authors: "",
        summary: "",
        docsName: "",
        note: "",
        loved: 0,
        docsPublic: 0,
        docsStatus: 0,
      },
      tags: [],
      itemTags: ["#Research", "#JournalArticle", "#ConferencePaper", "#Thesis", "#Abstract",
        "#LiteratureReview", "#Methodology", "#DataAnalysis", "#Results", "#Discussion", "#Conclusion",
        "#QuantitativeResearch", "#Survey", "#Experiment", "#CaseStudy", "#ReviewArticle", "#MetaAnalysis",
      "#Hypothesis", "#LiteratureCitation"],
      showContent: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    getTypeDocs(objDocument) {
      if (
        objDocument.typeDocumentsList != null &&
        objDocument.typeDocumentsList.length > 0
      ) {
        let listType = [];
        for (let i = 0; i < objDocument.typeDocumentsList.length; i++) {
          listType.push(objDocument.typeDocumentsList[i].typeName);
        }
        return listType;
      }
      return [];
    },
    getTagsDocs(objDocument) {
      if (objDocument.tags != null && objDocument.tags.length > 0) {
        let listTags = [];
        for (let i = 0; i < objDocument.tags.length; i++) {
          listTags.push(objDocument.tags[i].tagName);
        }
        return listTags;
      }
      return [];
    },
    removeTypeDocs(item) {
      this.typeDocs.splice(this.typeDocs.indexOf(item), 1);
    },
    removeTagDocs(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
    },
    async saveNewDataDocument() {
      this.$emit("close-dialog");
      try {
        const response = await this.$axios.post(
          `/management/document/edit?documentKey=${this.document.documentKey}`,
          {
            documentModel: this.newDocument,
            tags: this.tags,
            typesDoc: this.typeDocs,
          }
        );
        if (response) {
          this.document = this.$store.getters["document/getDocument"];
          this.$emit("document-update");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createReferences(e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const response = await this.$axios.post(
          `/management/document/url/create?documentKey=${this.document.documentKey}`,
          {
            url: this.urlReference.url,
            description: this.urlReference.description,
          }
        );
        if (response) {
          await this.fetchDocumentUrls(this.document.documentKey);
          this.urls = this.$store.getters["document/getUrls"];
          this.showContent = false;
          this.urlReference.url = "";
          this.urlReference.description = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUrl(idUrl) {
      try {
        const response = await this.$axios.post(
          `/management/document/url/delete/${idUrl}`
        );
        if (response) {
          await this.fetchDocumentUrls(this.document.documentKey);
          this.urls = this.$store.getters["document/getUrls"];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDocumentUrls(documentKey) {
      await this.$store.dispatch("document/fetchUrlsDocumentByDocumentKey", {
        documentKey: documentKey,
      });
    },
  },
  watch: {
    document: function () {
      this.typeDocs = this.getTypeDocs(this.document);
      this.newDocument.title = this.document.title;
      this.newDocument.publishingYear = this.document.publishingYear;
      this.newDocument.authors = this.document.authors;
      this.newDocument.summary = this.document.summary;
      this.newDocument.note = this.document.note;
      this.newDocument.docsName = this.document.docsName;
      this.tags = this.getTagsDocs(this.document);
      this.urls = this.document.urls;
      this.newDocument.docsStatus = this.document.docsStatus;
      this.newDocument.loved = this.document.loved;
      this.newDocument.docsPublic = this.document.docsPublic;
    },
  },
};
</script>

<style lang="scss">
.edit-card-document {
  .col-12 {
    padding: 5px;
  }
  .chips-items {
    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
      > .v-input__control
      > .v-input__slot {
      box-shadow: none !important;
      padding: 0px !important;
    }
  }

  .v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 0px !important;
  }

  .document-checkbox {
    .v-input--selection-controls {
      margin-top: 5px;
      padding-top: 0px;
    }
  }
  .textarea-input {
    .v-input__control > .v-input__slot {
      height: 120px;
    }
  }
}
</style>
