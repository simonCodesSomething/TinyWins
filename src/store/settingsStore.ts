
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

type SettingsState = {
  remindersEnabled: boolean;
  reminderTime: string;
  reminderNotificationId: string | null;
  onboardingCompleted: boolean;

  setReminderSettings: (
    enabled: boolean,
    time: string,
    notificationId: string | null
  ) => void;

  setOnboardingCompleted: (completed: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      remindersEnabled: false,
      reminderTime: "20:00",
      reminderNotificationId: null,
      onboardingCompleted: false,

      setReminderSettings: (
        enabled,
        time,
        notificationId
      ) =>
        set({
          remindersEnabled: enabled,
          reminderTime: time,
          reminderNotificationId: notificationId,
        }),

      setOnboardingCompleted: (completed) =>
        set({ onboardingCompleted: completed }),
    }),
    {
      name: "tinywins-settings-storage",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        remindersEnabled: state.remindersEnabled,
        reminderTime: state.reminderTime,
        reminderNotificationId:
          state.reminderNotificationId,
        onboardingCompleted: state.onboardingCompleted,
      }),
    }
  )
);
