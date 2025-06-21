<script setup lang="ts">
import type { AuthorizedListItemProps } from '../SideMenu.interface';

const props = defineProps<AuthorizedListItemProps>();

const sidemenuStore = useSidemenuStore();
const { isVisible } = storeToRefs(sidemenuStore);

const transitionDelay = computed(() => {
  return `${0.5 + props.index * props.index * 0.01}`;
});
</script>

<template>
  <NuxtLink
    :to="path"
    class="list-item"
    :class="{ visible: isVisible }"
    :style="{
      transition: `background-position 0.3s ease-in,
      opacity 0.7s ease-in,
      transform 0.5s ease-in-out ${transitionDelay}s`,
    }"
    @click="sidemenuStore.toggleVisible()"
  >
    {{ name }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
.list-item {
  display: inline-block;
  background-image: linear-gradient(to right, $white 50%, $main_green_dark 50%);
  background-size: 200% 100%;
  background-position: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(-110%);
  will-change: transform, opacity;

  @include font_epilogue_48_800;

  @include mediaTablet {
    @include font_epilogue_66_900;
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
