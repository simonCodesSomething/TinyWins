
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  getActiveHabits,
  getLocalDate,
  isHabitCompleted,
  useHabitStore,
} from "../store/habitStore";

import { styles } from "../styles/today.styles";

const habitAppearance = [
  {
    icon: "water-outline",
    color: "#2563EB",
    background: "#DBEAFE",
  },
  {
    icon: "book-outline",
    color: "#9333EA",
    background: "#F3E8FF",
  },
  {
    icon: "walk-outline",
    color: "#059669",
    background: "#D1FAE5",
  },
] as const;

export default function TodayScreen() {
  const habits = useHabitStore((state) => state.habits);
  const completions = useHabitStore(
    (state) => state.completions
  );
  const hydrated = useHabitStore(
    (state) => state.hydrated
  );
  const toggleCompletion = useHabitStore(
    (state) => state.toggleCompletion
  );

  const [today, setToday] = useState(getLocalDate());

  useEffect(() => {
    const updateDate = () => setToday(getLocalDate());

    // Handles midnight while the screen is open.
    const interval = setInterval(updateDate, 30000);

    // Handles returning after the app was suspended.
    const subscription = AppState.addEventListener(
      "change",
      (status) => {
        if (status === "active") updateDate();
      }
    );

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  const activeHabits = getActiveHabits(habits);

  const completedCount = activeHabits.filter((habit) =>
    isHabitCompleted(completions, habit.id, today)
  ).length;

  const totalHabits = activeHabits.length;

  const progress =
    totalHabits > 0
      ? completedCount / totalHabits
      : 0;

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(`${today}T12:00:00`));

  if (!hydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.date}>
            {dateLabel.toUpperCase()}
          </Text>

          <Text style={styles.title}>
            Make today count.
          </Text>

          <Text style={styles.subtitle}>
            Three small wins, one better day.
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="sunny-outline"
            size={25}
            color="#2563EB"
          />
        </View>
      </View>

      {/* Progress card */}
      <View style={styles.progressCard}>
        <View style={styles.progressContent}>
          <View style={styles.progressText}>
            <Text style={styles.progressLabel}>
              TODAY'S PROGRESS
            </Text>

            <Text style={styles.progressValue}>
              {completedCount} / {totalHabits}
            </Text>

            <Text style={styles.progressMessage}>
              {completedCount === totalHabits
                ? "All three wins completed!"
                : "Small steps lead to big changes."}
            </Text>
          </View>

          <View style={styles.progressCircle}>
            <Text style={styles.progressPercent}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Habits */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Your daily wins
        </Text>

        <Text style={styles.sectionCount}>
          {completedCount} completed
        </Text>
      </View>

      {activeHabits.map((habit, index) => {
        const appearance =
          habitAppearance[index % habitAppearance.length];

        const completed = isHabitCompleted(
          completions,
          habit.id,
          today
        );

        return (
          <Pressable
            key={habit.id}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: completed }}
            accessibilityLabel={habit.name}
            onPress={() => toggleCompletion(habit.id)}
            style={[
              styles.habitCard,
              completed && styles.habitCardCompleted,
            ]}
          >
            <View
              style={[
                styles.habitIcon,
                { backgroundColor: appearance.background },
              ]}
            >
              <Ionicons
                name={appearance.icon}
                size={23}
                color={appearance.color}
              />
            </View>

            <View style={styles.habitDetails}>
              <Text
                style={[
                  styles.habitTitle,
                  completed && styles.habitTitleCompleted,
                ]}
              >
                {habit.name}
              </Text>

              <Text style={styles.habitSubtitle}>
                {completed
                  ? "Completed today"
                  : "Tap to complete"}
              </Text>
            </View>

            <View
              style={[
                styles.checkbox,
                completed && styles.checkboxCompleted,
              ]}
            >
              {completed && (
                <Ionicons
                  name="checkmark"
                  size={17}
                  color="#FFFFFF"
                />
              )}
            </View>
          </Pressable>
        );
      })}

      {/* Encouragement */}
      <View style={styles.encouragementCard}>
        <View style={styles.encouragementHeader}>
          <Ionicons
            name="sparkles-outline"
            size={19}
            color="#2563EB"
          />

          <Text style={styles.encouragementTitle}>
            {completedCount === totalHabits
              ? "You did it!"
              : "Every small win matters"}
          </Text>
        </View>

        <Text style={styles.encouragementText}>
          {completedCount === totalHabits
            ? "Three wins today. Come back tomorrow!"
            : "Focus on progress, not perfection."}
        </Text>
      </View>
    </ScrollView>
  );
}
