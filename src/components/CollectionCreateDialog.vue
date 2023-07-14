<template>
  <v-dialog v-model="dialogModal" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h5"> Create new collection </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0">
              <span class="subheading"> Collection Name </span>
              <v-text-field
                class="mt-4"
                label="Name"
                placeholder="Collection Name"
                v-model="collectionName"
                :rules="collectionNameRules"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          text
          :disabled="collectionName == null"
          @click="createCollection"
        >
          Save
        </v-btn>
        <v-btn color="green darken-1" text @click="closeDialog"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    parentCollectionId: {
      type: String,
      default: null,
    },
    groupId: null,
  },
  data() {
    return {
      collectionNameRules: [(v) => !!v || "Collection Name is required"],
      collectionName: null,
      dialogModal: this.dialog,
    };
  },
  watch: {
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    async createCollection(e) {
      e.preventDefault();
      if (this.groupId == null) {
        if (this.collectionName != null) {
          try {
            let collectionModel = {
              collectionName: this.collectionName,
              parentCollectionId:
                this.parentCollectionId != null
                  ? this.parentCollectionId
                  : null,
              groupId: this.groupId,
            };
            const response = await this.$axios.post(
              "/owner/management/collection/create",
              collectionModel
            );
            if (response) {
              this.collectionName = "";
              this.$emit("create-collection", response);
            }
          } catch (e) {
            if (e.response.status === 400) {
              this.$emit("create-collection", e);
              console.log(e);
            }
          }
        }
      } else {
        if (this.collectionName != null) {
          try {
            const response = await this.$axios.post(
              `management/group/${this.groupId}/collection/create`,
              {
                collectionName: this.collectionName,
                parentCollectionId: this.parentCollectionId,
                groupId: this.groupId,
              }
            );
            if (response) {
              this.collectionName = "";
              this.$emit("create-collection", response);
            }
          } catch (error) {
            console.log(error);
            this.$emit("create-collection", error);
          }
        }
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
};
</script>
