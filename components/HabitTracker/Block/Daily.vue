<script setup>
import { parseISO, isAfter, isBefore } from 'date-fns';

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
});

const habitsStore = useHabitsStore();
const dateStore = useDateStore();

const { selectedDate } = storeToRefs(dateStore);

const isCompleted = ref(false);

watch(selectedDate, async () => {
  isCompleted.value = await habitsStore.getDailyCompletedDatesWithFirebase(
    props.id,
  );
});

onMounted(async () => {
  isCompleted.value = await habitsStore.getDailyCompletedDatesWithFirebase(
    props.id,
  );
});
</script>

<template>
  <div class="daily-block">
    <span class="daily-block__name">{{ name }}</span>
    <input
      type="checkbox"
      class="daily-block__checkbox"
      :class="{
        unactive:
          isAfter(
            parseISO(dateStore.currentDate),
            parseISO(dateStore.selectedDate),
          ) ||
          isBefore(
            parseISO(dateStore.currentDate),
            parseISO(dateStore.selectedDate),
          ),
        future: isBefore(
          parseISO(dateStore.currentDate),
          parseISO(dateStore.selectedDate),
        ),
      }"
      v-model="isCompleted"
      @change="
        habitsStore.toggleHabitCompletion({
          id,
          date: selectedDate,
          isCompleted: isCompleted,
        })
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.daily-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);
  border-radius: $border_mobile;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

  @include mediaTablet {
    border-radius: $border_tablet;
  }

  @include mediaLaptop {
    border-radius: $border_laptop;
  }

  &__name {
    color: $main_font;

    @include font_notosans_20_300;
  }

  &__checkbox {
    position: relative;
    width: 50px;
    height: 50px;
    background-image: linear-gradient(
      to right bottom,
      $main_blue_dark,
      $main_green_dark
    );
    border-radius: 40%;
    transition: 0.6s;
    cursor: pointer;

    &.unactive {
      pointer-events: none;
      cursor: default;
    }

    &.future {
      background: none;
      border: 1px solid $main_grey_dark;
    }

    &:checked {
      background-image: linear-gradient(
        to right bottom,
        $main_green,
        $main_green_light
      );

      &::before {
        height: 23.5%;
        transition: height 0.2s;
      }

      &::after {
        height: 33%;
        transition: height 0.2s;
        transition-delay: 0.2s;
      }
    }

    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 0;
      top: 23px;
      left: 16px;
      background: $white;
      border-radius: 2px;
      transform: rotate(-45deg);
      transform-origin: top;
    }

    &::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 0;
      bottom: 18px;
      left: 23px;
      background: $white;
      border-radius: 2px;
      transform: rotate(45deg);
      transform-origin: bottom;
    }
  }
}
</style>
