<template>
  <v-dialog v-model="dialogModal" persistent max-width="700">
    <v-card v-if="groupDetails">
      <v-card-title class="text-h5">
        <span>Manage Group</span>
        <v-spacer></v-spacer>
        <v-icon large @click="closeDialog" color="black">mdi-alpha-x</v-icon>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="!px-0 text-center">
              <span class="landing-font-18">
                Group *<strong>{{ groupDetails.groupName }}</strong
                >*
                <v-btn
                  class="landing-font-14 font-semibold mx-4"
                  depressed
                  x-small
                  v-if="groupDetails.statusOwner === 1"
                >
                  Owner
                </v-btn>
              </span>
            </v-col>
            <v-col cols="12" class="!px-0 mt-4">
              <v-btn
                dark
                color="indigo"
                class="float-right"
                @click="inviteMember"
              >
                <v-icon>mdi-account-multiple-plus</v-icon>
                <span class="mx-2">Invite member</span>
              </v-btn>
            </v-col>
            <v-col cols="12" class="!px-0 mt-4">
              <v-card class="!shadow-md">
                <v-tabs v-model="tab" background-color="white" icons-and-text>
                  <v-tabs-slider></v-tabs-slider>

                  <v-tab href="#tab-1">
                    Members
                    <v-icon>mdi-account-group</v-icon>
                  </v-tab>

                  <v-tab href="#tab-2">
                    Pending Invites
                    <v-icon>mdi-account-multiple-plus</v-icon>
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item value="tab-1">
                    <v-card flat>
                      <v-list
                        three-line
                        v-if="
                          formatedMembers != null && formatedMembers.length > 0
                        "
                      >
                        <template v-for="(member, index) in formatedMembers">
                          <v-list-item :key="index">
                            <v-list-item-avatar>
                              <v-img
                                v-if="member.image != null"
                                :src="member.image"
                              ></v-img>
                              <v-icon x-large v-else>
                                mdi-account-circle
                              </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title
                                v-text="member.username"
                              ></v-list-item-title>
                              <v-list-item-subtitle>
                                Joined at {{ member.joinDate }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-subheader
                                inset
                                v-if="member.statusOwner === 1"
                              >
                                Owner
                              </v-subheader>
                            </v-list-item-action>
                          </v-list-item>
                        </template>
                      </v-list>
                      <div v-else>
                        <span>No members group</span>
                      </div>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item value="tab-2">
                    <v-card flat>
                      <v-list
                        three-line
                        v-if="
                          formattedPendingInvites != null &&
                          formattedPendingInvites.length > 0
                        "
                      >
                        <template
                          v-for="(member, index) in formattedPendingInvites"
                        >
                          <v-list-item :key="index">
                            <v-list-item-avatar>
                              <v-img
                                v-if="member.image != null"
                                :src="member.image"
                              ></v-img>
                              <v-icon x-large v-else>
                                mdi-account-circle
                              </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title
                                v-text="member.email"
                              ></v-list-item-title>
                              <v-list-item-subtitle>
                                Invitation sent at {{ member.invitedDate }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-chip-group
                                multiple
                                active-class="primary--text"
                              >
                                <v-chip
                                  color="green"
                                  text-color="white"
                                  @click="resendInvite(member.email)"
                                >
                                  Resend
                                </v-chip>
                                <v-chip @click="cancelInvite(member.email)">
                                  Cancel
                                </v-chip>
                              </v-chip-group>
                            </v-list-item-action>
                          </v-list-item>
                        </template>
                      </v-list>
                      <div v-else class="mt-6 px-4">
                        <span class="landing-font-14 italic">
                          No Pending Invites
                        </span>
                      </div>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog"> Close </v-btn>
        <v-snackbar
          timeout="4000"
          v-model="snackbar"
          :color="status ? 'success' : 'error'"
          absolute
          right
          rounded="pill"
          top
        >
          {{ message }}
        </v-snackbar>
      </v-card-actions>
    </v-card>
    <InviteMemberDialog
      v-if="groupId"
      :dialog="inviteMemberDialog"
      :groupId="groupId"
      @close-dialog="inviteMemberDialog = false"
      @update-invite="updateInvite"
    />
  </v-dialog>
</template>
<script>
import { format, isToday } from "date-fns";
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
      tab: "tab-1",
      message: null,
      snackbar: false,
      status: false,
      inviteMemberDialog: false,
    };
  },
  mounted() {
    this.fetchGroupDetails();
  },
  computed: {
    groupDetails() {
      return this.$store.getters["groups/getGroupDetails"];
    },
    members() {
      return this.$store.getters["groups/getMembers"];
    },
    pendingInvites() {
      return this.$store.getters["groups/getPendingInvites"];
    },
    formatedMembers() {
      if (this.members != null && Array.isArray(this.members)) {
        return this.members.map((member) => ({
          ...member,
          joinDate: this.formatDate(member.createdAt),
        }));
      }
    },
    formattedPendingInvites() {
      if (this.pendingInvites != null && Array.isArray(this.pendingInvites)) {
        return this.pendingInvites.map((user) => ({
          ...user,
          invitedDate: this.formatDate(user.createdAt),
        }));
      }
    },
  },
  watch: {
    dialog() {
      this.dialogModal = this.dialog;
    },
    groupId() {
      this.fetchGroupDetails();
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isToday(date)) {
        return format(date, "hh:mm");
      } else {
        return format(date, "dd/MM/yyyy");
      }
    },
    async fetchGroupDetails() {
      if (this.groupId) {
        await Promise.all[
          (this.$store.dispatch("groups/fetchDataGroupDetails", {
            groupId: this.groupId,
          }),
          await this.$store.dispatch("groups/fetchMembersGroup", {
            groupId: this.groupId,
          }),
          await this.$store.dispatch("groups/fetchPendingInvitesGroup", {
            groupId: this.groupId,
          }))
        ];
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    async resendInvite(email) {
      let form = new FormData();
      form.append("email", email);
      try {
        const response = await this.$axios.post(
          `management/group/${this.groupId}/invite/resend`,
          form
        );
        if (response) {
          this.status = true;
          this.snackbar = true;
          this.message = "Resend invite successfully!";
        }
      } catch (error) {
        console.log(error);
        this.status = false;
        this.snackbar = true;
        this.message = "Resend invite failed!";
      }
    },
    async cancelInvite(email) {
      let form = new FormData();
      form.append("email", email);
      try {
        const response = await this.$axios.post(
          `management/group/${this.groupId}/invite/cancel`,
          form
        );
        if (response) {
          this.status = true;
          this.message = "Cancel invite successfully!";
          this.snackbar = true;
          this.fetchGroupDetails();
        }
      } catch (error) {
        console.log(error);
        this.message = "Cancel invite failed!";
        this.status = false;
        this.snackbar = true;
      }
    },
    inviteMember() {
      this.$emit("close-dialog");
      this.inviteMemberDialog = true;
    },
    updateInvite() {
      this.fetchGroupDetails();
    }
  },
};
</script>
