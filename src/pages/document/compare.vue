<template>
  <div
    id="pdf-viewer-compare"
    v-if="documentKey1 != null && documentKey2 != null"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <WebViewer
            :path="`${publicPath}webviewer`"
            :documentKey="documentKey1"
            v-if="documentKey1"
          />
        </v-col>
        <v-col cols="6">
          <WebViewer
            :path="`${publicPath}webviewer`"
            :documentKey="documentKey2"
            v-if="documentKey2"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PdfViewerCompare",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      documentKey1: null,
      documentKey2: null,
    };
  },
  mounted() {
    this.documentKey1 = this.$route.query.document1;
    this.documentKey2 = this.$route.query.document2;
  },
};
</script>

<style>
#pdf-viewer-compare {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  height: 100vh;
  width: 100%;
}
</style>
