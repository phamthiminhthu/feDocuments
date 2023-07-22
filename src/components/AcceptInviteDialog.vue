<template>
  <v-dialog v-model="dialogModal" persistent max-width="500px">
    <v-card v-if="id">
      <v-card-title>
        <span>Accept Invite</span>
        <v-spacer></v-spacer>
        <v-icon large @click="closeDialog" color="black">mdi-alpha-x</v-icon>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0">
              <span class="subheading">
                Join Group *<strong>{{ groupName }}</strong
                >*</span
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" text @click="joinGroup"> Accept </v-btn>
        <v-btn color="red darken-1" text @click="declineGroup"> Decline </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: null,
      required: true,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogModal: this.dialog,
    };
  },
  mounted() {
    this.fetchGroupName();
  },
  computed: {
    groupName() {
      return this.$store.getters["groups/getGroupName"];
    },
  },
  watch: {
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    async joinGroup() {
      try {
        const response = await this.$axios.post(
          `/management/group/${this.id}/accept/invite`
        );
        if (response) {
          this.$emit("accept-invite", response);
        }
      } catch (error) {
        this.$emit("accept-invite", error);
        console.log(error);
      }
    },
    async declineGroup() {
      try {
        const response = await this.$axios.post(
          `/management/group/${this.id}/invite/decline`
        );
        if (response) {
          this.$emit("decline-invite", response);
        }
      } catch (error) {
        console.log(error);
        this.$emit("decline-invite", error);
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    async fetchGroupName() {
      await this.$store.dispatch("groups/fetchGroupNameById", {
        groupId: this.id,
      });
    },
  },
};
</script>
