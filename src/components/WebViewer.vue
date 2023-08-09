<template>
  <div>
    <div class="text-center">
      <v-container style="height: 400px" v-if="loading">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            Getting your files
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="deep-purple accent-4"
              indeterminate
              rounded
              height="10"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
      <div id="webviewer" ref="viewer"></div>
    </div>
  </div>
</template>

<script>
// import PDFJSExpress from "@pdftron/pdfjs-express-viewer";
import WebViewer from '@pdftron/webviewer'

export default {
  props: {
    path: String,
    documentKey: String,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.loadPDF();
  },
  methods: {
    async loadPDF() {
      this.loading = true;
      try {
        const response = await this.$axios.get(
          `/management/document/display/${this.documentKey}`,
          { responseType: "arraybuffer" }
        );

        if (response) {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob)
          WebViewer(
            {
              path: "../webviewer",
              enableAnnotations: true,
              enableOfficeEditing: true,
              initialDoc: url,
              licenseKey: 'demo:1690043076994:7c705078030000000065a4ddfab637da346b9b9d08d11c4ea020a6b3a9'
            },
            this.$refs.viewer
          ).then((instance) => {
            // instance.UI.loadDocument(blob, { filename: "file.pdf" });
            instance.UI.setLanguage("en"); 
            instance.UI.enableFeatures([instance.UI.Feature.MultiTab])

            const { Core, UI } = instance;

            // adding an event listener for when a document is loaded
            Core.documentViewer.addEventListener("documentLoaded", () => {
              console.log("document loaded");
            });

            Core.documentViewer.addEventListener(
              "pageNumberUpdated",
              (pageNumber) => {
                console.log(`Page number is: ${pageNumber}`);
              }
            );

            // adds a button to the header that on click sets the page to the next page
            UI.setHeaderItems((header) => {
              header.push({
                type: "actionButton",
                img: "https://icons.getbootstrap.com/assets/icons/caret-right-fill.svg",
                onClick: () => {
                  const currentPage = Core.documentViewer.getCurrentPage();
                  const totalPages = Core.documentViewer.getPageCount();
                  const atLastPage = currentPage === totalPages;

                  if (atLastPage) {
                    Core.documentViewer.setCurrentPage(1);
                  } else {
                    Core.documentViewer.setCurrentPage(currentPage + 1);
                  }
                },
              });
            });
          });
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>
<style>
#webviewer {
  height: 100vh;
  width: 100%;
}
</style>
