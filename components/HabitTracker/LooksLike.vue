<script setup>
const firstLinePhrase = [
  'Looks',
  'like',
  'today’s',
  'habit',
  'list',
  'is',
  'empty.',
];
const secondLinePhrase = ['Perfect', 'chance', 'to try', 'something', 'fresh!'];
</script>

<template>
  <div class="looks-like">
    <div class="looks-like__inner">
      <ul class="looks-like__first-line">
        <li
          v-for="(word, index) in firstLinePhrase"
          :key="word + index"
          class="looks-like__item"
        >
          <span :data-text="word">{{ word }}</span>
        </li>
      </ul>
      <ul class="looks-like__second-line">
        <li
          v-for="(word, index) in secondLinePhrase"
          :key="index + word"
          class="looks-like__item"
        >
          <span :data-text="word">{{ word }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.looks-like {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
  margin-top: -65px;
  overflow: hidden;

  @include mediaTablet {
    margin-top: -75px;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    width: 90dvw;
    gap: 10px;

    @include mediaTablet {
      width: 80dvw;
    }

    @include mediaLaptop {
      width: 70dvw;
    }
  }

  &__first-line,
  &__second-line {
    display: flex;
    flex-wrap: wrap;

    @include mediaLaptop {
      justify-content: center;
    }
  }

  &__item {
    overflow: hidden;

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

  &__first-line &__item {
    color: $main_green_light;

    @include font_epilogue_40_900;

    @include mediaTablet {
      @include font_epilogue_66_900;
    }

    @include mediaLaptop {
      @include font_epilogue_80_900;
    }

    &:not(:last-child) {
      margin-right: 5px;

      @include mediaTablet {
        margin-right: 8px;
      }
    }
  }

  &__second-line &__item {
    color: $main_green_light;

    @include font_epilogue_24_600;

    @include mediaTablet {
      @include font_epilogue_36_800;
    }

    &:not(:last-child) {
      margin-right: 5px;

      @include mediaTablet {
        margin-right: 8px;
      }
    }
  }
}
</style>
