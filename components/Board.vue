<template>
  <v-col :cols="isMobile ? 12 : 5">
    <v-card height="calc(100vh - 60px)" class="pa-6" elevation="0"> teste </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Board",
  props: {
    isMobile: Boolean,
  },
};
</script>

<style></style>
