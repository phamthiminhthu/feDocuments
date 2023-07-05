<template>
  <div
    class="document-public-infor mb-16"
    v-if="formattedDocuments.length > 0"
    :key="count"
  >
    <v-list
      v-for="(itemDocument, index) in formattedDocuments"
      :key="itemDocument.id"
    >
      <v-list-item :key="itemDocument.id + index">
        <v-list-item-avatar>
          <v-img
            v-if="itemDocument.user.image != null"
            :src="itemDocument.user.image"
          ></v-img>
          <v-icon v-else> mdi-account-circle </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link
              :to="`/profile/${itemDocument.user.username}`"
              class="!text-black landing-font-18 font-semibold"
            >
              {{ itemDocument.user.username }}
            </nuxt-link>
            <span class="landing-font-14">
              posted a document ・ updated at {{ itemDocument.updatedAt }}
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div class="document-infor">
        <v-card class="pl-[10px] !shadow-none">
          <v-card-title
            v-if="itemDocument.title != null"
            class="landing-font-24 pb-2"
            >{{ itemDocument.title }}</v-card-title
          >
          <v-card-title v-else> No Title Document</v-card-title>
          <v-card-text>
            <v-chip-group
              column
              v-if="
                itemDocument.typeDocumentsList != null &&
                itemDocument.typeDocumentsList.length > 0
              "
            >
              <v-chip
                v-for="(types, index) in itemDocument.typeDocumentsList"
                :key="types.typeName + index"
                >{{ types.typeName }}</v-chip
              >
            </v-chip-group>
            <v-chip-group
              column
              v-if="
                itemDocument.tagDtoList != null &&
                itemDocument.tagDtoList.length > 0
              "
            >
              <v-chip
                v-for="(tags, index) in itemDocument.tagDtoList"
                color="orange"
                small
                :key="tags.tagName + index"
              >
                {{ tags.tagName }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-actions>
            <v-btn
              icon
              class="mx-4"
              v-if="itemDocument.liked === 0"
              @click="likeDocs(itemDocument)"
            >
              <v-icon> mdi-star-outline </v-icon>
              <span class="mx-1"> {{ itemDocument.quantityLike }}</span>
            </v-btn>
            <v-btn icon class="mx-4" v-else @click="unlikeDocs(itemDocument)">
              <v-icon color="#dbdb2b">mdi-star</v-icon>
              <span class="mx-1"> {{ itemDocument.quantityLike }}</span>
            </v-btn>
            <v-dialog
              v-model="itemDocument.dialog"
              persistent
              max-width="680px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="deep-purple lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="btn-show-info ml-5"
                >
                  Show Details
                </v-btn>
              </template>
              <DocumentShowCard
                :key="itemDocument.id"
                :document="itemDocument"
                @close-dialog="closeDialog(itemDocument)"
              />
            </v-dialog>
          </v-card-actions>
          <v-divider></v-divider>
        </v-card>
      </div>
    </v-list>
  </div>
</template>
<script>
import {
  isToday,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export default {
  props: {
    documents: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    formattedDocuments() {
      if (this.documents && Array.isArray(this.documents)) {
        return this.documents.map((document) => ({
          ...document,
          id: document.documentKey,
          updatedAt: this.formatDate(document.updatedAt),
          dialog: false,
        }));
      }
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isToday(date)) {
        let minutes = differenceInMinutes(new Date(), date);
        if (minutes <= 0) {
          return differenceInSeconds(new Date(), date) + " giây trước";
        } else if (minutes >= 60) {
          return differenceInHours(new Date(), date) + " giờ trước";
        }
        return differenceInMinutes(new Date(), date) + " phút trước";
      } else {
        let days = differenceInDays(new Date(), date);
        if (days <= 0) {
          let hours = differenceInHours(new Date(), date);
          if (hours <= 0) {
            return differenceInMinutes(new Date(), date) + " phút trước";
          }
          return differenceInHours(new Date(), date) + " giờ trước";
        }
        return differenceInDays(new Date(), date) + " ngày trước";
      }
    },
    closeDialog(itemDocument) {
      this.count += 1;
      itemDocument.dialog = false;
    },
    async likeDocs(itemDocument) {
      try {
        const response = await this.$axios.post(
          `/management/document/like?document=${itemDocument.id}`
        );
        if (response) {
          this.$emit("document-updated");
          itemDocument.liked = 1;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async unlikeDocs(itemDocument) {
      try {
        const response = await this.$axios.post(
          `/management/document/unlike?document=${itemDocument.id}`
        );
        if (response) {
          this.$emit("document-updated");
          itemDocument.liked = 0;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss">
.document-infor {
  .btn-show-info {
    .v-btn__content {
      font-size: 12px;
    }
  }
}
</style>
