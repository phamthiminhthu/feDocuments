<template>
  <div class="">
    <div
      class="grid grid-cols-1 gap-1 justify-items-center items-center md:grid-cols-2"
    >
      <div class="logo w-full h-screen md:block hidden">
        <img src="~/assets/image/login/bg-login.png" class="h-screen w-full" />
      </div>
      <div class="form-login justify-center w-3/4">
        <div>
          <img
            src="~/assets/image/logo/logo.jpg"
            class="w-32 h-auto border-2 border-slate-300 mx-auto"
            style="border-radius: 50%"
          />
        </div>
        <div class="landing-font-44 mt-6 text-center">
          Welcome to
          <span class="text-amber-700 font-bold italic leading-[72px]"
            >Docskanry</span
          >
          !
        </div>
        <form @submit="registerForm">
          <div class="mt-20">
            <label
              for="email"
              class="block text-sm font-medium landing-font-18 text-gray-900"
              >Email</label
            >
            <div class="flex rounded-md mt-2">
              <v-text-field
                id="email"
                v-model="email"
                :rules="emailRules"
                type="email"
                outlined
                dense
                required
                class="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 invalid:border-pink-500 invalid:text-pink-600"
              ></v-text-field>
            </div>
            <label
              for="username"
              class="block text-sm font-medium landing-font-18 text-gray-900 mt-5"
              >Username</label
            >
            <div class="flex rounded-md mt-2">
              <v-text-field
                id="username"
                v-model="username"
                :rules="usernameRules"
                type="text"
                outlined
                dense
                required
                class="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 invalid:border-pink-500 invalid:text-pink-600"
              ></v-text-field>
            </div>
            <label
              for="password"
              class="block text-sm font-medium landing-font-18 text-gray-900 mt-5"
              >Password</label
            >
            <div class="flex rounded-md mt-2">
              <v-text-field
                id="password"
                v-model="password"
                :rules="passwordRules"
                type="password"
                outlined
                dense
                required
                class="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              ></v-text-field>
            </div>
            <label
              for="confirm-password"
              class="block text-sm font-medium landing-font-18 text-gray-900 mt-5"
              >Confirm Password</label
            >
            <div class="flex rounded-md mt-2">
              <v-text-field
                id="confirm-password"
                v-model="confirmPassword"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                type="password"
                outlined
                dense
                required
                class="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              ></v-text-field>
            </div>
            <div class="mt-20">
              <button
                type="submit"
                class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold !text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0
                                                             00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign Up
              </button>
              <v-snackbar
                v-model="showSnackbar"
                :color="snackbarColor"
                :timeout="2000"
                top
              >
                {{ snackbarText }}
              </v-snackbar>
              <v-dialog v-model="showModal" persistent max-width="600">
                <v-card class="success-card">
                  <v-card-title class="success-card__title">
                    <span class="headline">{{ messageSuccess }}</span>
                  </v-card-title>
                  <v-card-text class="success-card__text">
                    Signup successfully. Redirecting to the login page...
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
            <div class="text-base mt-10 text-center">
              <span> Already have an account? </span>
              <nuxt-link
                to="login"
                class="font-semibold !text-indigo-600 hover:text-indigo-500"
              >
                Login
              </nuxt-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  meta: {
    requiresAuth: false,
  },
  data: () => ({
    login: false,
    email: "",
    emailRules: [
      (v) => !!v || "Please enter your email.",
      (v) => /.+@.+/.test(v) || "Please enter your email.",
    ],
    username: "",
    usernameRules: [(v) => !!v || "Please enter your username."],
    password: "",
    passwordRules: [
      (v) => !!v || "Please enter your password.",
      (v) => v.length >= 6 || "Please enter at least 6 characters.",
    ],
    confirmPassword: "",
    confirmPasswordRules: [(v) => !!v || "Please confirm your password."],
    showSnackbar: false,
    snackbarText: "",
    snackbarColor: "",
    showModal: false,
    messageSuccess: "",
  }),
  methods: {
    async registerForm(event) {
      event.preventDefault();
      try {
        const response = await this.$axios.$post("/auth/sign-up", {
          email: this.email,
          username: this.username,
          password: this.password,
        });
        this.showModal = true;
        this.messageSuccess = response.content;
        setTimeout(() => {
          this.showModal = false;
          this.$router.push("/login");
        }, 1500);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(error.response);
          this.snackbarText = error.response.data.content;
          this.snackbarColor = "error";
        } else {
          console.log(error);
        }
        this.showSnackbar = true;
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    },
  },
};
</script>
