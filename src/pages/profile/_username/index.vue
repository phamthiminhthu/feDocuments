<template>
  <div class="pt-36">
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold"
    >
      Profile
    </h3>
    <div v-if="username" class="mt-12">
      <div>
        <UserCommon :username="username" />
      </div>
      <div class="document-publics w-4/5" style="margin: 0 auto">
        <DocumentShowItems
          :documents="documentsPublic"
          v-if="documentsPublic"
          @document-updated="handleUpdateDocuments"
          class="mt-16"
        />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
export default {
  layout: "guest",
  meta: {
    requiresAuth: false,
  },
  mounted() {
    this.fetchDocumentsPublicByUsername();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    documentsPublic() {
      return this.$store.getters["documents/getDocuments"];
    },
  },
  methods: {
    async fetchDocumentsPublicByUsername() {
      await this.$store.dispatch("documents/fetchDocumentsPublicByUsername", {
        username: this.username,
      });
    },
    handleUpdateDocuments() {
      this.fetchDocumentsPublicByUsername();
    },
  },
};
</script>
