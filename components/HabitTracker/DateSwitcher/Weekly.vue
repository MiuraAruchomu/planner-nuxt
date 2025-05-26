<script setup>
import { format } from 'date-fns';

const dateStore = useDateStore();
const scrollStore = useScrollStore();

const { selectedWeekDates } = storeToRefs(dateStore);
const { isScrolled } = storeToRefs(scrollStore);
</script>

<template>
  <div
    v-if="selectedWeekDates"
    class="date-switcher"
    :class="{ hidden: isScrolled }"
  >
    <button
      class="date-switcher__button date-switcher__button_left"
      @click="dateStore.goToPreviousWeek"
    >
      <Icon
        name="material-symbols-light:arrow-back-ios-rounded"
        size="1.3em"
        style="color: #202124"
      />
    </button>
    <span class="date-switcher__date-range">
      {{ format(selectedWeekDates[0], 'd MMM') }} —
      {{ format(selectedWeekDates[selectedWeekDates.length - 1], 'd MMM') }}
    </span>
    <button
      class="date-switcher__button date-switcher__button_right"
      @click="dateStore.goToNextWeek"
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
  width: 60dvw;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50px;
  transition:
    opacity 0.2s ease-in,
    visibility 0.2s ease-in;

  @include mediaTablet {
    width: 30dvw;
  }

  @include mediaLaptop {
    width: 17dvw;
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

  &__date-range {
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
