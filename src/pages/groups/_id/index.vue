<template>
  <div>
    <div v-if="groupDetails">
      <div class="text-center mb-16">
        <span class="landing-font-32">Group </span><strong class="landing-title-page">"{{ groupDetails.groupName }}"</strong>
      </div>
      <BreadCrumbs :idGroup="groupId" />
      <div class="mx-auto">
        <v-list subheader two-line>
          <v-subheader inset class="ml-2">
            Collections
            <v-btn
              class="mx-4"
              fab
              dark
              color="indigo"
              small
              @click="createCollectionDialog = true"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-subheader>

          <v-row
            class="p-4 mt-4"
            v-if="groupDetails['collectionDtoList'].length > 0"
          >
            <v-col
              cols="4"
              v-for="folder in groupDetails['collectionDtoList']"
              :key="folder.id"
            >
              <v-list-item
                class="rounded-xl"
                style="border: 2px solid #111827"
                @click="redirectSubCollection(folder.id)"
              >
                <v-list-item-avatar>
                  <v-icon class="amber darken-3" dark> mdi-folder </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="folder.collectionName"
                  ></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="folder.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-menu open-on-hover right offset-x>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" class="!shadow-none" icon>
                        <v-icon color="black"> mdi-dots-vertical </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="renameCollection(folder.id)">
                        <v-list-item-title> Rename </v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="removeCollection(folder.id)">
                        <v-list-item-title> Remove </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
            </v-col>
          </v-row>
          <v-subheader inset class="mt-5 ml-2">
            Files
            <UploadFileButton
              class="mx-3"
              v-if="groupId"
              @upload-file="uploadFile"
              :idCollection="idCollection"
              :groupId="groupId"
            />
          </v-subheader>
          <CollectionCreateDialog
            v-if="groupId"
            :dialog="createCollectionDialog"
            :parentCollectionId="idCollection"
            :groupId="groupId"
            @close-dialog="createCollectionDialog = false"
            @create-collection="createCollection"
          />
          <CollectionEditDialog
            v-if="currentId"
            :id="currentId"
            :dialog="editCollectionDialog"
            @update-collection="updateCollection"
            @close-dialog="editCollectionDialog = false"
          />
          <CollectionRemoveDialog
            v-if="currentId"
            :id="currentId"
            :dialog="removeCollectionDialog"
            :groupId="groupId"
            @remove-collection="updateAfterRemoveCollection"
            @close-dialog="removeCollectionDialog = false"
          />
          <Documents
            :documents="formattedDocuments"
            :groupId="groupId"
            @documents-updated="handleChangeListDocument"
            @delete-documents-group="deleteDocumentGroup"
            :status="typeGroup"
          />
        </v-list>
        <NotifySnackbar :message="message" :status="status" :notify="notify" />
      </div>
    </div>
    <AcceptInviteDialog
      v-if="permission == 2"
      :id="groupId"
      :dialog="acceptInviteDialog"
      @accept-invite="acceptInvite"
      @decline-invite="declineInvite"
      @close-dialog="acceptInviteDialog = false"
    />
  </div>
</template>
<script>
export default {
  layout: "base",
  data() {
    return {
      message: null,
      status: false,
      notify: false,
      idCollection: null,
      currentId: null,
      createCollectionDialog: false,
      editCollectionDialog: false,
      removeCollectionDialog: false,
      permission: 0,
      acceptInviteDialog: false,
      typeGroup:"group",
    };
  },
  mounted() {
    this.fetchDataGroupById();
  },
  computed: {
    groupId() {
      return this.$route.params.id;
    },
    groupDetails() {
      return this.$store.getters["groups/getGroupDetails"];
    },
    formattedDocuments() {
      return this.groupDetails["documentDtoList"].map((document) => ({
        ...document,
        id: document.documentKey,
      }));
    },
  },
  methods: {
    async fetchPermissionGroup() {
      await this.$store.dispatch("groups/fetchPermissionsGroup", {
        groupId: this.groupId,
      });
    },
    async fetchDataGroupById() {
      if (this.groupId) {
        await this.fetchPermissionGroup();
        this.permission = this.$store.getters["groups/getPermission"];
        if (this.permission == 1) {
          await this.$store.dispatch("groups/fetchDataGroupDetails", {
            groupId: this.groupId,
          });
        } else if (this.permission == 2) {
          this.acceptInviteDialog = true;
        }
      }
    },
    async fetchDataGroups() {
      await this.$store.dispatch("groups/fetchAllGroups");
    },
    handleChangeListDocument() {
      this.fetchDataGroupById();
    },
    async createCollection(response) {
      if (response.status == 200) {
        await this.fetchDataGroupById();
        this.createCollectionDialog = false;
        this.notify = true;
        this.status = true;
        this.message = "Create collection successfully!";
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Collection name already exists!";
      }
    },
    renameCollection(id) {
      this.currentId = id;
      this.editCollectionDialog = true;
    },
    updateCollection(response) {
      if (response.status == 200) {
        this.fetchDataGroupById();
        this.editCollectionDialog = false;
        this.notify = true;
        this.status = true;
        this.message = "Update collection successfully!";
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Collection name already exists!";
      }
    },
    removeCollection(id) {
      this.currentId = id;
      this.removeCollectionDialog = true;
    },
    updateAfterRemoveCollection(response) {
      if (response.status == 200) {
        this.fetchDataGroupById();
        this.removeCollectionDialog = false;
        this.notify = true;
        this.status = true;
        this.message = "Remove collection successfully!";
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Remove collection failed!";
      }
    },
    redirectSubCollection(id) {
      this.$router.push(`/groups/${this.groupId}/collections/${id}`);
    },
    uploadFile(response) {
      console.log("Uploading file");
      if (response.status == 200) {
        this.fetchDataGroupById();
      }
    },
    acceptInvite(response) {
      if (response.status == 200) {
        this.fetchDataGroupById();
        this.fetchDataGroups();
        this.acceptInviteDialog = false;
        this.notify = true;
        this.status = true;
        this.message = "Join group successfully!";
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Join group failed!";
      }
    },
    declineInvite() {
      if (response.status == 200) {
        this.fetchDataGroupById();
        this.fetchDataGroups();
        this.acceptInviteDialog = false;
        this.notify = true;
        this.status = true;
        this.message = "Decline group successfully!";
      } else {
        this.notify = true;
        this.status = false;
        this.message = "Decline group failed!";
      }
    },
    async deleteDocumentGroup(documentKeys) {
      if (this.groupId != null) {
        try {
          const id = this.collectionId ? this.collectionId : null;
          const response = await this.$axios.post(
            `/management/group/${this.groupId}/document/delete?collectionId=${id}`,
            documentKeys
          );
          if (response) {
            this.fetchDataGroupById();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
