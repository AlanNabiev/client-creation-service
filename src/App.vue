<template>
  <h1>Client creation service started!</h1>
  <BaseInput name="FirstName" :validationErrors="Errors" />
  <BaseSelect
    @selectOptions="SelectEvent(item)"
    placeholder="Выберите врача"
    :options="testSelect"
  />{{ selectedItems }}
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",

  setup() {
    const Errors = ref(["invalid"]);
    const selectedItems = ref([]);
    const testSelect = ref([
      "Alan",
      "David",
      "Soslan",
      "Daniel",
      "Sarmat",
      "DrDru"
    ]);
    function SelectEvent(item) {
      console.log(item);
    }

    return {
      testSelect,
      Errors,
      selectedItems,
      SelectEvent
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
