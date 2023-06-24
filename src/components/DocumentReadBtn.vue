<template>
  <div>
    <v-list-item @click="readFile">
      <v-list-item-avatar>
        <v-icon class="blue white--text"> mdi-clipboard-text </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ document.docsName }}</v-list-item-title>

        <v-list-item-subtitle>{{ createdAt() }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import { format, isToday } from "date-fns";
import * as pdfjsLib from "pdfjs-dist";
export default {
  props: {
    document: Object,
    default: null,
  },
  data() {
    return {
      pdfSrc: null,
        pdfPageCount: 0,
      currentPage: 1
    };
  },
  methods: {
    createdAt: function () {
      var date = this.document.createdAt;
      if (date != undefined) {
        return this.formatDate(date);
      }
      return date;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isToday(date)) {
        return format(date, "hh:mm");
      } else {
        return format(date, "dd/MM/yyyy");
      }
    },
    async readFile() {
      try {
        const response = await this.$axios.get(
          `/management/document/display/${this.document.documentKey}`,
          { responseType: "arraybuffer" }
        );
        if (response) {
          console.log(response.data);
          const loadingTask = pdfjsLib.getDocument({ data: response.data });

          loadingTask.promise
            .then((pdf) => {
              const numPages = pdf.numPages;
              console.log(numPages);

              // Create a new window to display the PDF
              const newWindow = window.open("", "_blank");

              // Loop through each page and render it to the new window
              for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                pdf.getPage(pageNum).then((page) => {
                  const scale = 1.5;
                  const viewport = page.getViewport({ scale });
                  const canvas = document.createElement("canvas");
                  const context = canvas.getContext("2d");
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;

                  const renderContext = {
                    canvasContext: context,
                    viewport,
                  };

                  page.render(renderContext).promise.then(() => {
                    // Append the rendered page to the new window
                    newWindow.document.body.appendChild(canvas);
                  });
                });
              }
            })
            .catch((error) => {
              console.error("Error rendering PDF:", error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
