<template>
  <v-row class="ma-auto screen" justify="center">
    <Board :isMobile="isMobile" />
    <Board :isMobile="isMobile" :isJson="true" />
  </v-row>
</template>

<script>
import Board from "@/components/Board.vue";

export default {
  name: "IndexPage",
  components: { Board },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
};
</script>

<style scoped>
.screen {
  margin: auto !important;
  width: 90vw !important;
}
</style>
