<template>
  <div>
    <Header class="!flex-none" :pageActive="pageActive" />
    <div class="pt-[4.6rem]">
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <div class="container fluid pt-10">
      <h3 class="landing-font-24 my-10 font-bold text-center">
        Research Management and Collaboration Platform
      </h3>
      <div class="grid grid-cols-2 gap-1">
        <div v-for="(item, index) in manages" :key="index" class="p-3">
          <v-card class="h-full">
            <v-icon class="p-3">{{ item.icon }}</v-icon>
            <v-card-title class="text-h5"> {{ item.title }} </v-card-title>

            <v-card-subtitle>
              {{ item.subtitle }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                text
                @click="redirectPage(item.link, index)"
                :class="index == 2 ? 'mt-6' : ''"
                color="indigo accent-4"
              >
                {{ item.txt_btn }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
    <div class="mt-10 py-3 bg-[#111827]">
      <div class="container">
        <div class="grid grid-cols-2 gap-1">
          <div>
            <img
              src="https://st2.depositphotos.com/1071909/10836/i/950/depositphotos_108369024-stock-photo-document-management-system-concept.jpg"
            />
          </div>
          <div class="inline-block align-middle">
            <h3
              class="landing-font-24 font-semibold text-white inline-block align-middle table-cell h-[287px] pl-20"
            >
             <span class="text-center"> Empowering Your Research Journey</span>
              <v-btn color="##111827" class="mt-5" @click="redirectPage('/dashboard/all-references', 0)"> Get Started </v-btn>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-20">
      <h5 class="text-center mb-2 font-sem  ibold text-[#757575]">
        Copyright © 2023 Docskanry by Pham Thi Minh Thu
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  meta: {
    requiresAuth: false,
  },
  data() {
    return {
      pageActive: "Introduce",
      items: [
        {
          src: "https://previews.123rf.com/images/melpomen/melpomen2002/melpomen200200321/139571117-document-management-system-concept-with-businessman-on-blurred-abstract-background.jpg",
        },
        {
          src: "https://img.freepik.com/premium-photo/scheme-automation-electronic-document-management-female-hand-transfer-archiving-documents_116441-22327.jpg",
        },
        {
          src: "https://hubtgi.com/wp-content/uploads/2020/11/document-management-benefits.jpg",
        },
      ],
      manages: [
        {
          icon: "mdi-book-plus-multiple",
          title: "Document Management",
          subtitle:
            "Effectively and effortlessly manage documents with the ability to upload, search, and organize detailed document information efficiently, saving time, optimizing workflow, and enhancing research productivity.",
          txt_btn: "Dashboard",
          link: "/dashboard/all-references",
        },
        {
          icon: "mdi-rhombus-split",
          title: "Collection-Based Management",
          subtitle:
            "Establish and oversee document collections according to personal needs, logically organizing information, providing flexibility, and easy access tailored to your research objectives.",
          txt_btn: "Collections",
          link: "/collections",
        },
        {
          icon: "mdi-account-group",
          title: "Group-Based Management",
          subtitle:
            "Create and manage document groups based on topics, projects, or research fields, facilitating sharing and exchanging research document information within groups and research projects.",
          txt_btn: "Groups",
          link: "/groups",
        },
        {
          icon: "mdi-social-distance-6-feet",
          title: "Research Social Network",
          subtitle:
            "Connect with the research community, follow members, share documents, and exchange information to build a diverse and rich research network, contributing to knowledge sharing and fostering strong relationships within the specialized social environment.",
          txt_btn: "Home",
          link: "/home",
        },
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/getIsLoggedIn"];
    },
  },
  methods: {
    redirectPage(link, index) {
      if (this.loggedIn) {
        this.$router.push(link);
        this.$cookies.set('groupIndex', index);
        this.$cookies.set('itemIndex', 0);
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
