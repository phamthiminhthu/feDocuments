export const state = () => {
  return {
    groupDetails: null,
    groups: null,
    collectionsGroup: null,
    permission: 0,
    groupName: null,
    members: null,
    pendingInvites: null,
    invitations: null,
    groupsTree: null,
    breadcrumbs: null,
  };
};

export const mutations = {
  setGroupDetails(state, value) {
    state.groupDetails = value;
  },
  setGroups(state, value) {
    state.groups = value;
  },
  setCollectionsGroup(state, value) {
    state.collectionsGroup = value;
  },
  setPermission(state, value) {
    state.permission = value;
  },
  setGroupName(state, value) {
    state.groupName = value;
  },
  setMembers(state, value) {
    state.members = value;
  },
  setPendingInvites(state, value) {
    state.pendingInvites = value;
  },
  setInvitations(state, value) {
    state.invitations = value;
  },
  setGroupTree(state, value) {
    state.groupsTree = value;
  },
  setBreadcrumbs(state, value) {
    state.breadcrumbs = value;
  },
};

export const getters = {
  getGroupDetails: (state) => state.groupDetails,
  getGroups: (state) => state.groups,
  getCollectionsGroup: (state) => state.collectionsGroup,
  getPermission: (state) => state.permission,
  getGroupName: (state) => state.groupName,
  getMembers: (state) => state.members,
  getPendingInvites: (state) => state.pendingInvites,
  getInvitations: (state) => state.invitations,
  getGroupsTree: (state) => state.groupsTree,
  getBreadcrumbs: (state) => state.breadcrumbs,
};
export const actions = {
  async fetchAllGroups({ commit }) {
    try {
      const response = await this.$axios.get("/management/group/show/all");
      if (response) {
        commit("setGroups", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDataGroupDetails({ commit }, { groupId }) {
    try {
      const response = await this.$axios.get(
        `/management/group/show/details/${groupId}`
      );
      if (response) {
        commit("setGroupDetails", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchCollectionGroup({ commit }, { groupId }) {
    try {
      const response = await this.$axios.get(
        `/management/group/${groupId}/collection/show/all`
      );
      if (response) {
        commit("setCollectionsGroup", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchPermissionsGroup({ commit }, { groupId }) {
    try {
      const response = await this.$axios.get(
        `/management/group/${groupId}/permission`
      );
      if (response) {
        commit("setPermission", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchGroupNameById({ commit }, { groupId }) {
    try {
      const response = await this.$axios.get(
        `/management/group/show/name/by/${groupId}`
      );
      if (response) {
        commit("setGroupName", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchMembersGroup({ commit }, { groupId }) {
    try {
      const response = await this.$axios.get(
        `/management/group/${groupId}/members/show`
      );
      if (response) {
        commit("setMembers", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchPendingInvitesGroup({ commit }, { groupId }) {
    try {
      const response = await this.$axios.get(
        `/management/group/${groupId}/pending`
      );
      if (response) {
        commit("setPendingInvites", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllInvitationsGroup({ commit }) {
    try {
      const response = await this.$axios.get(
        `/management/group/invitations/pending`
      );
      if (response) {
        commit("setInvitations", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllGroupsTree({ commit }) {
    try {
      const response = await this.$axios.get(
        `/owner/management/collection/show/details/groups/all`
      );
      if (response) {
        commit("setGroupTree", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async fetchBreadCrumbs({ commit }, payload) {
    try {
      let response = null;
      if (payload.idCollection != null && payload.idGroup != null) {
        response = await this.$axios.get(
          `/owner/management/collection/show/breadcrumbs/id?idCollection=${payload.idCollection}&idGroup=${payload.idGroup}`
        );
      } else if (payload.idCollection != null && payload.idGroup == null) {
        response = await this.$axios.get(
          `/owner/management/collection/show/breadcrumbs/id?idCollection=${payload.idCollection}`
        );
      } else if (payload.idGroup != null && payload.idCollection == null) {
        response = await this.$axios.get(
          `/owner/management/collection/show/breadcrumbs/id?idGroup=${payload.idGroup}`
        );
      }
      if (response != null) {
        commit("setBreadcrumbs", response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
