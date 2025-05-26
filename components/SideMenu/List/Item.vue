<script setup>
const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  path: {
    type: String,
    default: null,
  },
  index: {
    type: Number,
    default: null,
  },
});

const sidemenuStore = useSidemenuStore();
const { isVisible } = storeToRefs(sidemenuStore);
</script>

<template>
  <NuxtLink v-if="name && path" :to="path" class="list-item">
    <span
      class="list-item__name"
      :class="{ visible: isVisible }"
      :style="{
        transition: `background-position 0.3s ease-in,
      opacity 0.7s ease-in,
      transform 0.5s ease-in-out ${0.5 + index * index * 0.01}s`,
      }"
    >
      {{ name }}
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.list-item {
  display: block;
  user-select: none;
  overflow: hidden;

  &__name {
    display: inline-block;
    background-image: linear-gradient(
      to right,
      $white 50%,
      $main_green_dark 50%
    );
    background-size: 200% 100%;
    background-position: 100%;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0;
    transform: translateY(-110%);

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
}
</style>
