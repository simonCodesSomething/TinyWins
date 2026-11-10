
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  getActiveHabits,
  useHabitStore,
} from "../store/habitStore";

import { useSettingsStore } from "../store/settingsStore";
import { Habit } from "../types/habit";

import {
  cancelDailyReminder,
  formatReminderTime,
  hasNotificationPermission,
  requestNotificationPermission,
  scheduleDailyReminder,
} from "../services/notifications";

import { styles } from "../styles/settings.styles";

export default function SettingsScreen() {
  // -------------------------------------------------------
  // HABIT STORE
  // -------------------------------------------------------

  const habits = useHabitStore((state) => state.habits);
  const replaceHabit = useHabitStore(
    (state) => state.replaceHabit
  );
  const resetAll = useHabitStore(
    (state) => state.resetAll
  );

  // -------------------------------------------------------
  // SETTINGS STORE
  // -------------------------------------------------------

  const remindersEnabled = useSettingsStore(
    (state) => state.remindersEnabled
  );

  const reminderTime = useSettingsStore(
    (state) => state.reminderTime
  );

  const reminderNotificationId = useSettingsStore(
    (state) => state.reminderNotificationId
  );

  const setReminderSettings = useSettingsStore(
    (state) => state.setReminderSettings
  );

  // -------------------------------------------------------
  // LOCAL STATE
  // -------------------------------------------------------

  const [hydrated, setHydrated] = useState(
    () =>
      useHabitStore.persist.hasHydrated() &&
      useSettingsStore.persist.hasHydrated()
  );

  const [editing, setEditing] = useState<Habit | null>(
    null
  );

  const [newName, setNewName] = useState("");

  const [editingTime, setEditingTime] = useState(false);
  const [busy, setBusy] = useState(false);

  // -------------------------------------------------------
  // HYDRATION
  // -------------------------------------------------------

  useEffect(() => {
    const checkHydration = () => {
      setHydrated(
        useHabitStore.persist.hasHydrated() &&
          useSettingsStore.persist.hasHydrated()
      );
    };

    const unsubscribeHabits =
      useHabitStore.persist.onFinishHydration(
        checkHydration
      );

    const unsubscribeSettings =
      useSettingsStore.persist.onFinishHydration(
        checkHydration
      );

    checkHydration();

    return () => {
      unsubscribeHabits();
      unsubscribeSettings();
    };
  }, []);

  const activeHabits = getActiveHabits(habits);

  // -------------------------------------------------------
  // HABIT MANAGEMENT
  // -------------------------------------------------------

  const openEditor = (habit: Habit) => {
    setEditing(habit);
    setNewName(habit.name);
  };

  const closeEditor = () => {
    setEditing(null);
    setNewName("");
  };

  const saveHabit = () => {
    if (!editing) return;

    const name = newName.trim();

    if (!name) {
      Alert.alert(
        "Habit name required",
        "Please enter a habit name."
      );
      return;
    }

    if (name === editing.name) {
      closeEditor();
      return;
    }

    const habitId = editing.id;

    Alert.alert(
      "Replace habit?",
      "The new habit starts fresh. Previous-day history will be kept.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Replace",
          onPress: () => {
            replaceHabit(habitId, name);
            closeEditor();
          },
        },
      ]
    );
  };

  // -------------------------------------------------------
  // DAILY REMINDERS
  // -------------------------------------------------------

  const toggleReminders = async (enabled: boolean) => {
    if (busy) return;

    setBusy(true);

    try {
      if (enabled) {
        const allowed =
          await requestNotificationPermission();

        if (!allowed) {
          Alert.alert(
            "Notifications disabled",
            "Enable notifications for TinyWins in your device settings.",
            [
              { text: "OK", style: "cancel" },
              {
                text: "Open Settings",
                onPress: () => {
                  void Linking.openSettings();
                },
              },
            ]
          );
          return;
        }

        const newId = await scheduleDailyReminder(
          reminderTime
        );

        try {
          await cancelDailyReminder(
            reminderNotificationId
          );
        } catch (error) {
          await cancelDailyReminder(newId);
          throw error;
        }

        setReminderSettings(
          true,
          reminderTime,
          newId
        );
      } else {
        await cancelDailyReminder(
          reminderNotificationId
        );

        setReminderSettings(
          false,
          reminderTime,
          null
        );
      }
    } catch (error) {
      console.error(
        "[TinyWins] Reminder error:",
        error
      );

      Alert.alert(
        "Reminder error",
        "Unable to update your reminder. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  // -------------------------------------------------------
  // REMINDER TIME
  // -------------------------------------------------------

  const getReminderDate = (): Date => {
    const [hour, minute] = reminderTime
      .split(":")
      .map(Number);

    const date = new Date();
    date.setHours(hour, minute, 0, 0);

    return date;
  };

  const saveReminderTime = async (newTime: string) => {
    if (busy || newTime === reminderTime) return;

    setBusy(true);

    try {
      if (remindersEnabled) {
        const permitted =
          await hasNotificationPermission();

        if (!permitted) {
          Alert.alert(
            "Notification permission needed",
            "Enable notifications in your device settings before changing an active reminder.",
            [
              { text: "OK", style: "cancel" },
              {
                text: "Open Settings",
                onPress: () => {
                  void Linking.openSettings();
                },
              },
            ]
          );
          return;
        }

        const newId = await scheduleDailyReminder(
          newTime
        );

        try {
          await cancelDailyReminder(
            reminderNotificationId
          );
        } catch (error) {
          await cancelDailyReminder(newId);
          throw error;
        }

        setReminderSettings(
          true,
          newTime,
          newId
        );
      } else {
        // Save without scheduling when disabled.
        setReminderSettings(
          false,
          newTime,
          null
        );
      }
    } catch (error) {
      console.error(
        "[TinyWins] Reminder time error:",
        error
      );

      Alert.alert(
        "Reminder error",
        "Unable to update the reminder time."
      );
    } finally {
      setBusy(false);
    }
  };

  // -------------------------------------------------------
  // NATIVE TIME PICKER
  // -------------------------------------------------------

  const handleTimeValueChange = (
    _event: unknown,
    selectedDate: Date
  ) => {
    setEditingTime(false);

    const hours = String(
      selectedDate.getHours()
    ).padStart(2, "0");

    const minutes = String(
      selectedDate.getMinutes()
    ).padStart(2, "0");

    void saveReminderTime(`${hours}:${minutes}`);
  };

  const handleTimeDismiss = () => {
    setEditingTime(false);
  };

  // -------------------------------------------------------
  // RESET DATA
  // -------------------------------------------------------

  const confirmReset = () => {
    Alert.alert(
      "Reset all habit data?",
      "This will erase your habit history, check-ins, and custom habits. This cannot be undone. Reminder settings will be kept.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset Data",
          style: "destructive",
          onPress: () => {
            resetAll();

            Alert.alert(
              "Data reset",
              "Your habits have been restored to their defaults."
            );
          },
        },
      ]
    );
  };

  // -------------------------------------------------------
  // LOADING
  // -------------------------------------------------------

  if (!hydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* HEADER */}

      <Text style={styles.title}>
        Settings
      </Text>

      <Text style={styles.subtitle}>
        Make TinyWins work for you.
      </Text>

      {/* MANAGE HABITS */}

      <Text style={styles.sectionTitle}>
        YOUR THREE HABITS
      </Text>

      {activeHabits.map((habit, index) => (
        <Pressable
          key={habit.id}
          style={styles.habitRow}
          onPress={() => openEditor(habit)}
          accessibilityRole="button"
          accessibilityLabel={`Replace ${habit.name}`}
        >
          <View style={styles.habitNumber}>
            <Text style={styles.habitNumberText}>
              {index + 1}
            </Text>
          </View>

          <View style={styles.habitRowContent}>
            <Text style={styles.habitName}>
              {habit.name}
            </Text>

            <Text style={styles.habitHint}>
              Tap to replace
            </Text>
          </View>

          <Ionicons
            name="pencil-outline"
            size={20}
            color="#64748B"
          />
        </Pressable>
      ))}

      <Text style={styles.helpText}>
        Choose three small things you want to do every day.
      </Text>

      {/* DAILY REMINDER */}

      <Text style={styles.sectionTitle}>
        DAILY REMINDER
      </Text>

      <View style={styles.settingRow}>
        <View style={styles.settingIcon}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#2563EB"
          />
        </View>

        <View style={styles.settingText}>
          <Text style={styles.settingName}>
            Daily reminder
          </Text>

          <Text style={styles.settingDescription}>
            A gentle reminder to complete your habits
          </Text>
        </View>

        <Switch
          value={remindersEnabled}
          onValueChange={toggleReminders}
          disabled={busy}
          trackColor={{
            false: "#CBD5E1",
            true: "#93C5FD",
          }}
          thumbColor={
            remindersEnabled
              ? "#2563EB"
              : "#F8FAFC"
          }
        />
      </View>

      {/* REMINDER TIME */}

      <Pressable
        style={styles.settingRow}
        disabled={busy}
        onPress={() => setEditingTime(true)}
        accessibilityRole="button"
        accessibilityLabel={`Reminder time ${formatReminderTime(reminderTime)}`}
      >
        <View style={styles.settingIcon}>
          <Ionicons
            name="time-outline"
            size={22}
            color="#2563EB"
          />
        </View>

        <View style={styles.settingText}>
          <Text style={styles.settingName}>
            Reminder time
          </Text>

          <Text style={styles.settingDescription}>
            {formatReminderTime(reminderTime)}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={19}
          color="#64748B"
        />
      </Pressable>

      {/* DATA MANAGEMENT */}

      <Text style={styles.sectionTitle}>
        DATA MANAGEMENT
      </Text>

      <Pressable
        style={styles.settingRow}
        onPress={confirmReset}
      >
        <View style={styles.settingIcon}>
          <Ionicons
            name="trash-outline"
            size={22}
            color="#DC2626"
          />
        </View>

        <View style={styles.settingText}>
          <Text style={styles.resetText}>
            Reset all data
          </Text>

          <Text style={styles.settingDescription}>
            Clear saved habits and history
          </Text>
        </View>
      </Pressable>

      <Text style={styles.version}>
        TinyWins v1.0.0
      </Text>

      {/* REPLACE HABIT MODAL */}

      <Modal
        visible={editing !== null}
        transparent
        animationType="fade"
        onRequestClose={closeEditor}
      >
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Replace habit
            </Text>

            <Text style={styles.modalSubtitle}>
              What would you like to focus on instead?
            </Text>

            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              maxLength={60}
              autoFocus
              placeholder="Enter a daily habit"
              placeholderTextColor="#94A3B8"
              returnKeyType="done"
              onSubmitEditing={saveHabit}
            />

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={closeEditor}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={styles.saveButton}
                onPress={saveHabit}
              >
                <Text style={styles.saveButtonText}>
                  Replace
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* NATIVE TIME PICKER */}

      {editingTime && (
        <DateTimePicker
          value={getReminderDate()}
          mode="time"
          display="clock"
          is24Hour={false}
          onValueChange={handleTimeValueChange}
          onDismiss={handleTimeDismiss}
        />
      )}
    </ScrollView>
  );
}
