<template>
  <v-col :cols="isMobile ? 12 : 2">
    <v-card
      :height="isMobile ? '30vh' : 'calc(100vh - 60px)'"
      color="transparent"
      elevation="0"
      class="d-flex align-center"
    >
      <v-card height="20vh" min-width="100%" class="pa-6" elevation="0">
        <v-combobox
          label="Options"
          :items="typeArray"
          underlined
          hide-details
        ></v-combobox>
      </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Monitor",
  props: {
    isMobile: Boolean,
  },

  computed: mapState("converter", {
    typeArray: (state) => state.typeArray,
  }),
};
</script>

<style></style>
