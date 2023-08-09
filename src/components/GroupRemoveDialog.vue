<template>
  <v-dialog v-model="dialogModal" max-width="500px">
    <v-card v-if="group">
      <v-card-title>
        <span>Delete Collection? </span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0">
              <span class="subheading">
                Group <strong>{{ groupName }}</strong> is about to be
                permanently deleted. Members will no longer be able to access
                this group and all references and annotations in the group will
                be deleted.
              </span>
              <div class="landing-font-14 mt-2 font-bold">Are you sure?</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="deleteGroup"> Yes </v-btn>
        <v-btn color="primary" text @click="closeDialog"> No </v-btn>
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
      dialogModal: this.dialog,
    };
  },
  watch: {
    id() {
      this.fetchGroupById();
    },
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    async deleteGroup() {
      try {
        const response = await this.$axios.post(
          `/management/group/delete/${this.id}`
        );
          if (response) {
            this.$emit('delete-group', response)
            this.$router.push('/groups')
        }
      } catch (error) {
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
