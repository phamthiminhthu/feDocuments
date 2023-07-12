<template>
  <v-dialog v-model="dialogModal" max-width="500px">
    <v-card v-if="collection">
      <v-card-title>
        <span>Edit Collection Name</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0">
              <span class="subheading"> Collection Name </span>
              <v-text-field
                class="mt-4"
                label="Name"
                placeholder="Collection Name"
                v-model="newCollectionName"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="saveCollection"> Save </v-btn>
        <v-btn color="primary" text @click="closeDialog"> Close </v-btn>
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
  data() {
    return {
      newCollectionName: null,
      dialogModal: this.dialog,
    };
  },
  watch: {
    collectionName() {
      this.newCollectionName = this.collectionName;
    },
    id() {
      this.fetchCollectionById();
    },
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    async saveCollection() {
      if (this.groupId == null) {
        try {
          const response = await this.$axios.post(
            `/owner/management/collection/rename/${this.id}?name=${this.newCollectionName}`
          );
          if (response) {
            this.$emit("update-collection", response);
          }
        } catch (error) {
          this.$emit("update-collection", error);
          console.log(error);
        }
      } else {
        const formData = new FormData();
        formData.append("collectionName", this.newCollectionName);
        try {
          const response = await this.$axios.post(
            `/management/group/${this.groupId}/collection/update/${this.id}`,
            formData
          );
          if (response) {
            this.$emit('update-collection', response);
          }
        } catch (error) {
          this.$emit('update-collection', error);
          console.log(error);
        }
      }
    },
    closeDialog() {
      this.newCollectionName = this.collectionName;
      this.$emit("close-dialog");
    },
    async fetchCollectionById() {
      await this.$store.dispatch("collections/fetchCollectionById", {
        id: this.id,
      });
    },
  },
};
</script>
