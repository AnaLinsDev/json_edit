<template>
  <v-row class="ma-auto screen" justify="center">
    <Board />
    <Monitor />
    <Board />
  </v-row>
</template>

<script>
import Board from "@/components/Board.vue";
import Monitor from "@/components/Monitor.vue";

export default {
  name: "IndexPage",
  components: [Board, Monitor],
};
</script>

<style scoped>
.screen {
  margin: auto !important;
width: 90vw !important;
}
</style>
