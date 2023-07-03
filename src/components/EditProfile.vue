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
          </div>
        </div>
        <v-btn color="success" class="mr-4" type="submit"> Save </v-btn>
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
        Updated user successfully !
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
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
