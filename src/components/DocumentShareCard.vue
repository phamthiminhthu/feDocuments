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
          <v-col cols="12" class="!p-[5px] mt-3">
            <v-list subheader two-line>
              <div inset>People with access</div>

              <v-list-item v-for="folder in folders" :key="folder.title">
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="folder.title"></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="folder.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-subheader inset>Owner</v-subheader>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
      <v-btn color="blue darken-1" text @click="shareDocs"> Share </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    document: Object,
    default: null,
  },
  data() {
    return {
      select: ["Vuetify", "Programming"],
      items: ["Programming", "Design", "Vue", "Vuetify"],
      folders: [
        {
          subtitle: "Jan 9, 2014",
          title: "Photos",
        },
        {
          subtitle: "Jan 17, 2014",
          title: "Recipes",
        },
        {
          subtitle: "Jan 28, 2014",
          title: "Work",
        },
      ],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    shareDocs() {
      console.log(this.select);
      this.$emit("close-dialog");
    },
  },
};
</script>
