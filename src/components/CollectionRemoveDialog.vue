<template>
  <v-dialog v-model="dialogModal" max-width="500px">
    <v-card v-if="collection">
      <v-card-title>
        <span>Delete Collection? </span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0">
              <span class="subheading">
                Collection <strong>{{ collectionName }}</strong> is about to be
                permanently deleted. The references in this collection will
                remain in your library.
              </span>
              <div class="landing-font-14 mt-2 font-bold">Are you sure?</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="deleteCollection"> Yes </v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog"> No </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: null,
      required: true,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    groupId: null,
  },
  data() {
    return {
      dialogModal: this.dialog,
    };
  },
  mounted() {
    this.fetchCollectionById();
  },
  computed: {
    collection() {
      return this.$store.getters["collections/getCollection"];
    },
    collectionName: {
      get: function () {
        if (this.collection != null) {
          return this.collection.collectionName;
        }
      },
    },
  },
  watch: {
    id() {
      this.fetchCollectionById();
    },
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    async deleteCollection() {
      if (this.groupId != null) {
        try {
          const response = await this.$axios.post(
            `/management/group/${this.groupId}/collection/delete/${this.id}`
          );
          if (response) {
            this.$emit("remove-collection", response);
          }
        } catch (error) {
          this.$emit("remove-collection", error);
          console.log(error);
        }
      } else {
        try {
          const response = await this.$axios.post(
            `/owner/management/collection/delete/${this.id}`
          );
          if (response) {
            this.$emit("remove-collection", response);
          }
        } catch (error) {
          this.$emit("remove-collection", error);
          console.log(error);
        }
      }
    },
    async fetchCollectionById() {
      await this.$store.dispatch("collections/fetchCollectionById", {
        id: this.id,
      });
    },
  },
};
</script>
