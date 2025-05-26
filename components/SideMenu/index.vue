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
  top: 0;
  bottom: 0;
  left: -100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100dvw;
  height: 100dvh;
  background: $main_green;
  border-radius: 0 50px 50px 0;
  transition: left 0.7s ease-in;
  z-index: 2;

  &.visible {
    left: 0;
  }
}
</style>
