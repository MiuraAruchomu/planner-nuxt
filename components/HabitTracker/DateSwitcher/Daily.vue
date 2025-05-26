<script setup>
import { format } from 'date-fns';

const dateStore = useDateStore();
const scrollStore = useScrollStore();

const { selectedDate } = storeToRefs(dateStore);
const { isScrolled } = storeToRefs(scrollStore);
</script>

<template>
  <div
    v-if="selectedDate"
    class="date-switcher"
    :class="{ hidden: isScrolled }"
  >
    <button
      class="date-switcher__button date-switcher__button_left"
      @click="dateStore.goToPreviousDay"
    >
      <Icon
        name="material-symbols-light:arrow-back-ios-rounded"
        size="1.3em"
        style="color: #202124"
      />
    </button>
    <span class="date-switcher__date">
      {{ format(selectedDate, 'd MMM') }}
    </span>
    <button
      class="date-switcher__button date-switcher__button_right"
      @click="dateStore.goToNextDay"
    >
      <Icon
        name="material-symbols-light:arrow-forward-ios-rounded"
        size="1.3em"
        style="color: #202124"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.date-switcher {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40dvw;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50px;
  transition:
    opacity 0.2s ease-in,
    visibility 0.2s ease-in;

  @include mediaTablet {
    width: 20dvw;
  }

  @include mediaLaptop {
    width: 10dvw;
  }

  &__button {
    width: 30px;
    height: 30px;
    background: $white;
    border-radius: 50%;

    &_left {
      margin-left: -5px;
      padding: 7px 0 5px 5px;
    }

    &_right {
      margin-right: -5px;
      padding: 7px 5px 5px 7px;
    }
  }

  &__date {
    color: $main_font;
    text-transform: uppercase;
    user-select: none;

    @include font_notosans_18_300;
  }
}

.hidden {
  visibility: hidden;
  opacity: 0;
}
</style>
