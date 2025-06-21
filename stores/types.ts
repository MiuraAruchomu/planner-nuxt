// Habits
export interface Habit {
  id: string;
  name: string;
  regularity: Record<string, boolean>;
}

export interface HabitDataToRemove {
  id: string;
  name: string;
}

export interface NewHabitProps {
  id: string;
  name: string;
  regularity: Record<string, boolean>;
}

export interface ToggleHabitCompletionProps {
  id: string;
  date: string;
  isCompleted: boolean;
}
