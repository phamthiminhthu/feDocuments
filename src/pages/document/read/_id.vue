<template>
  <div class="text-center">
    <div ref="pdfContainer"></div>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";

export default {
  data() {
    return {
      documentKey: "",
    };
  },
  mounted() {
    this.documentKey = this.$route.params.id;
    this.loadPDF();
  },
  methods: {
    async loadPDF() {
      try {
        // const pdfData = this.getPdfDataFromStorage();
          const response = await this.$axios.get(
            `/management/document/display/${this.documentKey}`,
            { responseType: "arraybuffer" }
          );

        if (response) {
            console.log(response.data);
            this.renderPDF(response.data); // Render the PDF from the retrieved data
          }
      } catch (error) {
        console.log(error);
      }
    },
    renderPDF(pdfData) {
      const loadingTask = pdfjsLib.getDocument({ data: pdfData });

      loadingTask.promise
        .then((pdf) => {
          // Create a new canvas element to render the PDF
          const pdfContainer = this.$refs.pdfContainer;

          // Loop through each page and render it on the canvas
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then((page) => {
              const viewport = page.getViewport({ scale: 1 });
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");

              canvas.width = viewport.width;
              canvas.height = viewport.height;

              const renderContext = {
                canvasContext: context,
                viewport,
              };

              page.render(renderContext).promise.then(() => {
                // Append the canvas to the container element
                pdfContainer.appendChild(canvas);
              });
            });
          }
        })
        .catch((error) => {
          console.error("Error rendering PDF:", error);
        });
    },
  },
};
</script>
