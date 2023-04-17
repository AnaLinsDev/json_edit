<template>
  <v-app>
    <v-main>
      <v-container fluid class="ma-0">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

<style>
main {
  background-color: rgba(141, 203, 96, 0.55) !important;
}
</style>
