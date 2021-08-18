<template>
  <div class="input">
    <div :class="['input__container', inputClasses]">
      <label v-if="focusStatus || modelValue" class="input__label">{{
        name
      }}</label>
      <input
        @focus="focusChange"
        @blur="focusChange"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :type="type"
        class="input__box"
      />
      <BaseIcon class="input__icon" name="user" />
    </div>
    <div v-if="validationErrors" class="input__errors__list">
      <p v-for="(error, idx) in validationErrors" :key="idx">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  name: "BaseInput",
  props: {
    modelValue: [String, Number],
    name: String,
    type: {
      type: String,
      default: "text"
    },
    validationErrors: {
      type: Array
    }
  },
  setup(props) {
    const focusStatus = ref(false);

    function focusChange() {
      focusStatus.value = !focusStatus.value;
    }
    const inputClasses = ref("");
    const placeholder = ref("");

    watchEffect(() => {
      if (focusStatus.value) {
        inputClasses.value = "input__container__focus";
        placeholder.value = "";
      }
      if (!focusStatus.value) {
        inputClasses.value = "input__container__blur";
        placeholder.value = props.name;
      }
      if (props.validationErrors) {
        inputClasses.value = "input__container__errors";
      }
    });

    return {
      focusStatus,
      focusChange,
      inputClasses,
      placeholder
    };
  }
};
</script>

<style lang="scss">
.input {
  position: relative;
  &__label {
    position: absolute;
    top: 2px;
    left: 0.75rem;

    font-size: 12px;
  }
  &__box {
    height: 1.5rem;
    outline: none;
    border: none;
  }
  &__icon {
    position: absolute;
    right: 0.75rem;
  }
  &__container {
    display: flex;
    align-items: center;
    padding: 0.75rem 0.75rem;
    &__blur {
      box-shadow: 0 2px 4px 0 gray;
    }
    &__focus {
      color: skyblue;
      box-shadow: 0 2px 4px 0 skyblue;
    }
    &__errors {
      color: red;
      box-shadow: 0 2px 4px 0 red;
    }
  }
  &__errors__list {
    color: red;
    left: 0.75rem;
    position: absolute;
    bottom: -40px;
  }
}
</style>
