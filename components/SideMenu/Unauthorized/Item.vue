<script setup lang="ts">
import { TRANSITION_TIMINGS } from '../SideMenu.config';
import type { UnauthorizedListItemProps } from '../SideMenu.interface';

const props = defineProps<UnauthorizedListItemProps>();

const sidemenuStore = useSidemenuStore();
const modalsStore = useModalsStore();

const { isVisible } = storeToRefs(sidemenuStore);
</script>

<template>
  <button
    class="list-item"
    :class="{ visible: isVisible }"
    :style="{
      transition: `background-position 0.3s ease-in,
      opacity 0.7s ease-in,
      transform 0.5s ease-in-out ${TRANSITION_TIMINGS[props.name]}s`,
    }"
    @click="
      modalsStore.openModal('authentication', name);
      sidemenuStore.toggleVisible();
    "
  >
    {{ name }}
  </button>
</template>

<style lang="scss" scoped>
.list-item {
  display: inline-block;
  color: $main_green_light;
  background-image: linear-gradient(
    to right,
    $white 50%,
    $main_green_light 50%
  );
  background-size: 200% 100%;
  background-position: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(-110%);
  will-change: transform, opacity;

  @include font_epilogue_italic_32_800;

  @include mediaTablet {
    @include font_epilogue_italic_44_800;
  }

  &:hover {
    @include mediaLaptop {
      background-position: 0;
    }
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
