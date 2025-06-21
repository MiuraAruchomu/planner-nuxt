<script setup>
const sideMenuStore = useSidemenuStore();
const { isVisible } = storeToRefs(sideMenuStore);

const handleCloseMenu = () => {
  isVisible.value && sideMenuStore.toggleVisible();
};
</script>

<template>
  <NuxtLink to="/" @click="handleCloseMenu">
    <h1 class="logo">planner</h1>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
  position: relative;
  color: rgb(255, 30, 30);
  z-index: 3;

  @include font_logo;
}
</style>
