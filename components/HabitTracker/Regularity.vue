<script setup>
const props = defineProps({
  regularity: {
    type: Object,
    default: null,
  },
  error: {
    type: String,
    default: null,
  },
});

const reactiveRegularity = toRefs(props.regularity);
const toggleAllRegularity = ref(false);

watch(
  () => toggleAllRegularity.value,
  (newValue) => {
    Object.keys(reactiveRegularity).forEach((key) => {
      reactiveRegularity[key].value = newValue;
    });
  },
);

watch(
  () =>
    Object.keys(reactiveRegularity).map((key) => reactiveRegularity[key].value),
  (newValue) => {
    toggleAllRegularity.value = newValue.every(Boolean);
  },
);
</script>

<template>
  <ul class="regularity">
    <li :key="'all'" class="regularity__item">
      <label>
        <input
          v-model="toggleAllRegularity"
          type="checkbox"
          class="regularity__item_input"
          :class="{ 'regularity__item_input-error': props.error }"
        />
        <span
          class="regularity__item_name"
          :class="{ 'regularity__item_name-error': props.error }"
        >
          all
        </span>
      </label>
    </li>
    <li
      v-for="input in Object.keys(reactiveRegularity)"
      :key="input"
      class="regularity__item"
    >
      <label>
        <input
          v-model="props.regularity[input]"
          type="checkbox"
          class="regularity__item_input"
          :class="{ 'regularity__item_input-error': props.error }"
        />
        <span
          class="regularity__item_name"
          :class="{ 'regularity__item_name-error': props.error }"
        >
          {{ input }}
        </span>
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.regularity {
  display: flex;
  justify-content: space-around;

  &__item {
    position: relative;
    width: 30px;
    height: 30px;

    &_input {
      position: relative;
      width: 30px;
      height: 30px;
      background: $main_grey;
      border-radius: 40%;
      transition: 0.5s;

      &:checked {
        background: $main_green;
      }

      &-error {
        background: $main_error;
      }
    }

    &_name {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      user-select: none;

      @include font_notosans_12_300;

      &-error {
        color: $white;
      }
    }

    &_input:checked + &_name {
      color: $white;
    }
  }
}
</style>
