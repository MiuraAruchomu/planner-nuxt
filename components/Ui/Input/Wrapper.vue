<script setup>
const props = defineProps({
  focused: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  hasValue: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: null,
  },
  matching: {
    type: Boolean,
    default: false,
  },
  isMatched: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label
    class="main-input-wrapper"
    :class="[
      { 'main-input-wrapper_focused': focused || hasValue },
      { 'main-input-wrapper_errored': error },
      { 'main-input-wrapper_matched': matching && !isMatched },
    ]"
  >
    <span
      v-if="placeholder && !focused && !hasValue"
      class="main-input-wrapper__placeholder"
    >
      {{ placeholder }} {{ required ? ' *' : '' }}
    </span>
    <slot />
    <span v-if="error" class="main-input-wrapper__error">*{{ error }}</span>
  </label>
</template>

<style lang="scss" scoped>
.main-input-wrapper {
  position: relative;
  padding: 15px 30px;
  background: $white;
  box-shadow: inset 0 0 0 1px $main_grey;
  border-radius: $border_input;

  @include font_input;

  &:hover {
    cursor: text;
  }

  &_focused {
    box-shadow: inset 0 0 0 1px $main_font;
  }

  &_errored {
    margin-bottom: 20px;
    box-shadow: inset 0 0 0 1px $main_error;
  }

  &_matched {
    box-shadow: inset 0 0 0 1px $main_error;
    color: $main_error;
  }

  &__placeholder {
    position: absolute;
    user-select: none;
    pointer-events: none;
    color: $main_grey_dark;
  }

  &__error {
    position: absolute;
    user-select: none;
    pointer-events: none;
    display: block;
    width: inherit;
    padding-top: 2px;
    padding-left: 15px;
    top: 100%;
    left: 0;

    @include font_error;
  }
}
</style>
