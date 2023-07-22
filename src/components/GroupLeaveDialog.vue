<template>
  <v-dialog v-model="dialogModal" max-width="500px">
    <v-card v-if="groupName">
      <v-card-title>
        <span>Leave Group </span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0">
              <span class="subheading">
                If you leave <strong>{{ groupName }}</strong
                >, you will no longer have access to the references in the
                group. You will not be able to rejoin the group unless
                re-invited by a member or admin. Are you sure you want to
                continue?.
              </span>
              <div class="landing-font-14 mt-2 font-bold">Are you sure?</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="leaveGroup"> Yes </v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog"> No </v-btn>
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
    groupId: {
      type: Number,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      dialogModal: this.dialog,
    };
  },
  mounted() {
    this.fetchGroupNameById();
  },
  computed: {
    groupName() {
      return this.$store.getters["groups/getGroupName"];
    },
  },
  watch: {
    groupId() {
      this.fetchGroupNameById();
    },
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    async leaveGroup() {
      if (this.groupId != null) {
        try {
          const response = await this.$axios.post(
            `/management/group/${this.groupId}/leave`
          );
          if (response) {
            this.$emit("leave-group", response);
          }
        } catch (error) {
          this.$emit("leave-group", error);

          console.log(error);
        }
      }
    },
    async fetchGroupNameById() {
      await this.$store.dispatch("groups/fetchGroupNameById", {
        groupId: this.groupId,
      });
    },
  },
};
</script>
