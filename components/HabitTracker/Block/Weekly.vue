<script setup>
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  parseISO,
  isAfter,
  isBefore,
} from 'date-fns';

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  regularity: {
    type: Object,
    default: null,
  },
});

const habitsStore = useHabitsStore();
const dateStore = useDateStore();
const modalsStore = useModalsStore();

const computedRegularity = computed(() => {
  if (
    Object.values(props.regularity).every((value) => {
      return value === true;
    })
  ) {
    return 'EVERY DAY';
  } else {
    let result = '';
    const regularity = toRaw(props.regularity);

    for (let day of WEEK) {
      if (regularity[day.toLowerCase()]) {
        result += result === '' ? `${day}` : `, ${day}`;
      }
    }

    return result.toUpperCase();
  }
});

const { selectedWeekDates } = storeToRefs(dateStore);

const completedDates = ref(null);
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekDates = computed(() => {
  const start = startOfWeek(selectedWeekDates.value[0], { weekStartsOn: 1 });
  const end = endOfWeek(selectedWeekDates.value[0], { weekStartsOn: 1 });
  const weekDates = eachDayOfInterval({ start, end });
  return weekDates.map((date) => format(date, 'yyyy-MM-dd'));
});

const isChecked = (date) => {
  return completedDates.value?.[date] === true;
};

watch(selectedWeekDates, async () => {
  completedDates.value = await habitsStore.getWeeklyCompletedDatesWithFirebase(
    props.id,
  );
});

onMounted(async () => {
  completedDates.value = await habitsStore.getWeeklyCompletedDatesWithFirebase(
    props.id,
  );
});
</script>

<template>
  <div class="weekly-block">
    <div class="weekly-block__header">
      <div class="weekly-block__header_top">
        <span class="weekly-block__name">{{ name }}</span>
        <button
          class="weekly-block__remove-button"
          @click="
            habitsStore.writeHabitDataToRemove({ id, name });
            modalsStore.openModal('remove-habit');
          "
        >
          <Icon name="material-symbols-light:delete" size="2.5em" />
        </button>
      </div>
      <span class="weekly-block__regularity">
        {{ computedRegularity }}
      </span>
    </div>
    <div class="weekly-block__body">
      <ul class="weekly-block__list">
        <li v-for="(day, index) in WEEK" :key="day" class="weekly-block__item">
          <span>{{ `${day}, ${format(weekDates[index], 'd')}` }}</span>
          <input
            type="checkbox"
            class="weekly-block__checkbox"
            :class="{
              missing: !props.regularity?.[day.toLowerCase()],
              unactive:
                isAfter(
                  parseISO(dateStore.currentDate),
                  parseISO(weekDates[index]),
                ) ||
                isBefore(
                  parseISO(dateStore.currentDate),
                  parseISO(weekDates[index]),
                ),
              future: isBefore(
                parseISO(dateStore.currentDate),
                parseISO(weekDates[index]),
              ),
            }"
            :checked="isChecked(weekDates[index])"
            @change="
              (event) =>
                habitsStore.toggleHabitCompletion({
                  id,
                  date: weekDates[index],
                  isCompleted: event.target.checked,
                })
            "
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weekly-block {
  display: flex;
  flex-direction: column;
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

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    &_top {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  &__name {
    color: $main_font;

    @include font_notosans_16_400;
  }

  &__remove-button {
    span {
      color: $main_font;
      opacity: 0.7;
    }
  }

  &__regularity {
    color: $main_font;

    @include font_notosans_16_300;
  }

  &__body {
    margin-top: 10px;
  }

  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
    color: $main_font;

    @include font_notosans_14_300;

    span {
      text-align: center;
    }
  }

  &__checkbox {
    position: relative;
    width: 30px;
    height: 30px;
    background-image: linear-gradient(
      to right bottom,
      $main_blue_dark,
      $main_green_dark
    );
    border-radius: 40%;
    transition: 0.5s;
    cursor: pointer;

    &.missing {
      background-image: linear-gradient(
        to right bottom,
        $main_blue_dark,
        $main_green_dark
      );
      opacity: 0.4;
      pointer-events: none;
      cursor: default;
    }

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
        height: 25.5%;
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
      width: 2px;
      height: 0;
      top: 13.5px;
      left: 9px;
      background: $white;
      border-radius: 2px;
      transform: rotate(-45deg);
      transform-origin: top;
    }

    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 0;
      bottom: 11px;
      left: 13.5px;
      background: $white;
      border-radius: 2px;
      transform: rotate(45deg);
      transform-origin: bottom;
    }
  }
}
</style>
