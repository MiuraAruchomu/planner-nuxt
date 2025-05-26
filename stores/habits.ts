import { useAuth } from '@/composables/useAuth';
import { useDatabase } from 'vuefire';
import {
  get,
  onValue,
  ref as firebaseRef,
  set,
  update,
  query,
  orderByKey,
  startAt,
  endAt,
} from 'firebase/database';

import type {
  Habit,
  HabitDataToRemove,
  NewHabitProps,
  ToggleHabitCompletionProps,
} from './types';
import { format } from 'date-fns';

export const useHabitsStore = defineStore('habits-store', () => {
  const auth = useAuth();
  const database = useDatabase();
  const dateStore = useDateStore();
  const { currentDate, selectedDate, selectedWeekDates } =
    storeToRefs(dateStore);
  const isHabitsLoading = ref<boolean>(true);
  const habits = ref<Habit[]>([]);
  const habitDataToRemove = reactive<HabitDataToRemove>({
    id: '',
    name: '',
  });
  const viewSwitcherItems = ref<string[]>(['daily', 'weekly']);
  const activeHabitTrackerView = ref<string>('daily');

  const dailyHabits = computed<Habit[]>(() => {
    return habits.value.filter((habit) => filterDailyHabits(habit));
  });

  async function addNewHabitWithFirebase({
    id,
    name,
    regularity,
  }: NewHabitProps): Promise<void | null> {
    if (auth.currentUser && currentDate.value) {
      const updateData = {
        [`habits/user-${auth.currentUser.uid}/list/habit-${id}`]: {
          id,
          name,
          regularity,
        },
        [`habits/user-${auth.currentUser.uid}/completedDates/habit-${id}`]: {
          [currentDate.value]: false,
        },
      };

      try {
        return withRequestStatus<void>(async () => {
          await update(firebaseRef(database), updateData);
        });
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    }
  }

  function writeHabitDataToRemove({ id, name }: HabitDataToRemove): void {
    habitDataToRemove.id = id;
    habitDataToRemove.name = name;
  }

  function clearHabitDataToRemove(): void {
    habitDataToRemove.id = '';
    habitDataToRemove.name = '';
  }

  async function removeHabitWithFirebase(id: string): Promise<void | null> {
    if (auth.currentUser) {
      const updateData = {
        [`habits/user-${auth.currentUser.uid}/list/habit-${id}`]: null,
        [`habits/user-${auth.currentUser.uid}/completedDates/habit-${id}`]:
          null,
      };

      try {
        return withRequestStatus<void>(
          async () => await update(firebaseRef(database), updateData),
        );
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    }
  }

  async function getHabitsWithFirebase(): Promise<void> {
    if (auth.currentUser) {
      const dbRef = firebaseRef(
        database,
        `habits/user-${auth.currentUser.uid}/list`,
      );

      try {
        isHabitsLoading.value = true;
        const snapshot = await get(dbRef);
        habits.value = Object.values(snapshot.val() || []);
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      } finally {
        isHabitsLoading.value = false;
      }
    }
  }

  async function updateHabitsCompletedDatesWithFirebase(): Promise<void> {
    if (auth.currentUser && currentDate.value) {
      const today = currentDate.value;
      const dbRef = firebaseRef(
        database,
        `habits/user-${auth.currentUser.uid}/completedDates`,
      );

      try {
        const snapshot = await get(dbRef);
        const existingDates = snapshot.val();

        for (let habit in habits.value) {
          if (
            !existingDates ||
            !(`habit-${habits.value[habit].id}` in existingDates)
          ) {
            const habitRef = firebaseRef(
              database,
              `habits/user-${auth.currentUser.uid}/completedDates/habit-${habits.value[habit].id}`,
            );
            set(habitRef, { [today]: false });
          } else if (!existingDates[`habit-${habits.value[habit].id}`][today]) {
            const habitRef = firebaseRef(
              database,
              `habits/user-${auth.currentUser.uid}/completedDates/habit-${habits.value[habit].id}`,
            );
            const snapshot = await get(habitRef);
            const completedDates = Object.keys(snapshot.val());
            const missingDates = useDate().getMissingDates(completedDates);
            missingDates.forEach((date) => {
              const missingDateRef = firebaseRef(
                database,
                `habits/user-${auth.currentUser.uid}/completedDates/habit-${habits.value[habit].id}/${date}`,
              );
              set(missingDateRef, false);
            });
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    }
  }

  function initHabitsTrackingWithFirebase(): void {
    if (auth.currentUser) {
      const dbRef = firebaseRef(
        database,
        `habits/user-${auth.currentUser.uid}`,
      );

      try {
        onValue(dbRef, async () => {
          await getHabitsWithFirebase();
        });
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    }
  }

  function changeActiveHabitTrackerView(value: string): void {
    activeHabitTrackerView.value = value;
  }

  function filterDailyHabits(habit: Habit): boolean {
    if (selectedDate.value) {
      const weekDay = format(selectedDate.value, 'iii').toLowerCase();
      return !!habit.regularity[weekDay];
    }

    return false;
  }

  async function getDailyCompletedDatesWithFirebase(
    id: string,
  ): Promise<boolean> {
    if (auth.currentUser && selectedDate.value) {
      const habitRef = firebaseRef(
        database,
        `habits/user-${auth.currentUser.uid}/completedDates/habit-${id}/${selectedDate.value}`,
      );

      try {
        const snapshot = await get(habitRef);
        return snapshot.exists() ? snapshot.val() : false;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }

        return false;
      }
    }

    return false;
  }

  async function getWeeklyCompletedDatesWithFirebase(
    id: string,
  ): Promise<Record<string, boolean> | null> {
    if (auth.currentUser && selectedWeekDates.value) {
      const habitRef = firebaseRef(
        database,
        `habits/user-${auth.currentUser.uid}/completedDates/habit-${id}`,
      );
      const habitQuery = query(
        habitRef,
        orderByKey(),
        startAt(selectedWeekDates.value[0]),
        endAt(selectedWeekDates.value[selectedWeekDates.value.length - 1]),
      );

      try {
        const snapshot = await get(habitQuery);
        return snapshot.exists() ? snapshot.val() : {};
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }

        return null;
      }
    }

    return null;
  }

  async function toggleHabitCompletion({
    id,
    date,
    isCompleted,
  }: ToggleHabitCompletionProps): Promise<void> {
    if (auth.currentUser) {
      const habitRef = firebaseRef(
        database,
        `habits/user-${auth.currentUser.uid}/completedDates/habit-${id}/${date}`,
      );

      try {
        set(habitRef, isCompleted);
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    }
  }

  return {
    isHabitsLoading,
    habits,
    habitDataToRemove,
    viewSwitcherItems,
    activeHabitTrackerView,
    dailyHabits,
    addNewHabitWithFirebase,
    writeHabitDataToRemove,
    clearHabitDataToRemove,
    removeHabitWithFirebase,
    getHabitsWithFirebase,
    updateHabitsCompletedDatesWithFirebase,
    initHabitsTrackingWithFirebase,
    changeActiveHabitTrackerView,
    getDailyCompletedDatesWithFirebase,
    getWeeklyCompletedDatesWithFirebase,
    toggleHabitCompletion,
  };
});
