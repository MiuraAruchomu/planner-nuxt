<script setup>
const dateStore = useDateStore();
const habitsStore = useHabitsStore();

const { selectedDate } = storeToRefs(dateStore);
const { isHabitsLoading, dailyHabits, habits } = storeToRefs(habitsStore);
</script>

<template>
  <div v-if="isHabitsLoading" class="placeholder" />
  <ul
    v-else-if="dailyHabits.length > 0 && !isHabitsLoading"
    class="habit-tracker-list"
    :key="selectedDate"
  >
    <li v-for="habit in dailyHabits" :key="habit.id">
      <HabitTrackerBlockDaily :id="habit.id" :name="habit.name" />
    </li>
  </ul>
  <HabitTrackerLooksLike
    v-else-if="!dailyHabits.length && habits.length && !isHabitsLoading"
  />
  <HabitTrackerOops v-else-if="!isHabitsLoading" />
</template>

<style lang="scss" scoped>
.habit-tracker-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 65px;
  padding-bottom: calc(60.5px + 6dvh);
  gap: 10px;

  @include mediaTablet {
    width: 75%;
    margin-top: 75px;
  }

  @include mediaLaptop {
    width: 50%;
    gap: 15px;
  }
}

.placeholder {
  height: 100dvh;
}
</style>
