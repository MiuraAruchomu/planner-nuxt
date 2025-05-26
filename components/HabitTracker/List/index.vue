<script setup>
import HabitTrackerListDaily from '@/components/HabitTracker/List/Daily.vue';
import HabitTrackerListWeekly from '@/components/HabitTracker/List/Weekly.vue';

const habitsStore = useHabitsStore();
const { activeHabitTrackerView } = storeToRefs(habitsStore);
</script>

<template>
  <Transition name="list" mode="out-in">
    <component
      :is="
        activeHabitTrackerView === 'daily'
          ? HabitTrackerListDaily
          : HabitTrackerListWeekly
      "
    />
  </Transition>
</template>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
