<template>
  <div>
    <EditProfile :user="user" v-if="user" />
  </div>
</template>
<script>
export default {
  layout: "base",
  mounted() {
    this.fetchDataUserByUsername();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    user() {
      return this.$store.getters["user/getUser"];
    },
  },
  methods: {
    async fetchDataUserByUsername() {
      await this.$store.dispatch("user/fetchDataUserByUsername", {
        username: this.username,
      });
    },
  },
};
</script>
