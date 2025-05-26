<script setup>
const sideMenuStore = useSidemenuStore();
const { isVisible } = storeToRefs(sideMenuStore);

const closeSideMenu = () => {
  if (isVisible) {
    sideMenuStore.closeMenu();
  }
};
</script>

<template>
  <NuxtLink to="/" @click="closeSideMenu">
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
