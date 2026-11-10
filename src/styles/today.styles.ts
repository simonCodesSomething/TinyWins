
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

  date: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 8,
  },

  title: {
    fontSize: 27,
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

  progressCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
  },

  progressContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  progressText: {
    flex: 1,
    paddingRight: 12,
  },

  progressLabel: {
    color: "#DBEAFE",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  progressValue: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "800",
    marginTop: 8,
  },

  progressMessage: {
    color: "#EFF6FF",
    fontSize: 13,
    marginTop: 4,
  },

  progressCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 6,
    borderColor: "#93C5FD",
    alignItems: "center",
    justifyContent: "center",
  },

  progressPercent: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  progressTrack: {
    height: 7,
    borderRadius: 10,
    backgroundColor: "#60A5FA",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: theme.colors.text,
  },

  sectionCount: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.primary,
  },

  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 12,
  },

  habitIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  habitDetails: {
    flex: 1,
    paddingRight: 8,
  },

  habitTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
  },

  habitSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 5,
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },

  encouragementCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
  },

  encouragementHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  encouragementTitle: {
    color: "#1D4ED8",
    fontSize: 14,
    fontWeight: "700",
  },

  encouragementText: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 19,
  },

loading: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.background,
},

habitCardCompleted: {
  backgroundColor: "#F0FDF4",
  borderColor: "#86EFAC",
},

habitTitleCompleted: {
  color: "#64748B",
  textDecorationLine: "line-through",
},

checkboxCompleted: {
  backgroundColor: theme.colors.success,
  borderColor: theme.colors.success,
  alignItems: "center",
  justifyContent: "center",
},

});
