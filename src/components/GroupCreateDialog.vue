<template>
  <v-dialog v-model="dialogModal" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h5"> Create new group </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0">
              <span class="subheading"> Group Name </span>
              <v-text-field
                class="mt-4"
                label="Name"
                placeholder="Group Name"
                v-model="groupName"
                :rules="groupNameRules"
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
          color="success darken-1"
          text
          :disabled="groupName == null"
          @click="createGroupName"
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
  },
  data() {
    return {
      groupNameRules: [(v) => !!v || "Group Name is required"],
      groupName: null,
      dialogModal: false,
    };
  },
  watch: {
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    async createGroupName(e) {
      e.preventDefault();
      if (this.groupName != null) {
        let formData = new FormData();
        formData.append("groupName", this.groupName);
        try {
          const response = await this.$axios.post(
            "/management/group/create",
            formData
          );
          if (response) {
            this.groupName = "";
            this.$emit("create-group", response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
};
</script>
