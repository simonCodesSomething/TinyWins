
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";

import {
  ActivityIndicator,
  AppState,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  getLocalDate,
  useHabitStore,
} from "../store/habitStore";

import {
  getActiveHabitStreaks,
  getTotalCheckIns,
  getWeeklyCompletionRate,
  getWeeklyProgress,
  parseLocalDate,
} from "../utils/progress";

import { styles } from "../styles/progress.styles";

export default function ProgressScreen() {
  const habits = useHabitStore((state) => state.habits);
  const completions = useHabitStore(
    (state) => state.completions
  );

  const [hydrated, setHydrated] = useState(
    () => useHabitStore.persist.hasHydrated()
  );

  const [today, setToday] = useState(getLocalDate());

  useEffect(() => {
    const unsubscribe = useHabitStore.persist.onFinishHydration(
      () => setHydrated(true)
    );

    if (useHabitStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    const refreshDate = () => setToday(getLocalDate());

    const interval = setInterval(refreshDate, 30000);

    const subscription = AppState.addEventListener(
      "change",
      (status) => {
        if (status === "active") refreshDate();
      }
    );

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  const weeklyProgress = useMemo(
    () => getWeeklyProgress(habits, completions, today),
    [habits, completions, today]
  );

  const habitStreaks = useMemo(
    () => getActiveHabitStreaks(habits, completions, today),
    [habits, completions, today]
  );

  const totalCheckIns = useMemo(
    () => getTotalCheckIns(completions),
    [completions]
  );

  const weeklyRate = useMemo(
    () => getWeeklyCompletionRate(weeklyProgress),
    [weeklyProgress]
  );

  const bestCurrentStreak = Math.max(
    0,
    ...habitStreaks.map((habit) => habit.streak)
  );

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerLabel}>
            YOUR JOURNEY
          </Text>

          <Text style={styles.title}>
            Your Progress
          </Text>

          <Text style={styles.subtitle}>
            Every small win adds up.
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="stats-chart-outline"
            size={24}
            color="#2563EB"
          />
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={styles.statIconGreen}>
            <Ionicons
              name="checkmark-circle-outline"
              size={23}
              color="#059669"
            />
          </View>

          <Text style={styles.statValue}>
            {totalCheckIns}
          </Text>

          <Text style={styles.statLabel}>
            Total check-ins
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconOrange}>
            <Ionicons
              name="flame-outline"
              size={23}
              color="#D97706"
            />
          </View>

          <Text style={styles.statValue}>
            {bestCurrentStreak}
            <Text style={styles.statUnit}> days</Text>
          </Text>

          <Text style={styles.statLabel}>
            Best current streak
          </Text>
        </View>
      </View>

      {/* Weekly Calendar */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            Last 7 days
          </Text>

          <Text style={styles.weeklyRate}>
            {weeklyRate}%
          </Text>
        </View>

        <View style={styles.calendarRow}>
          {weeklyProgress.map((day) => {
            const date = parseLocalDate(day.date);

            const weekday = new Intl.DateTimeFormat(
              "en-US",
              { weekday: "short" }
            ).format(date);

            const isToday = day.date === today;

            return (
              <View
                key={day.date}
                style={styles.dayColumn}
              >
                <Text style={styles.dayLabel}>
                  {weekday.slice(0, 1)}
                </Text>

                <View
                  style={[
                    styles.dayBox,
                    day.total > 0 &&
                      day.completed === day.total &&
                      styles.dayComplete,
                    day.completed > 0 &&
                      day.completed < day.total &&
                      styles.dayPartial,
                    isToday && styles.dayToday,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      day.total > 0 &&
                        day.completed === day.total &&
                        styles.dayNumberComplete,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </View>

                <Text style={styles.dayCount}>
                  {day.total > 0
                    ? `${day.completed}/${day.total}`
                    : "—"}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={styles.legendComplete} />
            <Text style={styles.legendText}>
              Complete
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.legendPartial} />
            <Text style={styles.legendText}>
              Partial
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.legendEmpty} />
            <Text style={styles.legendText}>
              Not complete
            </Text>
          </View>
        </View>
      </View>

      {/* Habit Streaks */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            Habit streaks
          </Text>

          <Ionicons
            name="flame-outline"
            size={20}
            color="#F59E0B"
          />
        </View>

        {habitStreaks.map((habit, index) => (
          <View
            key={habit.habitId}
            style={[
              styles.streakRow,
              index === habitStreaks.length - 1 &&
                styles.lastStreakRow,
            ]}
          >
            <View style={styles.streakNumber}>
              <Text style={styles.streakNumberText}>
                {index + 1}
              </Text>
            </View>

            <Text
              style={styles.streakName}
              numberOfLines={2}
            >
              {habit.name}
            </Text>

            <View style={styles.streakBadge}>
              <Ionicons
                name="flame"
                size={16}
                color="#D97706"
              />

              <Text style={styles.streakValue}>
                {habit.streak}d
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Encouragement */}
      <View style={styles.encouragementCard}>
        <Ionicons
          name="sparkles-outline"
          size={20}
          color="#2563EB"
        />

        <View style={styles.encouragementContent}>
          <Text style={styles.encouragementTitle}>
            Keep showing up!
          </Text>

          <Text style={styles.encouragementText}>
            Consistency matters more than perfection.
            Every completed habit is progress.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
