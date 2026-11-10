
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  getActiveHabits,
  useHabitStore,
} from "../store/habitStore";

import { Habit } from "../types/habit";
import { styles } from "../styles/settings.styles";

export default function SettingsScreen() {
  const habits = useHabitStore((state) => state.habits);

  const replaceHabit = useHabitStore(
    (state) => state.replaceHabit
  );

  // Use Zustand's built-in persistence hydration status.
  const [hydrated, setHydrated] = useState(
    () => useHabitStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsubscribe = useHabitStore.persist.onFinishHydration(
      () => {
        setHydrated(true);
      }
    );

    // Handles hydration completing before
    // the listener was registered.
    if (useHabitStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsubscribe;
  }, []);

  const activeHabits = getActiveHabits(habits);

  const [editing, setEditing] = useState<Habit | null>(null);
  const [newName, setNewName] = useState("");

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

    const trimmed = newName.trim();

    if (!trimmed) {
      Alert.alert(
        "Habit name required",
        "Please enter a name for your habit."
      );
      return;
    }

    if (trimmed === editing.name) {
      closeEditor();
      return;
    }

    const habitId = editing.id;

    Alert.alert(
      "Replace habit?",
      "This starts a fresh habit. Previous-day history will be kept, but today's completion for the old habit will be cleared.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Replace",
          onPress: () => {
            replaceHabit(habitId, trimmed);
            closeEditor();
          },
        },
      ]
    );
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.subtitle}>
        Make TinyWins work for you.
      </Text>

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

      <Text style={styles.version}>
        TinyWins v1.0.0
      </Text>

      {/* Replace Habit Modal */}
      <Modal
        visible={editing !== null}
        transparent
        animationType="fade"
        onRequestClose={closeEditor}
      >
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios" ? "padding" : undefined
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
    </View>
  );
}
