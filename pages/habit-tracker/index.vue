<script setup>
definePageMeta({
  middleware: ['private'],
});

const scrollStore = useScrollStore();
const pageRef = ref(null);

onMounted(() => {
  scrollStore.setScrolledEl(pageRef.value);
});

onUnmounted(() => {
  scrollStore.resetScrolledEl();
});
</script>

<template>
  <div ref="pageRef" class="page-container container">
    <HabitTracker />
  </div>
</template>
