<script setup>
const firstLinePhrase = ['Hey', 'there', '—', 'thanks', 'for', 'stopping by!'];
const secondLinePhrase = [
  'This',
  'is',
  'a pet project',
  'where',
  'I bring',
  'together',
  'my',
  'skills',
  'in',
  'frontend',
  'development',
  'and',
  'design.',
];
const thirdLinePhrase = [
  'It’s',
  'a task',
  'management',
  'tool',
  'to',
  'help',
  'you',
  'take',
  'control',
  'of',
  'your',
  'time',
  'and',
  'goals.',
];
</script>

<template>
  <div class="hey-there">
    <div class="hey-there__inner">
      <ul class="hey-there__first-line">
        <li
          v-for="(word, index) in firstLinePhrase"
          :key="word + index"
          class="hey-there__item"
        >
          <p v-if="word === '—'">{{ word }}</p>
          <span
            v-else
            :data-text="word"
            :class="{ thanks: word === 'thanks' }"
            >{{ word }}</span
          >
        </li>
      </ul>
      <ul class="hey-there__second-line">
        <li
          v-for="(word, index) in secondLinePhrase"
          :key="index + word"
          class="hey-there__item"
        >
          <span
            :data-text="word"
            :class="{
              'pet-project': word === 'a pet project',
              'frontend-development':
                word === 'frontend' || word === 'development',
              design: word === 'design.',
            }"
            >{{ word }}</span
          >
        </li>
      </ul>
      <ul class="hey-there__third-line">
        <li
          v-for="(word, index) in thirdLinePhrase"
          :key="index + word + index"
          class="hey-there__item"
        >
          <span
            :data-text="word"
            :class="{
              design: word === 'design.',
            }"
            >{{ word }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hey-there {
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
      width: 80dvw;
    }

    @include mediaLaptop {
      width: 70dvw;
    }
  }

  &__first-line,
  &__second-line,
  &__third-line {
    display: flex;
    flex-wrap: wrap;
  }

  &__second-line,
  &__third-line {
    @include mediaTablet {
      margin-top: 15px;
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

    p {
      user-select: none;
    }
  }

  &__first-line &__item {
    color: $main_green_light;

    @include font_epilogue_36_800;

    @include mediaTablet {
      @include font_epilogue_66_900;
    }

    @include mediaLaptop {
      @include font_epilogue_80_900;
    }

    &:not(:last-child) {
      margin-right: 8px;

      @include mediaTablet {
        margin-right: 15px;
      }
    }
  }

  &__second-line &__item {
    color: $white;

    @include font_epilogue_24_600;

    @include mediaTablet {
      @include font_epilogue_36_800;
    }

    @include mediaLaptop {
      @include font_epilogue_48_800;
    }

    &:not(:last-child) {
      margin-right: 5px;

      @include mediaTablet {
        margin-right: 8px;
      }
    }
  }

  &__third-line &__item {
    color: $white;

    @include font_epilogue_24_600;

    @include mediaTablet {
      @include font_epilogue_36_800;
    }

    @include mediaLaptop {
      @include font_epilogue_48_800;
    }

    &:not(:last-child) {
      margin-right: 5px;

      @include mediaTablet {
        margin-right: 8px;
      }
    }
  }
}

.thanks {
  color: $main_poisonous;

  @include font_epilogue_italic_36_800;

  @include mediaTablet {
    @include font_epilogue_italic_66_900;
  }

  @include mediaLaptop {
    @include font_epilogue_italic_80_900;
  }
}

.pet-project {
  color: $main_blue_dark;

  @include font_epilogue_italic_24_600;

  @include mediaTablet {
    @include font_epilogue_italic_36_800;
  }

  @include mediaLaptop {
    @include font_epilogue_italic_48_800;
  }
}

.frontend-development {
  color: $main_green;

  @include font_epilogue_italic_24_600;

  @include mediaTablet {
    @include font_epilogue_italic_36_800;
  }

  @include mediaLaptop {
    @include font_epilogue_italic_48_800;
  }
}

.design {
  color: $main_poisonous;

  @include font_epilogue_italic_24_600;

  @include mediaTablet {
    @include font_epilogue_italic_36_800;
  }

  @include mediaLaptop {
    @include font_epilogue_italic_48_800;
  }
}
</style>
