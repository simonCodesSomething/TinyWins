
import { StyleSheet } from "react-native";
import { theme } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  headerText: {
    flex: 1,
    paddingRight: 12,
  },

  headerLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 6,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
  },

  statIconGreen: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  statIconOrange: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  statValue: {
    fontSize: 29,
    fontWeight: "800",
    color: theme.colors.text,
  },

  statUnit: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textSecondary,
  },

  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 6,
  },

  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 18,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.colors.text,
  },

  weeklyRate: {
    fontSize: 16,
    fontWeight: "800",
    color: theme.colors.primary,
  },

  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
    gap: 4,
  },

  dayColumn: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    gap: 8,
  },

  dayLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: theme.colors.textSecondary,
  },

  dayBox: {
    width: "100%",
    maxWidth: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
  },

  dayComplete: {
    backgroundColor: theme.colors.success,
  },

  dayPartial: {
    backgroundColor: "#BFDBFE",
  },

  dayToday: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },

  dayNumber: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.text,
  },

  dayNumberComplete: {
    color: "#FFFFFF",
  },

  dayCount: {
    fontSize: 10,
    color: theme.colors.textSecondary,
  },

  legend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  legendComplete: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: theme.colors.success,
  },

  legendPartial: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: "#BFDBFE",
  },

  legendEmpty: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  legendText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },

  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },

  lastStreakRow: {
    borderBottomWidth: 0,
  },

  streakNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  streakNumberText: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },

  streakName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginRight: 8,
  },

  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  streakValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#92400E",
  },

  encouragementCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 16,
    marginTop: 4,
  },

  encouragementContent: {
    flex: 1,
  },

  encouragementTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 6,
  },

  encouragementText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
  },
});
