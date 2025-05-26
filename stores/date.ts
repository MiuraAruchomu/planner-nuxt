import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  parseISO,
  startOfWeek,
  subDays,
  subWeeks,
} from 'date-fns';

export const useDateStore = defineStore('date-store', () => {
  const currentDate = ref<string | null>(null);
  const currentWeekDay = ref<string | null>(null);
  const currentWeekDates = ref<string[] | null>(null);
  const selectedDate = ref<string | null>(null);
  const selectedWeekStart = ref<string | null>(null);

  const selectedWeekDates = computed<string[] | null>(() => {
    if (selectedWeekStart.value) {
      const start = parseISO(selectedWeekStart.value);
      const end = endOfWeek(start, { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end }).map((day) =>
        format(day, 'yyyy-MM-dd'),
      );
    }

    return null;
  });

  function initDateChecking(): void {
    currentDate.value = useDate().getToday();
  }

  function initCurrentWeekDayChecking(): void {
    currentWeekDay.value = useDate().getCurrentWeekDay();
  }

  function initCurrentWeekDatesChecking(): void {
    currentWeekDates.value = useDate().getRangeWeekDates();
  }

  function getStartOfCurrentWeek(): void {
    if (currentDate.value) {
      selectedWeekStart.value = format(
        startOfWeek(currentDate.value, { weekStartsOn: 1 }),
        'yyyy-MM-dd',
      );
    }
  }

  function goToPreviousDay(): void {
    if (selectedDate.value) {
      selectedDate.value = format(
        subDays(parseISO(selectedDate.value), 1),
        'yyyy-MM-dd',
      );
    }
  }

  function goToNextDay(): void {
    if (selectedDate.value) {
      selectedDate.value = format(
        addDays(parseISO(selectedDate.value), 1),
        'yyyy-MM-dd',
      );
    }
  }

  function goToPreviousWeek(): void {
    if (selectedWeekStart.value) {
      const current = parseISO(selectedWeekStart.value);
      const previous = subWeeks(current, 1);
      selectedWeekStart.value = format(previous, 'yyyy-MM-dd');
    }
  }

  function goToNextWeek(): void {
    if (selectedWeekStart.value) {
      const current = parseISO(selectedWeekStart.value);
      const next = addWeeks(current, 1);
      selectedWeekStart.value = format(next, 'yyyy-MM-dd');
    }
  }

  watch(currentDate, () => {
    selectedDate.value = currentDate.value;
    getStartOfCurrentWeek();
  });

  return {
    currentDate,
    currentWeekDay,
    currentWeekDates,
    selectedDate,
    selectedWeekDates,
    initDateChecking,
    initCurrentWeekDayChecking,
    initCurrentWeekDatesChecking,
    goToNextDay,
    goToPreviousDay,
    goToNextWeek,
    goToPreviousWeek,
  };
});
