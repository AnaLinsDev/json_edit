<template>
  <v-col
    :cols="logicSize"
    :class="
      logicSize === 0
        ? 'd-none'
        : isMobile && isJson && !showOnlyJsonResult
        ? 'mt-6'
        : 0
    "
  >
    <v-card
      height="calc(100vh - 60px)"
      class="pa-0"
      :class="isMobile && isJson && !showOnlyJsonResult ? 'mt-6' : 0"
      elevation="0"
    >
      <v-app-bar elevation="0" height="auto">
        <div v-if="isJson" class="header_json d-flex justify-space-between">
          <span class="d-flex">
            <h2 class="mt-2">Json {{ typeArray[currentType] }}</h2>

            <v-tooltip bottom v-if="currentType === 1">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="info"
                  class="ml-4 mb-0"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-information-outline
                </v-icon>
              </template>
              <span>Generate columns based on the first json of the array</span>
            </v-tooltip>
          </span>
          <v-btn @click="showOnlyJsonRight" icon>
            <v-tooltip bottom v-if="!showOnlyJsonResult">
              <template v-slot:activator="{ on, attrs }">
                <v-icon dark v-bind="attrs" v-on="on">mdi-eye-outline</v-icon>
              </template>
              <span>Show only result board</span>
            </v-tooltip>
            <v-tooltip bottom v-else>
              <template v-slot:activator="{ on, attrs }">
                <v-icon dark v-bind="attrs" v-on="on">
                  mdi-eye-off-outline
                </v-icon>
              </template>
              <span>Show all boards</span>
            </v-tooltip>
          </v-btn>
        </div>

        <div v-else class="header_json d-flex justify-space-between flex-wrap">
          <v-btn-toggle
            v-model="currentTypeAux"
            color="deep-purple-accent-3"
            mandatory
            group
          >
            <v-btn
              v-for="(type, index) of typeArray"
              :key="type"
              class="ma-0"
              :value="index"
            >
              {{ type }}
            </v-btn>
          </v-btn-toggle>

          <v-btn @click="generateJson" color="success" class="my-2">
            Generate Json
          </v-btn>
        </div>
      </v-app-bar>

      <v-textarea
        v-if="!isJson"
        solo
        v-model="originalText"
        flat
        elevation="0"
        height="calc(100vh - 120px)"
        placeholder="Write something"
      >
      </v-textarea>
      <span v-else>
        <v-textarea
          v-if="!isTable"
          solo
          :value="jsonText"
          flat
          readonly
          elevation="0"
          height="calc(100vh - 120px)"
          placeholder="Awaiting for Conversion"
        >
        </v-textarea>
        <v-card v-else-if="isTable" elevation="0" height="calc(100vh - 120px)">
          <Table :items="originalArray" />
        </v-card>
      </span>
    </v-card>
  </v-col>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Table from "@/components/Table.vue";

export default {
  name: "Board",
  components: { Table },

  props: {
    isMobile: Boolean,
    isJson: Boolean,
  },

  data() {
    return {
      currentTypeAux: null,
      originalText: "",
      errorOnConvert: false,
      defaultJsonText: [{ Placeholder: "Example JSON !" }],
    };
  },

  computed: {
    ...mapState("converter", {
      currentType: (state) => state.currentType,
      typeArray: (state) => state.typeArray,
      jsonText: (state) => state.jsonText,
      originalArray: (state) => state.originalArray,
      showOnlyJsonResult: (state) => state.showOnlyJsonResult,
    }),

    logicSize() {
      if (this.showOnlyJsonResult) {
        return this.isJson ? 12 : 0;
      }

      return this.isMobile ? 12 : 6;
    },

    isTable() {
      return this.currentType === 1;
    },
  },

  watch: {
    currentTypeAux(n) {
      this.setCurrentType(n);
      this.changeToJson();
    },

    originalText() {
      this.changeToJson();
    },
  },

  mounted() {
    this.originalText = JSON.stringify(this.defaultJsonText);
  },

  methods: {
    ...mapMutations("converter", [
      "setShowOnlyJsonResult",
      "setCurrentType",
      "setJsonText",
      "setJsonOriginalArray",
    ]),

    generateJson() {
      const max = 15;
      const min = 5;

      const arrJson = [];

      const text =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

      const randomJsonQuant = Math.floor(Math.random() * (max - min) + min);
      for (var i = 1; i < randomJsonQuant; i++) {
        const randomKeyQuant = text.slice(
          0,
          Math.floor(Math.random() * (max - min) + min)
        );
        let aux = {};
        for (var j = 1; j < 5; j++) {
          let randomValueQuant = text.slice(
            0,
            Math.floor(Math.random() * (max - min) + min)
          );
          aux[`random_key_${j}`] = randomValueQuant;
        }
        arrJson.push(aux);
      }

      this.originalText = JSON.stringify(arrJson);
    },

    showOnlyJsonRight() {
      this.setShowOnlyJsonResult();
    },

    originalTextToArray() {
      if (this.originalText[0] !== "[") {
        this.originalText = `[${this.originalText}]`;
      }

      this.setJsonOriginalArray(JSON.parse(this.originalText));
    },

    changeToJson() {
      try {
        let jsonAux = "";

        switch (this.currentType) {
          case 0:
            jsonAux = this.jsonToPrettier();
            break;
          case 1:
            this.originalTextToArray();
            break;
          case 2:
            jsonAux = this.jsonToCompiled();
            break;
        }

        this.setJsonText(jsonAux);

        this.errorOnConvert = false;
      } catch (e) {
        this.errorOnConvert = true;
        this.setJsonText("Error: Insert a valid Json or Array of Jsons ");
      }
    },

    jsonToPrettier() {
      // uses the third param to whatever you want to show before each field
      return JSON.stringify(JSON.parse(this.originalText), null, "\t\t");
    },

    jsonToCompiled() {
      return JSON.stringify(JSON.parse(this.originalText), null, "");
    },
  },
};
</script>

<style scoped>
.header_json {
  width: 100%;
}
</style>
