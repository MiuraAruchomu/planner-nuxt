<script setup>
import HabitTrackerDateSwitcherDaily from '@/components/HabitTracker/DateSwitcher/Daily.vue';
import HabitTrackerDateSwitcherWeekly from '@/components/HabitTracker/DateSwitcher/Weekly.vue';

const habitsStore = useHabitsStore();
const { activeHabitTrackerView } = storeToRefs(habitsStore);
</script>

<template>
  <Transition name="date-switcher" mode="out-in">
    <component
      :is="
        activeHabitTrackerView === 'daily'
          ? HabitTrackerDateSwitcherDaily
          : HabitTrackerDateSwitcherWeekly
      "
    />
  </Transition>
</template>

<style lang="scss" scoped>
.date-switcher-enter-active,
.date-switcher-leave-active {
  transition: opacity 0.2s ease;
}
.date-switcher-enter-from,
.date-switcher-leave-to {
  opacity: 0;
}
</style>
