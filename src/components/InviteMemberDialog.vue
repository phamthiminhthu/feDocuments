<template>
  <v-dialog v-model="dialogModal" persistent max-width="700">
    <v-card v-if="groupDetails">
      <v-card-title class="text-h5">Invite Member Group</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0 text-center">
              <span class="landing-font-18">
                Group *<strong>{{ groupDetails.groupName }}</strong
                >*
                <span class="subheading"> Owner </span>
              </span>
            </v-col>
            <v-col cols="12" class="!p-[5px] mt-3">
              <v-combobox
                v-model="select"
                :items="items"
                outlined
                label="Add people with email address"
                multiple
                chips
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    close
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" text @click="shareGroupUser"> Share </v-btn>
        <v-btn color="green darken-1" text @click="closeDialog"> Cancel </v-btn>
        <v-snackbar
          timeout="3000"
          v-model="snackbar"
          :color="status ? 'success' : 'error'"
          absolute
          right
          rounded="pill"
          top
        >
          {{ message }}
        </v-snackbar>
        <v-snackbar
          :timeout="-1"
          v-model="snackbarInvite"
          color="amber darken-2"
          absolute
          right
          rounded="pill"
          top
        >
          Sending an invitation to join a group to someone else via email.
        </v-snackbar>
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
      items: [],
      select: [],
      snackbar: false,
      status: false,
      message: null,
      snackbarInvite: false,
    };
  },
  mounted() {
    this.fetchGroupDetails();
  },
  computed: {
    groupDetails() {
      return this.$store.getters["groups/getGroupDetails"];
    },
  },
  watch: {
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    async fetchGroupDetails() {
      await this.$store.dispatch("groups/fetchDataGroupDetails", {
        groupId: this.groupId,
      });
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    async shareGroupUser() {
      this.snackbarInvite = true;
      try {
        const response = await this.$axios.post(
          `/management/group/${this.groupId}/invite`,
          this.select
        );
        if (response) {
          this.snackbarInvite = false;
          this.message = "Invite user successfully!";
          this.status = true;
          this.snackbar = true;
          this.$emit("update-invite");
        }
      } catch (e) {
        console.log(e);
        this.snackbarInvite = false;
        this.message = "Invite user failed!";
        this.status = false;
        this.snackbar = true;
      }
    },
  },
};
</script>
