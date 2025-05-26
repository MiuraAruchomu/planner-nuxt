<script setup>
const modalsStore = useModalsStore();
const { activeModals } = storeToRefs(modalsStore);
</script>

<template>
  <TransitionGroup name="modal">
    <LazyModalAuthentication
      v-if="activeModals.has('authentication')"
      key="authentication"
      :modal-close="'authentication'"
    />
    <LazyModalNewHabit
      v-if="activeModals.has('new-habit')"
      key="new-habit"
      :modal-close="'new-habit'"
    />
    <LazyModalRemoveHabit
      v-if="activeModals.has('remove-habit')"
      key="remove-habit"
      :modal-close="'remove-habit'"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
