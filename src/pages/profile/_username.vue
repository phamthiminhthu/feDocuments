<template>
    <div justify="center" align="center">
        <h3 class="text-center landing-font-32 uppercase text-amber-700 font-semibold">Profile</h3>
        <div v-if="user" class="mt-12">
            <div class="avatar">
                <div v-if="user.image == null">
                    <img src="~/assets/image/avatar/avatar-default.png" alt="avatar" />
                </div>
                <div v-else>
                    <v-avatar size="240">
                        <img :src="user.image" :alt="user.username">
                    </v-avatar>
                </div>
            </div>
            <div class="information-profile">
                <div v-if="user.fullname != null">
                    {{ user.fullname }}
                </div>
                <div class="landing-font-24 mt-3">
                    {{ user.username }}
                </div>
                <div v-if="user.introduce != null" class="landing-font-18 mt-4">
                    {{ user.introduce }}
                </div>
                <div>
                    {{ followerCount }} - {{ followingCount }}
                </div>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
<script>
export default {
    layout: 'guest',
    meta: {
        requiresAuth: false
    },
    data() {
        return {
        }
    },
    async mounted() {
        await Promise.all([
            this.$store.dispatch('user/fetchDataUserByUsername', { username: this.username }),
            this.$store.dispatch('user/fetchDataUserFollower', { username: this.username }),
            this.$store.dispatch('user/fetchDataUserFollowing', { username: this.username })
        ]);
    },
    computed: {
        username() {
            return this.$route.params.username;
        },
        user() {
            return this.$store.getters['user/getUser'];
        },
        followingCount() {
            return this.$store.getters['user/getFollowingCount'];
        },
        followerCount() {
            return this.$store.getters['user/getFollowersCount'];
        }
    }
}
</script>
