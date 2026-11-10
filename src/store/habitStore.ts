
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

import {
  Habit,
  HabitCompletion,
} from "../types/habit";

export function getLocalDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const initialHabits: Habit[] = [
  {
    id: "starter-water",
    name: "Drink a glass of water",
    createdAt: getLocalDate(),
    archivedAt: null,
  },
  {
    id: "starter-reading",
    name: "Read for 10 minutes",
    createdAt: getLocalDate(),
    archivedAt: null,
  },
  {
    id: "starter-walking",
    name: "Take a short walk",
    createdAt: getLocalDate(),
    archivedAt: null,
  },
];

type HabitState = {
  habits: Habit[];
  completions: HabitCompletion[];
  hydrated: boolean;

  toggleCompletion: (
    habitId: string,
    date?: string
  ) => void;

  replaceHabit: (
    habitId: string,
    newName: string
  ) => void;

  resetAll: () => void;
  setHydrated: (value: boolean) => void;
};

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: initialHabits,
      completions: [],
      hydrated: false,

      setHydrated: (value) =>
        set({ hydrated: value }),

      toggleCompletion: (habitId, date) => {
        const today = getLocalDate();
        const targetDate = date ?? today;

        // Users can only toggle the current day.
        if (targetDate !== today) return;

        const state = get();
        const habit = state.habits.find(
          (item) =>
            item.id === habitId &&
            item.archivedAt === null
        );

        if (!habit) return;

        const exists = state.completions.some(
          (item) =>
            item.habitId === habitId &&
            item.date === targetDate
        );

        if (exists) {
          set({
            completions: state.completions.filter(
              (item) =>
                !(
                  item.habitId === habitId &&
                  item.date === targetDate
                )
            ),
          });
        } else {
          set({
            completions: [
              ...state.completions,
              { habitId, date: targetDate },
            ],
          });
        }
      },

      replaceHabit: (habitId, newName) => {
        const name = newName.trim().slice(0, 60);
        if (!name) return;

        const state = get();
        const existing = state.habits.find(
          (habit) =>
            habit.id === habitId &&
            habit.archivedAt === null
        );

        if (!existing || existing.name === name) return;

        const today = getLocalDate();

        // Preserve historical records for the old habit.
        // Any completion from today is removed so the
        // replacement begins unchecked.
        const archived = state.habits.map((habit) =>
          habit.id === habitId
            ? { ...habit, archivedAt: today }
            : habit
        );

        const replacement: Habit = {
          id: `habit-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 9)}`,
          name,
          createdAt: today,
          archivedAt: null,
        };

        const completions = state.completions.filter(
          (item) =>
            !(item.habitId === habitId && item.date === today)
        );

        // Insert in the previous habit's position.
        const oldIndex = archived.findIndex(
          (habit) => habit.id === habitId
        );

        archived.splice(oldIndex + 1, 0, replacement);

        set({
          habits: archived,
          completions,
        });
      },

      resetAll: () =>
        set({
          habits: initialHabits.map((habit) => ({
            ...habit,
            createdAt: getLocalDate(),
          })),
          completions: [],
        }),
    }),
    {
      name: "tinywins-habit-storage",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        habits: state.habits,
        completions: state.completions,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

// Reusable selectors/helpers.
export function getActiveHabits(habits: Habit[]) {
  return habits.filter(
    (habit) => habit.archivedAt === null
  );
}

export function isHabitCompleted(
  completions: HabitCompletion[],
  habitId: string,
  date: string
) {
  return completions.some(
    (item) =>
      item.habitId === habitId &&
      item.date === date
  );
}
