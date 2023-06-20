<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Information Details</span>
      <v-spacer></v-spacer>
      <v-icon large @click="closeDialog" color="black">mdi-alpha-x</v-icon>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-row justify="space-around">
        <v-col cols="12">
          <span class="subheading">Type Document</span>
          <v-chip-group
            multiple
            column
            class="white--text"
            v-if="
              document.typeDocumentsList != null &&
              document.typeDocumentsList.length > 0
            "
          >
            <v-chip
              v-for="types in document.typeDocumentsList"
              :key="types.id"
              class="white--text"
              color="blue"
            >
              {{ types.typeName }}
            </v-chip>
          </v-chip-group>
          <div v-else class="subheading">No type document</div>
        </v-col>
        <v-col cols="12">
          <div
            v-if="document.title != null"
            class="landing-font-24 font-bold text-black"
          >
            {{ document.title }}
          </div>
          <div class="landing-font-14 subheading mt-2 mb-4">
            Created At:
            <span class="italic">{{ createdAt() }}</span>
          </div>
          <v-divider></v-divider>
          <div class="authors my-4">
            <div class="landing-font-14">Document's AuThors:</div>
            <div
              v-if="document.authors != null"
              class="text-[#111827] landing-font-20 mt-2 font-semibold"
            >
              {{ document.authors }}
            </div>
          </div>
          <div class="summary my-3">
            <div class="landing-font-14 mb-2">Summary</div>
            <div
              v-if="document.summary != null"
              class="landing-font-20 text-[#111827]"
            >
              {{ document.summary }}
            </div>
          </div>
          <div class="note my-3" v-if="document.note != null">
            <div class="landing-font-14 mb-2">Note</div>
            <div class="landing-font-20 text-[#111827]">
              {{ document.note }}
            </div>
          </div>
          <div class="note my-3">
            <div class="landing-font-14 mb-2">Urls</div>
            <v-list disabled>
              <v-list-item-group
                color="primary"
                v-if="document.urls != null && document.urls.length > 0"
              >
                <v-list-item
                  v-for="(item, i) in document.urls"
                  :key="i"
                  two-line
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item.url }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.description
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { format, isToday } from "date-fns";
import { document } from "postcss";
export default {
  props: {
    document: Object,
    default: null,
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    createdAt: function () {
      var date = this.document.createdAt;
      if (date != undefined) {
        return this.formatDate(date);
      }
      return date;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isToday(date)) {
        return format(date, "hh:mm");
      } else {
        return format(date, "dd/MM/yyyy");
      }
    },
  },
};
</script>
