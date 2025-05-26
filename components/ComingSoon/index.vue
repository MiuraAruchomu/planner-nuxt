<script setup>
const firstLinePhrase = ['Coming', 'soon...'];
const secondLinePhrase = ['Something', 'awesome', 'is', 'on', 'the', 'way'];
</script>

<template>
  <div class="coming-soon">
    <div class="coming-soon__inner">
      <ul class="coming-soon__first-line">
        <li
          v-for="(word, index) in firstLinePhrase"
          :key="word + index"
          class="coming-soon__item"
        >
          <span :data-text="word">{{ word }}</span>
        </li>
      </ul>
      <ul class="coming-soon__second-line">
        <li
          v-for="(word, index) in secondLinePhrase"
          :key="index + word"
          class="coming-soon__item"
        >
          <span :data-text="word" :class="{ awesome: word === 'awesome' }">{{
            word
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.coming-soon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;

  &__inner {
    display: flex;
    flex-direction: column;
    width: 90dvw;
    gap: 10px;

    @include mediaTablet {
      width: fit-content;
    }
  }

  &__first-line,
  &__second-line {
    display: flex;
    flex-wrap: wrap;
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

    @include font_epilogue_66_900;

    @include mediaTablet {
      @include font_epilogue_80_900;
    }

    @include mediaLaptop {
      @include font_epilogue_100_900;
    }

    &:first-child {
      margin-bottom: -15px;

      @include mediaTablet {
        margin-right: 15px;
        margin-bottom: 0;
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

.awesome {
  color: $main_poisonous;

  @include font_epilogue_italic_24_600;

  @include mediaTablet {
    @include font_epilogue_italic_36_800;
  }
}
</style>
