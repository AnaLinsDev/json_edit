<template>
  <v-row class="ma-auto screen" justify="center">
    <Board :isMobile="isMobile" />
    <Monitor :isMobile="isMobile" />
    <Board :isMobile="isMobile" />
  </v-row>
</template>

<script>
import Board from "@/components/Board.vue";
import Monitor from "@/components/Monitor.vue";

export default {
  name: "IndexPage",
  components: { Board, Monitor },

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
