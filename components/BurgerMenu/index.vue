<script setup>
const sidemenuStore = useSidemenuStore();
const scrollStore = useScrollStore();
const { isVisible } = storeToRefs(sidemenuStore);
const { isScrolled } = storeToRefs(scrollStore);
</script>

<template>
  <button
    class="burger-menu"
    :class="{ closing: isVisible, hidden: isScrolled }"
    @click="sidemenuStore.toggleVisible()"
  >
    <div class="burger-menu__inner">
      <span />
      <span />
      <span />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.burger-menu {
  margin-right: -10px;
  padding: 10px;
  transition:
    opacity 0.2s ease-in,
    visibility 0.2s ease-in;
  z-index: 3;

  @include mediaLaptop {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover &__inner span:nth-child(2) {
    @include mediaLaptop {
      width: 100%;
    }
  }

  &__inner {
    position: relative;
    width: 25px;
    height: 25px;

    @include mediaTablet {
      width: 36px;
      height: 36px;
    }

    span {
      position: absolute;
      display: flex;
      height: 3px;
      background-color: $white;
      border-radius: 2px;

      &:nth-child(1) {
        top: 2px;
        width: 100%;
        transition: transform 0.7s ease-in;

        @include mediaTablet {
          top: 12.5px;
        }
      }

      &:nth-child(2) {
        top: calc(50% - 1.5px);
        right: 0;
        width: 65%;
        transition: all 0.7s ease-in;

        @include mediaTablet {
          top: 20.5px;
          transition:
            width 0.3s ease-in-out,
            transform 0.7s ease-in;
        }
      }

      &:nth-child(3) {
        bottom: 2px;
        width: 100%;
        transition: transform 0.7s ease-in;

        @include mediaTablet {
          display: none;
        }
      }
    }
  }

  &.closing &__inner span {
    &:nth-child(1) {
      transform: rotate(-45deg) translateX(-6px) translateY(6px);

      @include mediaTablet {
        transform: rotate(-45deg) translateX(-3px) translateY(3px);
      }
    }

    &:nth-child(2) {
      opacity: 0;
      visibility: hidden;

      @include mediaTablet {
        width: 100%;
        opacity: 1;
        visibility: visible;
        transform: rotate(45deg) translateX(-3px) translateY(-2px);
      }
    }

    &:nth-child(3) {
      transform: rotate(45deg) translateX(-6.5px) translateY(-6.5px);
    }
  }
}

.hidden {
  visibility: hidden;
  opacity: 0;

  @include mediaTablet {
    visibility: visible;
    opacity: 1;
  }
}
</style>
