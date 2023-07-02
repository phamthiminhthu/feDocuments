<template>
    <v-app>
        <Header class="!flex-none" :pageActive="pageActive"/>
        <main>
            <Nuxt />
        </main>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
            pageActive: "Home",
        }
    }
}
</script>