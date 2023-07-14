<template>
  <div id="pdf-viewer">
    <WebViewer :documentKey="documentKey" v-if="documentKey" />
  </div>
</template>

<script>
export default {
  name: 'PdfViewer',
  data() {
    return {
      documentKey: ""
    }
  },
  mounted() {
    this.documentKey = this.$route.params.id;
  }
}
</script>


<style>

#pdf-viewer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  height: 100vh;
  width: 100%;
}

#webviewer {
  height: 100vh;
}
</style>
