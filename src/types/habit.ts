
export type Habit = {
  id: string;
  name: string;
  createdAt: string;
  archivedAt: string | null;
};

export type HabitCompletion = {
  habitId: string;
  date: string; // YYYY-MM-DD, local date
};
