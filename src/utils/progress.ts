
import {
  Habit,
  HabitCompletion,
} from "../types/habit";

import { getLocalDate } from "../store/habitStore";

export type DailyProgress = {
  date: string;
  completed: number;
  total: number;
  percentage: number;
};

export type HabitStreak = {
  habitId: string;
  name: string;
  streak: number;
};

// Parse a local date without UTC timezone conversion.
export function parseLocalDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day, 12, 0, 0);
}

// Add or subtract calendar days.
export function addDays(date: string, days: number): string {
  const result = parseLocalDate(date);
  result.setDate(result.getDate() + days);

  return getLocalDate(result);
}

// A habit is available on a date if it has been created
// and has not yet been archived.
//
// A replaced habit is no longer available on the day
// it was replaced.
export function wasHabitActiveOnDate(
  habit: Habit,
  date: string
): boolean {
  return (
    habit.createdAt <= date &&
    (habit.archivedAt === null || habit.archivedAt > date)
  );
}

// Build a lookup of unique completed habit/date pairs.
function getCompletionLookup(
  completions: HabitCompletion[]
): Set<string> {
  return new Set(
    completions.map(
      (completion) =>
        `${completion.habitId}|${completion.date}`
    )
  );
}

// Build the last seven days, oldest to newest.
export function getWeeklyProgress(
  habits: Habit[],
  completions: HabitCompletion[],
  today = getLocalDate()
): DailyProgress[] {
  const completedLookup = getCompletionLookup(completions);

  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index - 6);

    const availableHabits = habits.filter((habit) =>
      wasHabitActiveOnDate(habit, date)
    );

    const completed = availableHabits.filter((habit) =>
      completedLookup.has(`${habit.id}|${date}`)
    ).length;

    const total = availableHabits.length;

    return {
      date,
      completed,
      total,
      percentage:
        total > 0
          ? Math.round((completed / total) * 100)
          : 0,
    };
  });
}

// Count consecutive completed days for a specific habit.
//
// If today's habit is unfinished, the streak can still
// include yesterday. It breaks only after a full missed day.
export function getHabitStreak(
  habit: Habit,
  completions: HabitCompletion[],
  today = getLocalDate()
): number {
  if (habit.archivedAt !== null) return 0;

  const completedLookup = getCompletionLookup(completions);

  let cursor = today;
  let streak = 0;

  // An unfinished current day does not immediately
  // break yesterday's streak.
  if (!completedLookup.has(`${habit.id}|${cursor}`)) {
    cursor = addDays(cursor, -1);
  }

  while (
    cursor >= habit.createdAt &&
    completedLookup.has(`${habit.id}|${cursor}`)
  ) {
    streak++;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

// Return streaks for the currently active habits.
export function getActiveHabitStreaks(
  habits: Habit[],
  completions: HabitCompletion[],
  today = getLocalDate()
): HabitStreak[] {
  return habits
    .filter((habit) => habit.archivedAt === null)
    .map((habit) => ({
      habitId: habit.id,
      name: habit.name,
      streak: getHabitStreak(habit, completions, today),
    }));
}

// Total unique check-ins, including historical habits.
export function getTotalCheckIns(
  completions: HabitCompletion[]
): number {
  return getCompletionLookup(completions).size;
}

// Weighted seven-day completion percentage.
// Days before the user's first habit don't lower the score.
export function getWeeklyCompletionRate(
  days: DailyProgress[]
): number {
  const completed = days.reduce(
    (sum, day) => sum + day.completed,
    0
  );

  const possible = days.reduce(
    (sum, day) => sum + day.total,
    0
  );

  return possible > 0
    ? Math.round((completed / possible) * 100)
    : 0;
}
