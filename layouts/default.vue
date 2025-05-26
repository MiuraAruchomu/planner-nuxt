<script setup>
const dateStore = useDateStore();

onMounted(() => {
  dateStore.initDateChecking();
  dateStore.initCurrentWeekDayChecking();
  dateStore.initCurrentWeekDatesChecking();
});
</script>

<template>
  <Header />
  <Modal />
  <slot />
</template>
