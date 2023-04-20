<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-footer
    height="calc(100vh - 120px)"
    class="elevation-0"
    no-data-text="Insert a valid Json or Array of Jsons"
  ></v-data-table>
</template>

<script>
export default {
  props: {
    items: Array,
  },

  computed: {
    headers() {
      if (this.items[0]) {
        const auxArr = Object.keys(this.items[0]).map((item) => {
          return {
            text: item.replace("_", " ").toUpperCase(),
            value: item,
            width: 200,
          };
        });
        return auxArr;
      }
    },
  },
};
</script>

<style></style>
