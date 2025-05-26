<script setup>
const habitsStore = useHabitsStore();
const { isHabitsLoading, habits } = storeToRefs(habitsStore);
</script>

<template>
  <div v-if="isHabitsLoading" class="placeholder" />
  <ul
    v-else-if="habits.length > 0 && !isHabitsLoading"
    class="habit-tracker-list"
  >
    <li v-for="habit in habits" :key="habit.id">
      <HabitTrackerBlockWeekly
        :id="habit.id"
        :name="habit.name"
        :regularity="habit.regularity"
      />
    </li>
  </ul>
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
