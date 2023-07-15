<template>
  <v-card v-if="formattedDocument">
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
              formattedDocument.typeDocumentsList != null &&
              formattedDocument.typeDocumentsList.length > 0
            "
          >
            <v-chip
              v-for="types in formattedDocument.typeDocumentsList"
              :key="types.id"
              class="white--text"
              color="blue"
            >
              {{ types.typeName }}
            </v-chip>
          </v-chip-group>
          <!-- <div v-else class="subheading">No type document</div> -->
        </v-col>
        <v-col cols="12">
          <div
            v-if="formattedDocument.title != null"
            class="landing-font-24 font-bold text-black"
          >
            {{ formattedDocument.title }}
          </div>
          <div class="landing-font-14 subheading mt-2 mb-4">
            Created At:
            <span class="italic">{{ formattedDocument.createdAt}}</span>
          </div>
          <v-divider></v-divider>
          <div class="authors my-4">
            <div class="landing-font-14">Document's AuThors:</div>
            <div
              v-if="formattedDocument.authors != null"
              class="text-[#111827] landing-font-20 mt-2 font-semibold"
            >
              {{ formattedDocument.authors }}
            </div>
          </div>
          <div class="summary my-3" v-if="formattedDocument.summary != null">
            <div class="landing-font-14 mb-2">Summary</div>
            <div class="landing-font-20 text-[#111827]">
              {{ formattedDocument.summary }}
            </div>
          </div>
          <div class="note my-3" v-if="formattedDocument.note != null">
            <div class="landing-font-14 mb-2">Note</div>
            <div class="landing-font-20 text-[#111827]">
              {{ formattedDocument.note }}
            </div>
          </div>
          <div class="tags">
            <span class="subheading">Tags Document</span>
            <v-chip-group
              multiple
              column
              class="white--text !py-0"
              v-if="
                formattedDocument.tagDtoList != null && formattedDocument.tagDtoList.length > 0
              "
            >
              <v-chip
                v-for="tag in formattedDocument.tagDtoList"
                :key="tag.id"
                class="white--text"
                color="blue"
              >
                {{ tag.tagName }}
              </v-chip>
            </v-chip-group>
          </div>
          <div class="urls mt-3">
            <div class="landing-font-14">Urls References</div>
            <v-list
              class="!pt-0 ml-2"
              v-if="formattedDocument.urls != null && formattedDocument.urls.length > 0"
            >
              <v-list-item-group color="primary">
                <v-list-item
                  class="!p-0"
                  v-for="(item, i) in formattedDocument.urls"
                  :key="i"
                  two-line
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <a :href="item.url" target="_blank">
                        {{ item.url }}
                      </a>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.description }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <!-- <div v-else class="ml-2">Empty</div> -->
          </div>
        </v-col>
        <v-col cols="12" class="!py-0">
          <div class="landing-font-14">File</div>
          <div>
            <router-link
              :to="`/document/${formattedDocument.documentKey}`"
              target="_blank"
            >
              <v-list-item class="!p-0">
                <v-list-item-avatar>
                  <v-icon class="blue white--text"> mdi-clipboard-text </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ formattedDocument.docsName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ formattedDocument.createdAt }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </router-link>
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

export default {
  props: {
    document: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    formattedDocument() {
      if (this.document) {
        return {
            ...this.document,
          createdAt: this.formatDate(this.document.createdAt)
        }
      }
    }
  },
  methods: {
    closeDialog(document) {
      this.$emit("close-dialog", document);
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
