<template>
  <div>
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold mt-24"
    >
      Group Invitations
    </h3>
    <div v-if="formattedInvitations" class="mt-12">
     <v-card class="mx-auto w-3/5">
      <div v-if="formattedInvitations.length <= 0" class="p-10">
          <span class="landing-font-18 italic"> 
            No pending invites.
          </span
          >
      </div>
     </v-card>
      <v-card
        class="w-3/5 mx-auto"
        v-if="formattedInvitations != null && formattedInvitations.length > 0"
        v-for="item in formattedInvitations"
        :key="item.id"
      >
        <v-card-text class="landing-font-16">
          You have been invited to group *<strong class="landing-font-18">{{
            item.groupName
          }}</strong
          >*
        </v-card-text>

        <v-card-actions>
          <span class="landing-font-12 mx-3">{{ item.inviteDate }}</span>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="acceptInvite(item.groupId)"
          >
            Accept
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="declineInvite(item.groupId)"
          >
            Decline
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import { format, isToday } from "date-fns";
export default {
  layout: "base",
  data() {
    return {
      dialog: false,
    };
  },
  mounted() {
    this.fetchInvitations();
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    invitations() {
      return this.$store.getters["groups/getInvitations"];
    },
    formattedInvitations() {
      if (this.invitations && Array.isArray(this.invitations)) {
        return this.invitations.map((invitation) => ({
          ...invitation,
          inviteDate: this.formatDate(invitation.updatedAt),
        }));
      }
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isToday(date)) {
        return format(date, "hh:mm aa");
      } else {
        return format(date, "dd/MM/yyyy");
      }
    },
    async fetchInvitations() {
      await this.$store.dispatch("groups/fetchAllInvitationsGroup");
    },
    async fetchAllGroups() {
      await this.$store.dispatch("groups/fetchAllGroups");
    },
    async acceptInvite(id) {
      try {
        const response = await this.$axios.post(
          `/management/group/${id}/accept/invite`
        );
        if (response) {
          this.fetchInvitations();
          this.fetchAllGroups();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async declineInvite(id) {
      try {
        const response = await this.$axios.post(
          `/management/group/${id}/invite/decline`
        );
        if (response) {
          this.fetchInvitations();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
