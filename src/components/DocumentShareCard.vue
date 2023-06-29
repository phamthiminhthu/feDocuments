<template>
  <v-card>
    <v-card-title class="pt-8">
      <span class="text-h5">Share "{{ document.docsName }}"</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
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
          <v-col cols="12" class="!p-[5px] mt-3 card-share">
            <v-list subheader two-line>
              <div inset>People with access</div>

              <v-list-item
                v-if="users.length > 0"
                v-for="(user, i) in users"
                :key="user.id"
              >
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1" dark>
                    mdi-account-circle</v-icon
                  >
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="user.email"></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="user.username"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-subheader inset v-if="i === 0">Owner</v-subheader>

                  <v-select
                    v-else-if="i != 0 && action != 'share'"
                    :items="itemsAccess"
                    label="Viewer"
                    :key="user.id"
                    v-model="permission[user.id]"
                    return-object
                    single-line
                    solo
                    class="!shadow-none"
                  >
                  </v-select>
                  <v-subheader v-else-if="action == 'share'" inset
                    >Viewer</v-subheader
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="m-3">
      <v-chip class="ma-2 px-4 py-4" color="green" outlined default>
        <v-avatar left>
          <v-icon>mdi-link-variant</v-icon>
        </v-avatar>
        Copy link
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
      <v-btn color="blue darken-1" text @click="shareDocs"> Share </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    document: {
      type: Object,
      default: {},
      required: true
    },
    action: {
      type: String,
      default: null,
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      select: [],
      items: [],
      userId: Number,
      permission: [],
      itemsAccess: ["Viewer", "Remove Access"],
    };
  },
  watch: {
    permission() {
      this.userId = this.permission.findIndex((per) => per === "Remove Access");
      if (this.userId > 0) {
        this.deleteUserSharedDocument();
      }
    },
  },
  methods: {
    closeDialog() {
      this.select = [];
      this.$emit("close-dialog");
    },
    async shareDocs() {
      if (this.select.length > 0) {
        try {
          const response = await this.$axios.post(
            `/management/document/share/?documentKey=${this.document.documentKey}`,
            this.select
          );
          if (response) {
            console.log(response.data);
            this.select = [];
            this.getUsersSharedDocument();
            this.$emit(
              "users-updated",
              this.$store.getters["document/getUsers"]
            );
          }
        } catch (error) {
          console.log(error);
        }
        this.$emit("close-dialog");
      } else {
        console.log("No email address");
      }
    },
    async getUsersSharedDocument() {
      await this.$store.dispatch(
        "document/fetchDataUsersSharedDocumentByDocumentKey",
        { documentKey: this.document.documentKey }
      );
    },
    async deleteUserSharedDocument() {
      try {
        const response = await this.$axios.post(
          `/management/document/share/delete/user?documentKey=${this.document.documentKey}&id=${this.userId}`
        );
        if (response) {
          await this.getUsersSharedDocument();
          this.$emit("users-updated", this.$store.getters["document/getUsers"]);
          this.permission = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss">
.card-share {
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot {
    box-shadow: none !important;
    width: 105px;
  }
  .v-text-field.v-text-field--solo .v-label {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
  }
  .v-select__selection--comma {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
  }
  .v-list-item__content .v-list-item .v-list-item__title {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
  }
}
</style>
