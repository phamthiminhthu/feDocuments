<template>
  <div class="">
    <h3
      class="text-center landing-font-32 uppercase text-amber-700 font-semibold"
    >
      Edit Profile
    </h3>
    <div class="information-profile mt-16 mb-8 w-4/5 mx-auto">
      <v-form @submit.prevent="updateProfile">
        <div class="avatar text-center">
          <v-avatar @click="triggerFileAvatar" size="225" :loading="loading">
            <img :src="avatarImage" alt="avatar" />
          </v-avatar>
          <v-file-input
            ref="fileInput"
            v-model="selectedAvatar"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            hide-input
            prepend-icon=""
            label="Avatar"
          ></v-file-input>
        </div>
        <div class="info-details mt-12">
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <label class="landing-font-18 text-sm text-gray-900 font-medium">
                Username
              </label>
              <v-text-field
                class="mt-3"
                color="black"
                outlined
                v-model="updateUser.username"
                disabled
                required
              ></v-text-field>
            </div>
            <div>
              <label class="landing-font-18 text-sm text-gray-900 font-medium">
                Email
              </label>
              <v-text-field
                class="mt-3"
                color="black"
                outlined
                v-model="updateUser.email"
                disabled
                required
              ></v-text-field>
            </div>
            <div>
              <label class="landing-font-18 text-sm text-gray-900 font-medium">
                Fullname
              </label>
              <v-text-field
                class="mt-3"
                color="black"
                outlined
                v-model="updateUser.fullname"
              ></v-text-field>
            </div>
            <div>
              <label class="landing-font-18 text-sm text-gray-900 font-medium">
                Birthday
              </label>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="updateUser.birthday"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    v-model="updateUser.birthday"
                    label=""
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    class="mt-3"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="updateUser.birthday"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(updateUser.birthday)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
            <div>
              <label class="landing-font-18 text-sm text-gray-900 font-medium">
                Gender
              </label>
              <v-select
                class="mt-3"
                v-model="gender"
                :items="items"
                outlined
              ></v-select>
            </div>
            <div>
              <label class="landing-font-18 text-sm text-gray-900 font-medium">
                Phone Number
              </label>
              <v-text-field
                class="mt-3"
                color="black"
                outlined
                v-model="updateUser.phone"
              ></v-text-field>
            </div>
            <div class="col-span-2">
              <label class="landing-font-18 text-sm text-gray-900 font-medium">
                Location
              </label>
              <v-text-field
                class="mt-3"
                color="black"
                outlined
                v-model="updateUser.address"
              ></v-text-field>
            </div>
            <div class="col-span-2">
              <label class="landing-font-18 text-sm text-gray-900 font-medium">
                Introduce
              </label>
              <v-textarea
                class="mt-3"
                color="black"
                outlined
                v-model="updateUser.introduce"
              ></v-textarea>
            </div>
            <div class="mb-8">
              <v-dialog v-model="dialog" persistent max-width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green" dark v-bind="attrs" v-on="on">
                    Change Password
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5"> Change Password </v-card-title>
                  <v-card-text>
                    <label
                      for="password"
                      class="block text-sm font-medium landing-font-18 text-gray-900 mt-5"
                    >
                      Old Password
                    </label>
                    <div class="flex rounded-md mt-2">
                      <v-text-field
                        id="oldPassword"
                        v-model="oldPassword"
                        type="password"
                        outlined
                        dense
                        required
                        class="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      ></v-text-field>
                    </div>
                    <label
                      for="newPassword"
                      class="block text-sm font-medium landing-font-18 text-gray-900 mt-5"
                      >New Password</label
                    >
                    <div class="flex rounded-md mt-2">
                      <v-text-field
                        id="newPassword"
                        v-model="newPassword"
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
                        :rules="
                          confirmPasswordRules.concat(passwordConfirmationRule)
                        "
                        type="password"
                        outlined
                        dense
                        required
                        class="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      ></v-text-field>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Cancel
                    </v-btn>
                    <v-btn color="green darken-1" text @click="changePassword">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
        <v-btn color="success" class="mr-4 text-center" type="submit">
          Save
        </v-btn>
      </v-form>
      <v-snackbar
        timeout="6000"
        absolute
        bottom
        right
        tile
        color="success"
        v-model="snackbar"
      >
        {{ message }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAvatar: null,
      loading: false,
      loader: null,
      items: ["Male", "Female", "Other"],
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      snackbar: false,
      menu: false,
      gender:
        this.user.gender == 0
          ? "Male"
          : this.user.gender == 1
          ? "Female"
          : this.user.gender == 2
          ? "Other"
          : "",
      updateUser: {
        username: this.user.username,
        email: this.user.email,
        avatar: this.user.image,
        fullname: this.user.fullname,
        birthday: this.user.birthday,
        gender: this.user.gender,
        phone: this.user.phone,
        address: this.user.address,
        introduce: this.user.introduce,
      },
      dialog: false,
      oldPassword: "",
      newPassword: "",
      passwordRules: [
        (v) => !!v || "Please enter your password.",
        (v) => v.length >= 6 || "Please enter at least 6 characters.",
      ],
      confirmPassword: "",
      confirmPasswordRules: [(v) => !!v || "Please confirm your password."],
      message: ""
    };
  },
  props: {
    user: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    avatarImage() {
      if (this.selectedAvatar) {
        return URL.createObjectURL(this.selectedAvatar);
      } else if (this.user.image == null) {
        return require("@/assets/image/avatar/avatar-default.png");
      } else {
        return this.user.image;
      }
    },
    passwordConfirmationRule() {
      return () =>
        this.newPassword === this.confirmPassword || "Password must match";
    },
  },
  methods: {
    triggerFileAvatar() {
      this.$refs.fileInput.$el.querySelector("input[type='file']").click();
    },
    async updateProfile() {
      this.updateUser = {
        ...this.updateUser,
        gender:
          this.gender === "Male"
            ? 0
            : this.gender === "Female"
            ? 1
            : this.gender === "Other"
            ? 2
            : null,
      };

      try {
        this.snackbar = false;
        const formData = new FormData();
        formData.append("email", this.updateUser.email);
        formData.append("username", this.updateUser.username);
        if (this.selectedAvatar) {
          this.updateUser.avatar = this.selectedAvatar;
          formData.append("avatar", this.updateUser.avatar);
        }
        if (this.updateUser.fullname != null) {
          formData.append("fullname", this.updateUser.fullname);
        }
        if (this.updateUser.phone != null) {
          formData.append("phone", this.updateUser.phone);
        }
        if (this.updateUser.address != null) {
          formData.append("address", this.updateUser.address);
        }
        if (this.updateUser.birthday != null) {
          formData.append("birthday", this.updateUser.birthday);
        }
        if (this.updateUser.gender) {
          formData.append("gender", this.updateUser.gender);
        }
        if (this.updateUser.introduce != null) {
          formData.append("introduce", this.updateUser.introduce);
        }
        const response = await this.$axios.post("/user/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response) {
          console.log(response.data);
          this.snackbar = true;
          this.message = "Updated user successfully !"
        }
      } catch (e) {
        console.log(e);
      }
    },
    async changePassword() {
      this.snackbar = false;
      try {
        const response = await this.$axios.post("/user/change-password-account", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        });
        if (response) {
          console.log(response.data);
          this.dialog = false;
          this.snackbar = true;
          this.message = "Change Password successfully!"
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
