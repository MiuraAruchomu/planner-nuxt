<script setup>
const authStore = useAuthStore();
const sidemenuStore = useSidemenuStore();

const { user } = storeToRefs(authStore);
const { isVisible } = storeToRefs(sidemenuStore);
</script>

<template>
  <div class="side-menu" :class="{ visible: isVisible }">
    <SideMenuAuthorizedList v-if="user" />
    <SideMenuUnauthorizedList v-else />

    <div class="designed-dev-by">
      <span :class="{ visible: isVisible }">designed/dev by miuraAruchomu</span>
    </div>
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

.designed-dev-by {
  position: absolute;
  bottom: 7dvh;
  width: 100%;
  overflow: hidden;

  span {
    display: flex;
    justify-content: center;
    width: 100%;
    color: $main_poisonous;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(-110%);
    transition:
      opacity 0.7s ease-in,
      transform 0.5s ease-in-out 0.7s;
    will-change: transform, opacity;

    @include font_epilogue_italic_16_500;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
