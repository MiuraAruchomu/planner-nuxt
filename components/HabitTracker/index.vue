<script setup>
const habitsStore = useHabitsStore();
const scrollStore = useScrollStore();

const scrolledElRef = ref(null);

onMounted(() => {
  scrollStore.setScrolledEl(scrolledElRef.value);
  habitsStore.updateHabitsCompletedDatesWithFirebase();
  habitsStore.initHabitsTrackingWithFirebase();
});

onUnmounted(() => {
  scrollStore.resetScrolledEl();
});
</script>

<template>
  <div ref="scrolledElRef" class="habit-tracker">
    <HabitTrackerDateSwitcher />
    <HabitTrackerList />
    <HabitTrackerViewSwitcher />
    <HabitTrackerAddButton />
  </div>
</template>

<style lang="scss" scoped>
.habit-tracker {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 65px);
  padding-top: 65px;
  overflow: hidden;
  overflow-y: auto;

  @include mediaTablet {
    height: calc(100% - 96px);
    padding-top: 96px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
