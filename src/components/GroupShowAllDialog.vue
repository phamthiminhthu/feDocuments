<template>
  <v-dialog v-model="dialogModal" persistent max-width="400" scrollable>
    <v-card>
      <v-card-title class="text-h5">My Groups </v-card-title>
      <v-card-text>
        <v-checkbox
          v-model="selected"
          v-for="item in formattedItems"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="addDocument"
          :disabled="selected.length == 0"
        >
          Add
        </v-btn>
        <v-btn color="green darken-1" text @click="closeDialog"> Cancel </v-btn>
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
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      dialogModal: this.dialog,
      selected: [],
    };
  },
  computed: {
    formattedItems() {
      if (this.items && Array.isArray(this.items)) {
        return this.items.map((item) => {
          return {
            id: item.id,
            name:
              item.groupName + " ( " + (item.statusOwner === 1 ? 'Owner' : 'Member') + " )",
          };
        });
      }
    },
  },
  watch: {
    dialog() {
      this.dialogModal = this.dialog;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("colse-dialog");
    },
    addDocument() {
      this.$emit("add-document-group", this.selected);
    },
  },
};
</script>
