<template>
  <div class="error">
    <div class="error__inner">
      <span class="error__item error-code" data-text="404">404</span>
      <span class="error__item page-not-found">page not found</span>
      <NuxtLink to="/" class="error__item home">
        <span data-text="home"> home </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  display: flex;
  align-items: center;
  width: 100dvw;
  height: 100dvh;

  @include mediaTablet {
    justify-content: center;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    width: fit-content;
    gap: 10px;
    margin-left: 5dvw;

    @include mediaTablet {
      align-items: center;
      margin-left: 0;
    }
  }

  &__item {
    position: relative;
    display: inline-block;
    user-select: none;

    &.error-code {
      margin-bottom: -15px;
      color: $main_green_light;

      @include font_epilogue_100_900;

      @include mediaTablet {
        @include font_epilogue_124_900;
      }

      @include mediaLaptop {
        @include font_epilogue_132_900;
      }
    }

    &.page-not-found {
      color: $main_green_light;

      @include font_epilogue_24_600;

      @include mediaTablet {
        @include font_epilogue_36_800;
      }
    }

    &.home {
      display: flex;
      width: fit-content;
      color: $main_poisonous;
      transition: transform 0.4s ease-out;
      user-select: none;
      overflow: hidden;

      @include font_epilogue_italic_24_600;

      @include mediaTablet {
        @include font_epilogue_italic_28_800;
      }

      &:hover span {
        @include mediaLaptop {
          transform: translateY(-100%);
        }
      }

      span {
        position: relative;
        display: inline-block;
        transition: transform 0.4s ease-out;
        user-select: none;

        &::before {
          content: attr(data-text);
          position: absolute;
          transform: translateY(100%);
        }
      }
    }
  }
}
</style>
