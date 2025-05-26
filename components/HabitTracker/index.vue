<script setup>
const habitsStore = useHabitsStore();

onMounted(() => {
  habitsStore.updateHabitsCompletedDatesWithFirebase();
  habitsStore.initHabitsTrackingWithFirebase();
});
</script>

<template>
  <div class="habit-tracker">
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
}
</style>
