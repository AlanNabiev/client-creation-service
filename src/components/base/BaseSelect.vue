<template>
  <div
    @focus="open"
    @blur="open"
    tabindex="0"
    :class="['select', selectClasses]"
  >
    <span>{{ placeholder }}</span>
    <ul v-if="selectStatus" class="select__list" disabled>
      <li
        v-for="(option, idx) in options"
        :key="idx"
        :class="[{ active: hasOption(option) }, 'select__list__item']"
        @click="select(option)"
      >
        {{ option }}
      </li>
    </ul>
    <button @click="sendOptions">Send</button>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  name: "BaseSelector",
  props: {
    placeholder: String,
    options: Array,
    validationErrors: Array
  },
  setup(props, { emit }) {
    const selectStatus = ref(false);

    function open() {
      selectStatus.value = !selectStatus.value;
    }
    const selectClasses = ref("");
    watchEffect(() => {
      if (selectStatus.value) {
        selectClasses.value = "select__focus";
      }
      if (!selectStatus.value) {
        selectClasses.value = "select__blur";
      }
      if (props.validationErrors) {
        selectClasses.value = "select__hasErrors";
      }
    });

    let selectedOptions = ref([]);

    function hasOption(item) {
      return selectedOptions.value.find((el) => el === item);
    }

    function select(option) {
      if (!hasOption(option)) {
        selectedOptions.value.push(option);
        console.log(selectedOptions.value);
      } else {
        selectedOptions.value = selectedOptions.value.filter(
          (el) => el !== option
        );
      }
      emit("selectOptions", selectedOptions.value);
    }

    return {
      selectStatus,
      selectClasses,
      selectedOptions,
      open,
      hasOption,
      select
    };
  }
  //   props: {
  //     placeholder: String,
  //     options: Array,
  //     validationErrors: Array
  //   }
};
</script>

<style lang="scss">
.select {
  padding: 0.75rem 1rem;
  cursor: pointer;

  &__blur {
    box-shadow: 0 2px 4px 0 gray;
  }
  &__focus {
    color: skyblue;
    box-shadow: 0 2px 4px 0 skyblue;
  }
  &__hasErrors {
    color: red;
    box-shadow: 0 2px 4px 0 red;
  }
  &__list {
    list-style-type: none;
    &__item {
      padding: 0.75rem 1rem;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
.active {
  background-color: steelblue;
  color: #fff;
}
</style>
