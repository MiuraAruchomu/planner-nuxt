<script setup>
const sidemenuStore = useSidemenuStore();
const { isVisible } = storeToRefs(sidemenuStore);
</script>

<template>
  <div class="side-menu" :class="{ visible: isVisible }">
    <SideMenuList />
  </div>
</template>

<style lang="scss" scoped>
.side-menu {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100dvw;
  height: 100dvh;
  background: $main_green;
  border-radius: 0 50px 50px 0;
  transform: translateX(-100%);
  transition: transform 0.7s ease-in;
  z-index: 2;

  &.visible {
    transform: translateX(0);
  }
}
</style>
