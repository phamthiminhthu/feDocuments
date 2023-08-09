<template>
  <div v-if="formattedBreadCrumbs" class="mb-3">
    <!-- <v-breadcrumbs :items="formattedBreadCrumbs">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>

    <template> -->
    <v-breadcrumbs :items="formattedBreadCrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
          <span
            class="landing-font-18"
            :class="
              item.disabled ? 'text-[#ff9800] font-bold' : 'font-semibold'
            "
          >
            {{ item.text }}
          </span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  props: {
    idCollection: null,
    idGroup: null,
    hasGroup: false,
  },
  mounted() {
    if (this.idCollection || this.idGroup) {
      return this.fetchBreadCrumbs();
    }
  },
  computed: {
    breadCrumbsItems() {
      return this.$store.getters["groups/getBreadcrumbs"];
    },
    formattedBreadCrumbs() {
      if (this.idCollection != null && this.idGroup != null) {
        this.hasGroup = true;
        if (
          this.breadCrumbsItems != null &&
          Array.isArray(this.breadCrumbsItems)
        ) {
          return this.breadCrumbsItems.map((item, index) => ({
            text: item.collectionName,
            disabled: index === this.breadCrumbsItems.length - 1 ? true : false,
            href:
              index === 0
                ? `/groups/${item.id}`
                : `/groups/${this.breadCrumbsItems[0].id}/collections/${item.id}`,
          }));
        }
      } else if (this.idCollection != null && this.idGroup == null) {
        if (
          this.breadCrumbsItems != null &&
          Array.isArray(this.breadCrumbsItems)
        ) {
          return this.breadCrumbsItems.map((item, index) => ({
            text: item.collectionName,
            disabled: index === this.breadCrumbsItems.length - 1 ? true : false,
            href: `/collections/${item.id}`,
          }));
        }
      } else if (this.idCollection == null && this.idGroup != null) {
        this.hasGroup = true;
        if (
          this.breadCrumbsItems != null &&
          Array.isArray(this.breadCrumbsItems)
        ) {
          return this.breadCrumbsItems.map((item) => ({
            text: item.collectionName,
            disabled: true,
            href: `/groups/${item.id}`,
          }));
        }
      }
    },
  },
  methods: {
    async fetchBreadCrumbs() {
      let payload = { idCollection: this.idCollection, idGroup: this.idGroup };
      await this.$store.dispatch("groups/fetchBreadCrumbs", payload);
    },
  },
  watch: {
    idCollection() {
      this.fetchBreadCrumbs();
    },
    idGroup() {
      this.fetchBreadCrumbs();
    },
  },
};
</script>
