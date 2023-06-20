<template>
  <v-toolbar color="#111827" dark>
    <v-toolbar-title>Dashboard</v-toolbar-title>

    <v-divider class="mx-4" vertical></v-divider>

    <span class="subheading">All References</span>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text> Home </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text> About </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text>
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="brown" size="48">
                <v-img
                  src="https://bedocument.s3.us-east-2.amazonaws.com/86c40359-564d-4ff3-a7ba-8b159ec17101/avatar/1686590671909-test.jpeg"
                  alt="user.fullname"
                ></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="white--text text-h5">{{ user.initials }}</span>
                </v-avatar>
                <h3>{{ user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text> 
                    <v-icon dense>  mdi-account-edit </v-icon>
                    <span class="ml-1"> Profile </span>
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text>
                  <v-icon dense> mdi-logout </v-icon>
                  <span class="ml-1">Sign Out</span>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
  }),
};
</script>
