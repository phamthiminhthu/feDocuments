<template>
  <div>
    <CollectionDetails :idCollection="idCollection" :groupId="groupId" />
  </div>
</template>
<script>
export default {
  layout: "base",
  computed: {
    idCollection() {
      return this.$route.params.id;
    },
    groupId() {
      return this.$route.fullPath.split("/")[2];
    },
  },
};
</script>
