<template>
  <v-snackbar
    timeout="3000"
    v-model="notifyModel"
    absolute
    top
    :color="status ? 'success' : 'error'"
    right
    class="!top-[100px]"
  >
    {{ message }}
  </v-snackbar>
</template>
<script>
export default {
  data() {
    return {
      notifyModel: false,
    };
  },
  props: {
    notify: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    notify() {
      this.notifyModel = this.notify;
    },
  },
};
</script>
