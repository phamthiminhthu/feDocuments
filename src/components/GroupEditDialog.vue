<template>
  <v-dialog v-model="dialogModal" max-width="500px">
    <v-card v-if="group">
      <v-card-title>
        <span>Edit Group Name</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0">
              <span class="subheading"> Group Name </span>
              <v-text-field
                class="mt-4"
                label="Name"
                placeholder="Group Name"
                v-model="newGroupName"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="saveGroup"> Save </v-btn>
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
  },
  mounted() {
    this.fetchGroupById();
  },
  computed: {
    group() {
      return this.$store.getters["groups/getGroupDetails"];
    },
    groupName: {
      get: function () {
        if (this.group != null) {
          return this.group.groupName;
        }
      },
    },
  },
  data() {
    return {
      newGroupName: null,
      dialogModal: this.dialog,
    };
  },
  watch: {
    groupName() {
      this.newGroupName = this.groupName;
    },
    id() {
      this.fetchGroupById();
    },
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    async saveGroup() {
      const formData = new FormData();
      formData.append("groupName", this.newGroupName);
      try {
        const response = await this.$axios.post(
          `/management/group/update/${this.id}`,
          formData
        );
        if (response) {
          this.$emit("update-group", response);
        }
      } catch (error) {
        this.$emit("update-group", error);
        console.log(error);
      }
    },
    closeDialog() {
      this.newGroupName = this.groupName;
      this.$emit("close-dialog");
    },
    async fetchGroupById() {
      await this.$store.dispatch("groups/fetchDataGroupDetails", {
        groupId: this.id,
      });
    },
  },
};
</script>
