export const state = () => ({
  currentType: 0,
  typeArray: ["Prettier", "Table", "Compiled"],
  jsonText: "",
  originalArray: [],
  showOnlyJsonResult: false,
});

export const mutations = {
  setCurrentType(state, data) {
    state.currentType = data;
  },

  setJsonText(state, data) {
    state.jsonText = data;
  },

  setJsonOriginalArray(state, data) {
    state.originalArray = data;
  },

  setShowOnlyJsonResult(state) {
    state.showOnlyJsonResult = !state.showOnlyJsonResult;
  },
};
