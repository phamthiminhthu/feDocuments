<template>
  <div>
    <CollectionDetails :idCollection="idCollection" :groupId="groupId"/>
  </div>
</template>
<script>
export default {
  layout: "base",
  data() {
    return {
      groupId: null
    }
  },
  computed: {
    idCollection() {
      return this.$route.params.id;
    },

  },
}
</script>
