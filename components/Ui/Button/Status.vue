<script setup>
const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: null,
  },
});

const requestStatusStore = useRequestStatusStore();
const { status } = storeToRefs(requestStatusStore);

const computedButtonName = computed(() => {
  switch (status.value) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    default:
      return props.name;
  }
});
</script>

<template>
  <UiButtonWrapper
    :type="type"
    :color="
      status === 'error' ? 'error' : status === 'success' ? 'green' : color
    "
    :size="size"
    :disabled="status === 'loading'"
  >
    <span
      class="button-name"
      :class="{ 'button-name_hidden': status === 'loading' }"
    >
      {{ computedButtonName }}
    </span>
    <div v-if="status === 'loading'" class="loader">
      <span />
      <span />
      <span />
    </div>
  </UiButtonWrapper>
</template>

<style lang="scss" scoped>
.button-name {
  white-space: nowrap;

  &_hidden {
    width: 0;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
